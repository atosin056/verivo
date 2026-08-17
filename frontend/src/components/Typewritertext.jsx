import { useEffect, useState } from "react";

export default function Typewritertext({
  text = "",
  speed = 20,
  readOnly = false,
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      return;
    }

    setDisplayed("");

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span
      style={{
        fontSize: "11px",
        fontWeight: "400",

        // readonly behaviour
        userSelect: readOnly ? "none" : "text",
        WebkitUserSelect: readOnly ? "none" : "text",
        MozUserSelect: readOnly ? "none" : "text",
        msUserSelect: readOnly ? "none" : "text",
      }}
      onCopy={readOnly ? (e) => e.preventDefault() : undefined}
      onContextMenu={readOnly ? (e) => e.preventDefault() : undefined}
    >
      {displayed}

      {displayed.length < text.length && (
        <span className="typewriter-cursor">▌</span>
      )}
    </span>
  );
}
