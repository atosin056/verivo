import { useState, useEffect } from "react";

export default function Typewritertext({ text, speed = 20, readOnly = false }) {
  const [displayed, setDisplayed] = useState(readOnly ? text : "");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, readOnly]);

  return (
    <span
      style={{
        fontSize: "11px",
        fontWeight: "400",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      onCopy={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {displayed}
      {!readOnly && <span className="typewriter-cursor">▌</span>}
    </span>
  );
}
