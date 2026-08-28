import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Sparkles, Loader2 } from "lucide-react";

function JobInputCard({
  value = "",
  onChange = () => {},
  suggestions = [],
  onSuggestionClick,
  onParse = () => {},
  parsing = false,
  placeholder = "Describe what you need done...",
  maxLength = 600,
}) {
  const [isListening, setIsListening] = useState(false);
  const [micUnsupported, setMicUnsupported] = useState(false);
  const [micError, setMicError] = useState(null);
  const [focused, setFocused] = useState(false);

  const recognitionRef = useRef(null);
  const baseTextRef = useRef("");
  const wantListeningRef = useRef(false);

  // ---------------------------------------------------------
  // Stop listening
  // ---------------------------------------------------------
  const stopListening = useCallback(() => {
    wantListeningRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.log("Speech recognition already stopped.");
      }
    }

    setIsListening(false);
  }, []);

  // ---------------------------------------------------------
  // Start listening
  // ---------------------------------------------------------
  const startListening = useCallback(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    // Browser doesn't support SpeechRecognition
    if (!SpeechRecognition) {
      setMicUnsupported(true);
      setMicError(null);
      return;
    }

    setMicUnsupported(false);
    setMicError(null);

    // Stop any previous recognition instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // Ignore
      }
    }

    const recognition = new SpeechRecognition();

    // -------------------------------------------------------
    // Configuration
    // -------------------------------------------------------
    recognition.continuous = true;
    recognition.interimResults = true;

    // en-US tends to have better browser support than en-NG
    recognition.lang = "en-US";

    // Keep whatever the user already typed
    baseTextRef.current = value ? `${value.trim()} ` : "";

    // -------------------------------------------------------
    // Speech result
    // -------------------------------------------------------
    recognition.onresult = (event) => {
      console.log("🎤 Speech result:", event);

      let finalChunk = "";
      let interimChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];

        const transcript = result[0]?.transcript || "";

        console.log("Transcript:", transcript);

        if (result.isFinal) {
          finalChunk += transcript + " ";
        } else {
          interimChunk += transcript;
        }
      }

      // Save final speech permanently
      if (finalChunk) {
        baseTextRef.current += finalChunk;
      }

      // Show both confirmed + currently spoken text
      const newValue = (baseTextRef.current + interimChunk).slice(0, maxLength);

      console.log("📝 Updating textarea:", newValue);

      onChange({
        target: {
          value: newValue,
        },
      });
    };

    recognition.onstart = () => {
      console.log("🎤 Recognition started");
    };

    recognition.onaudiostart = () => {
      console.log("🔊 Audio capture started");
    };

    recognition.onsoundstart = () => {
      console.log("🔊 Sound detected");
    };

    recognition.onspeechstart = () => {
      console.log("🗣️ Speech detected");
    };

    recognition.onresult = (event) => {
      console.log("✅ Speech result received:", event);

      let finalChunk = "";
      let interimChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        console.log("Transcript:", transcript);

        if (event.results[i].isFinal) {
          finalChunk += transcript + " ";
        } else {
          interimChunk += transcript;
        }
      }

      if (finalChunk) {
        baseTextRef.current += finalChunk;
      }

      const newValue = (baseTextRef.current + interimChunk).slice(0, maxLength);

      console.log("📝 New textarea value:", newValue);

      onChange({
        target: {
          value: newValue,
        },
      });
    };

    // -------------------------------------------------------
    // Recognition error
    // -------------------------------------------------------
    recognition.onerror = (event) => {
      console.error("🎤 Speech recognition error:", event.error);

      if (event.error === "no-speech") {
        return;
      }

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        wantListeningRef.current = false;
        setIsListening(false);

        setMicError(
          "Microphone access was blocked. Allow microphone access for this site and try again.",
        );

        return;
      }

      if (event.error === "audio-capture") {
        wantListeningRef.current = false;
        setIsListening(false);

        setMicError(
          "No microphone could be detected. Check your microphone and try again.",
        );

        return;
      }

      if (event.error === "network") {
        wantListeningRef.current = false;
        setIsListening(false);

        setMicError(
          "Speech recognition could not connect to the speech service.",
        );

        return;
      }

      wantListeningRef.current = false;
      setIsListening(false);

      setMicError(`Voice input error: ${event.error}`);
    };

    // -------------------------------------------------------
    // Recognition ended
    // -------------------------------------------------------
    recognition.onend = () => {
      console.log("🎤 Recognition ended");

      // Chrome sometimes ends continuous recognition automatically.
      // Restart it if the user hasn't pressed Stop.
      if (wantListeningRef.current) {
        console.log("🔄 Restarting speech recognition...");

        try {
          recognition.start();
          return;
        } catch (err) {
          console.error("Could not restart recognition:", err);
        }
      }

      setIsListening(false);
    };

    // Store the recognition instance BEFORE starting it
    recognitionRef.current = recognition;
    wantListeningRef.current = true;

    try {
      recognition.start();

      console.log("🎤 Speech recognition started");

      setIsListening(true);
    } catch (err) {
      console.error("Failed to start speech recognition:", err);

      wantListeningRef.current = false;
      setIsListening(false);

      setMicError(
        "Could not start voice input. Please check your microphone permissions and try again.",
      );
    }
  }, [value, onChange, maxLength]);

  // ---------------------------------------------------------
  // Toggle microphone
  // ---------------------------------------------------------
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // ---------------------------------------------------------
  // Suggestions
  // ---------------------------------------------------------
  const handleSuggestion = (text) => {
    if (onSuggestionClick) {
      onSuggestionClick(text);
    } else {
      onChange({
        target: {
          value: text,
        },
      });
    }
  };

  // ---------------------------------------------------------
  // Cleanup when component unmounts
  // ---------------------------------------------------------
  useEffect(() => {
    return () => {
      wantListeningRef.current = false;

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          // Ignore
        }
      }
    };
  }, []);

  const charCount = value?.length || 0;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "640px",
        border: `1px solid ${focused ? "#0f3d2e" : "#d6cdb8"}`,
        boxShadow: focused ? "0px 0px 4px rgba(57, 107, 90, 0.6)" : "none",
        borderRadius: "20px",
        padding: "24px",
        boxSizing: "border-box",
        fontFamily: "'Instrument Sans', sans-serif",
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: "10.5px",
            letterSpacing: "0.22em",
            fontWeight: 600,
            color: "#6b6055",
            textTransform: "uppercase",
          }}
        >
          What needs doing
        </span>

        <button
          type="button"
          onClick={toggleListening}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
            borderRadius: "999px",
            border: `1px solid ${isListening ? "#0f3d2e" : "#d6cdb8"}`,
            background: isListening ? "#0f3d2e" : "#f4efe6",
            color: isListening ? "#f4efe6" : "#14110f",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {isListening ? (
            <>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#ea580c",
                  animation: "jic-pulse 1s infinite",
                }}
              />
              Listening…
            </>
          ) : (
            <>
              <Mic size={14} />
              Speak instead
            </>
          )}
        </button>
      </div>

      {/* Main textarea */}
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          resize: "none",
          color: "#14110f",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "15.5px",
          lineHeight: 1.55,
          boxSizing: "border-box",
        }}
      />

      {/* Microphone unsupported */}
      {micUnsupported && (
        <p
          style={{
            fontSize: "12px",
            color: "#b3261e",
            margin: "4px 2px 0",
          }}
        >
          Voice input isn't supported in this browser. Try Chrome or Edge, or
          type instead.
        </p>
      )}

      {/* Microphone error */}
      {micError && !micUnsupported && (
        <p
          style={{
            fontSize: "12px",
            color: "#b3261e",
            margin: "4px 2px 0",
          }}
        >
          {micError}
        </p>
      )}

      {/* Suggestion chips */}
      {suggestions.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "16px",
            marginBottom: "20px",
          }}
        >
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSuggestion(s)}
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: "1px solid #d6cdb8",
                background: "#f4efe6",
                color: "#4a4137",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: suggestions.length > 0 ? 0 : "16px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#8a8072",
          }}
        >
          {charCount}/{maxLength}
        </span>

        <button
          type="button"
          onClick={() => onParse(value)}
          disabled={parsing || !value.trim()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            borderRadius: "999px",
            border: "none",
            background: !value.trim() ? "#7c9186" : "#0f3d2e",
            color: "#f4efe6",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            cursor: parsing || !value.trim() ? "not-allowed" : "pointer",
            opacity: parsing ? 0.8 : 1,
          }}
        >
          {parsing ? (
            <Loader2
              size={16}
              style={{
                animation: "jic-spin 0.8s linear infinite",
              }}
            />
          ) : (
            <Sparkles size={16} />
          )}

          {parsing ? "Parsing…" : "Parse with AI"}
        </button>
      </div>

      <style>{`
        @keyframes jic-pulse {
          0%, 100% {
            opacity: 1;
          }

          50% {
            opacity: 0.3;
          }
        }

        @keyframes jic-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

// -------------------------------------------------------------
// Demo
// -------------------------------------------------------------

export default function Demo() {
  const [formInput, setFormInput] = useState("");
  const [parsing, setParsing] = useState(false);
  const [lastParsed, setLastParsed] = useState(null);

  const suggestions = [
    "Phone repair · Ikeja · today",
    "Generator service · Sabon Gari",
  ];

  const handleParse = (text) => {
    setParsing(true);

    setTimeout(() => {
      setParsing(false);
      setLastParsed(text);
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#efe9dc",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
        }}
      >
        <JobInputCard
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
          suggestions={suggestions}
          onParse={handleParse}
          parsing={parsing}
        />

        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #d6cdb8",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              color: "#8a8072",
              margin: "0 0 6px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            formInput (live)
          </p>

          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "14px",
              color: "#14110f",
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {formInput || <em style={{ color: "#8a8072" }}>empty</em>}
          </p>

          {lastParsed && (
            <>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: "#8a8072",
                  margin: "14px 0 6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                last onParse() payload
              </p>

              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "14px",
                  color: "#14110f",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {lastParsed}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { JobInputCard };
