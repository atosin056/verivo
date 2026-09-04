import AppShell from "../components/AppShell";
import SectionHeader from "../components/Sectionheader";
import Aimic from "../components/Aimic";
import Typewritertext from "../components/Typewritertext";
import { Play, Pause, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useUserData } from "../UserDataContext"; // added

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://verivo.onrender.com";

const CATEGORIES = [
  "charge",
  "battery",
  "LCD",
  "touch",
  "sound",
  "mic",
  "off",
  "flash",
  "lock",
  "FRP",
];

function pickRandomCategory() {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

function Spinner() {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function Diagnostic() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useUserData(); // added
  const [qa, setQa] = useState(null);

  const [recordedUrl, setRecordedUrl] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [transcribing, setTranscribing] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const audioElRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchQuestion = async () => {
      setLoading(true);
      setError(null);
      try {
        const trade = userData?.user?.trade;
        if (!trade) {
          throw new Error("Your trade information is missing");
        }

        const category = pickRandomCategory();
        const res = await fetch(`${API_BASE_URL}/api/generateqa`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trade,
            category,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(
            data.message || `Request failed with status ${res.status}`,
          );
        }
        if (!cancelled) setQa(data.questionandanswer);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchQuestion();
    return () => {
      cancelled = true;
    };
  }, [userData]);

  const handleRecordingComplete = (url) => {
    setRecordedUrl(url);
    setTranscribing(true); // panel shows now, but transcript isn't ready yet
  };

  const handleTranscript = (text) => {
    setUserAnswer(text);
    setTranscribing(false);
    console.log(text);
  };

  const handleDelete = () => {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    setRecordedUrl(null);
    setUserAnswer(null);
    setResult(null);
    setSubmitError(null);
    setTranscribing(false);
  };

  const togglePlayback = () => {
    const el = audioElRef.current;
    if (!el) return;
    if (isPlaying) el.pause();
    else el.play();
  };

  const handleSubmit = async () => {
    if (!qa) return;
    if (transcribing) return; // hard stop even if the button somehow got clicked
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/calculatescore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData?.user?.id,
          interview: [
            {
              question: qa.question.text,
              model_answer: qa.answer.model_answer,
              key_points: qa.answer.key_points,
              userAnswer: userAnswer || "",
            },
          ],
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.message || `Request failed with status ${res.status}`,
        );
      }
      setResult(data.results[0]);
      console.log(data.results);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell>
      <SectionHeader eyebrow="Diagnostic · Interview" />
      <div className="diagnostic-wrap">
        <div className="diagnostic-container">
          <div>
            {loading && <Spinner />}
            {!loading && error && (
              <h5 style={{ fontFamily: "JetBrains mono", fontWeight: "600" }}>
                Couldn't load question — {error}
              </h5>
            )}
            {!loading && !error && qa && (
              <h5 style={{ fontFamily: "JetBrains mono", fontWeight: "600" }}>
                Question: <Typewritertext readOnly text={qa.question.text} />
              </h5>
            )}
          </div>

          {!loading && !error && qa && (
            <div
              style={{ display: recordedUrl ? "none" : "block", marginTop: 32 }}
            >
              <Aimic
                onRecordingComplete={handleRecordingComplete}
                onTranscript={handleTranscript}
              />
            </div>
          )}

          {recordedUrl && (
            <div className="engulf-panel">
              {result ? (
                <div className="result-block">
                  <span className="result-score">{result.score}%</span>
                  <p className="result-reasoning">{result.reasoning}</p>
                </div>
              ) : (
                <>
                  <div className="playback-row">
                    <button
                      onClick={togglePlayback}
                      className="play-btn"
                      aria-label="Play recording"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span className="playback-label">Your answer</span>
                    <button
                      onClick={handleDelete}
                      className="delete-btn"
                      aria-label="Delete recording"
                    >
                      <Trash2 size={16} />
                    </button>
                    <audio
                      ref={audioElRef}
                      src={recordedUrl}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />
                  </div>

                  {submitError && <p className="error-text">{submitError}</p>}

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || transcribing}
                    className="submit-btn"
                  >
                    {transcribing
                      ? "Transcribing…"
                      : submitting
                        ? "Submitting…"
                        : "Submit answer"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .diagnostic-wrap { width: 100%; display: flex; min-height: 70vh; justify-content: center; align-items: center; }
        .diagnostic-container { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 520px; }
        .spinner-wrap { display: flex; justify-content: center; align-items: center; padding: 24px; }
        .spinner { width: 32px; height: 32px; border-radius: 50%; border: 3px solid rgba(15,61,46,0.15); border-top-color: #0f3d2e; animation: spin 0.8s linear infinite; }
        .engulf-panel { margin-top: 32px; width: 100%; background: #ffffff; border-radius: 24px; padding: 32px 24px; display: flex; flex-direction: column; align-items: center; gap: 16px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); animation: engulfIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes engulfIn { from { opacity: 0; transform: scale(0.92) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .playback-row { display: flex; align-items: center; gap: 12px; }
        .play-btn, .delete-btn { background: #f2f2f2; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .playback-label { font-family: Instrument Sans, sans-serif; font-size: 13px; color: #6b6055; }
        .submit-btn { background: #0f3d2e; color: #f2c879; border: none; border-radius: 999px; padding: 10px 28px; font-family: Instrument Sans, sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .error-text { color: #b3453f; font-size: 13px; font-family: Instrument Sans, sans-serif; }
        .result-block { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .result-score { font-size: 40px; font-weight: 700; color: #0f3d2e; font-family: JetBrains mono, monospace; }
        .result-reasoning { color: #6b6055; font-size: 13px; font-family: Instrument Sans, sans-serif; text-align: center; max-width: 380px; }
      `}</style>
    </AppShell>
  );
}
