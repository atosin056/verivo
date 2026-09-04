import { useEffect, useRef, useState, useCallback } from "react";
import { Mic } from "lucide-react";

const GREEN = "#0f3d2e";
const LIGHT = "#f2c879";

const BARS = 64;
const INNER_R = 58;
const MAX_EXTRA = 62;
const BAR_WIDTH = 5;
const CANVAS_SIZE = 380;

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://verivo.onrender.com";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function pickSupportedMimeType() {
  if (typeof MediaRecorder === "undefined") return "audio/webm";
  if (MediaRecorder.isTypeSupported("audio/ogg")) return "audio/ogg";
  if (MediaRecorder.isTypeSupported("audio/ogg;codecs=opus"))
    return "audio/ogg;codecs=opus";
  return "audio/webm"; // fallback — may not transcribe reliably per Gemini's supported list
}

export default function Aimic({ onRecordingComplete, onTranscript }) {
  const [listening, setListening] = useState(false);
  const [micDenied, setMicDenied] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle | listening | transcribing | done | error

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const ampRef = useRef(new Float32Array(BARS));
  const targetRef = useRef(new Float32Array(BARS));
  const lastBurstRef = useRef(0);
  const startTimeRef = useRef(performance.now());
  const listeningRef = useRef(false);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrRef = useRef(null);
  const streamRef = useRef(null);
  const usingMicRef = useRef(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const mimeTypeRef = useRef("audio/webm"); // set fresh each recording, in startMic

  const stopMic = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    dataArrRef.current = null;
    usingMicRef.current = false;
  }, []);

  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.7;
      source.connect(analyser);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      dataArrRef.current = new Uint8Array(analyser.frequencyBinCount);
      usingMicRef.current = true;
      setMicDenied(false);

      chunksRef.current = [];
      const mimeType = pickSupportedMimeType();
      mimeTypeRef.current = mimeType;

      const recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
    } catch (error) {
      console.error("Microphone error:", error);
      usingMicRef.current = false;
      setMicDenied(true);
    }
  }, []);

  const handleDown = useCallback(
    async (event) => {
      event.preventDefault();
      if (listeningRef.current) return;

      listeningRef.current = true;
      setListening(true);
      setPhase("listening");

      await startMic();
    },
    [startMic],
  );

  const handleUp = useCallback(
    (event) => {
      if (!listeningRef.current) return;
      event?.preventDefault();

      listeningRef.current = false;
      setListening(false);

      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        recorder.onstop = async () => {
          const mimeType = mimeTypeRef.current;
          const blob = new Blob(chunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(blob);

          onRecordingComplete && onRecordingComplete(url);
          mediaRecorderRef.current = null;

          setPhase("transcribing");
          try {
            const base64 = await blobToBase64(blob);

            const res = await fetch(`${API_BASE_URL}/api/transcribe`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ audio: base64, mimeType }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
              throw new Error(
                data.message || `Request failed with status ${res.status}`,
              );
            }

            setPhase("done");
            onTranscript && onTranscript(data.text || "");
          } catch (err) {
            console.log("Transcription failed:", err.message);
            setPhase("error");
            onTranscript && onTranscript(""); // still lets Submit proceed with empty answer
          }
        };
        recorder.stop();
      }

      stopMic();
    },
    [stopMic, onRecordingComplete, onTranscript],
  );

  useEffect(() => {
    return () => {
      stopMic();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [stopMic]);

  // ---- visualizer: unchanged from your version ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = `${CANVAS_SIZE}px`;
    canvas.style.height = `${CANVAS_SIZE}px`;
    ctx.scale(dpr, dpr);
    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;

    const tick = (now) => {
      const t = (now - startTimeRef.current) / 1000;
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      const amp = ampRef.current;
      const target = targetRef.current;
      const isListening = listeningRef.current;

      if (isListening && usingMicRef.current && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrRef.current);
        const bins = dataArrRef.current;
        for (let i = 0; i < BARS; i++) {
          const binIndex = Math.floor((i / BARS) * bins.length * 0.75);
          target[i] = bins[binIndex] / 255;
        }
      } else if (isListening) {
        if (now - lastBurstRef.current > 130) {
          lastBurstRef.current = now;
          for (let i = 0; i < BARS; i++) {
            const jitter = Math.random();
            target[i] = Math.max(
              0.08,
              Math.pow(jitter, 1.6) * (0.55 + 0.45 * Math.sin(i * 0.4 + t * 3)),
            );
          }
        }
      } else {
        for (let i = 0; i < BARS; i++) {
          target[i] = 0.05 + (Math.sin(t * 1.1 + i * 0.25) * 0.5 + 0.5) * 0.07;
        }
      }

      const smoothing = isListening && usingMicRef.current ? 0.4 : 0.18;
      for (let i = 0; i < BARS; i++)
        amp[i] = lerp(amp[i], target[i], smoothing);

      for (let i = 0; i < BARS; i++) {
        const ang = (i / BARS) * Math.PI * 2 - Math.PI / 2;
        const len = 6 + amp[i] * MAX_EXTRA;
        const alpha = 0.28 + amp[i] * 0.72;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang);
        ctx.fillStyle = `rgba(15, 61, 46, ${alpha})`;
        ctx.shadowBlur = 6 + amp[i] * 10;
        ctx.shadowColor = `rgba(15, 61, 46, ${0.5 + amp[i] * 0.5})`;
        const w = BAR_WIDTH;
        const r = w / 2;
        ctx.beginPath();
        ctx.moveTo(-w / 2, INNER_R + r);
        ctx.arcTo(-w / 2, INNER_R, 0, INNER_R, r);
        ctx.arcTo(w / 2, INNER_R, w / 2, INNER_R + r, r);
        ctx.lineTo(w / 2, INNER_R + len - r);
        ctx.arcTo(w / 2, INNER_R + len, 0, INNER_R + len, r);
        ctx.arcTo(-w / 2, INNER_R + len, -w / 2, INNER_R + len - r, r);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      const ringPulse = !isListening ? Math.sin(t * 1.2) * 0.5 + 0.5 : 0.5;
      const ringGrad = ctx.createRadialGradient(
        cx,
        cy,
        INNER_R * 0.25,
        cx,
        cy,
        INNER_R + 6,
      );
      ringGrad.addColorStop(0, `rgba(15, 61, 46, ${0.22 + ringPulse * 0.1})`);
      ringGrad.addColorStop(1, "rgba(15, 61, 46, 0)");
      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, INNER_R + 6, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.stage}>
        <canvas ref={canvasRef} style={styles.canvas} />
        <button
          onPointerDown={handleDown}
          onPointerUp={handleUp}
          onPointerLeave={handleUp}
          onPointerCancel={handleUp}
          style={{
            ...styles.button,
            transform: `scale(${listening ? 0.92 : 1})`,
            background: GREEN,
            boxShadow: `0 0 ${listening ? 26 : 14}px rgba(15,61,46,${listening ? 0.6 : 0.35}), inset 0 0 14px rgba(0,0,0,0.25)`,
          }}
          aria-label="Press and hold to speak"
        >
          <Mic size={26} color={LIGHT} />
        </button>
      </div>

      <div style={styles.labelRow}>
        <span style={styles.label}>
          {phase === "listening" && "Listening…"}
          {phase === "transcribing" && "Transcribing…"}
          {phase === "done" && "Got it"}
          {phase === "error" && "Couldn't transcribe — you can still submit"}
          {phase === "idle" && "Hold to talk"}
        </span>
      </div>

      {micDenied && listening && (
        <div style={styles.hint}>
          mic access unavailable — showing simulated input
        </div>
      )}

      <style>{`button { touch-action: none; -webkit-tap-highlight-color: transparent; }`}</style>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    padding: 24,
    background: "transparent",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    userSelect: "none",
  },
  stage: {
    position: "relative",
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    maxWidth: "90vw",
    maxHeight: "90vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: { position: "absolute", inset: 0, width: "100%", height: "100%" },
  button: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: "50%",
    border: "none",
    outline: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.12s ease, box-shadow 0.25s ease",
    zIndex: 2,
  },
  labelRow: { display: "flex", alignItems: "center", gap: 8 },
  label: {
    color: "#6b6055",
    fontSize: 13,
    fontFamily: "Instrument Sans",
    fontWeight: 500,
  },
  hint: { color: "rgba(15,61,46,0.55)", fontSize: 11, marginTop: -8 },
};
