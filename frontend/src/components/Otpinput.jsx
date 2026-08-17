import { useRef, useState, useEffect } from "react";

/**
 * OtpInput
 *
 * A row of single-digit boxes for entering a numeric code, e.g. phone
 * verification. Auto-advances focus as you type, jumps back on backspace,
 * and supports pasting a full code across boxes.
 *
 * Props:
 * ------
 * length     (number) how many digits/boxes (default: 6)
 * onChange   (func)   called with the current code string on every change
 * onComplete (func)   called with the full code string once all boxes are filled
 * error      (bool)   shows the error border color when true
 */
export default function OtpInput({
  length = 6,
  onChange,
  onComplete,
  error = false,
}) {
  const [digits, setDigits] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    const code = digits.join("");
    onChange?.(code);
    console.log("OTP:", code);
    if (code.length === length && !code.includes("")) {
      onComplete?.(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  const focusBox = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < length - 1) {
      focusBox(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        focusBox(index - 1);
      }
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusBox(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusBox(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);
    if (!pasted) return;

    const next = Array(length).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);

    const focusIndex = Math.min(pasted.length, length - 1);
    focusBox(focusIndex);
  };

  return (
    <div className="otp-input" onPaste={handlePaste}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={`otp-input__box${error ? " otp-input__box--error" : ""}`}
        />
      ))}
    </div>
  );
}
