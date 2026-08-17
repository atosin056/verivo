import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

const tokens = {
  bg: "#F4F0E6",
  label: "#14110F",
  required: "#EA580C",
  border: "#D6CDB8",
  focusBorder: "#0F3D2E",
  placeholder: "#B0A793",
  helperText: "#6B6055",
  verifyBorder: "#D6CDB8",
  verifyText: "#14110F",
  infoBg: "#F4F0E6",
  infoBorder: "#D6CDB8",
  infoText: "#6B6055",
  infoBold: "#14110F",
};

/**
 * BankVerify
 *
 * Bank + account number entry with a Paystack verification action and an
 * explainer card underneath.
 *
 * IMPORTANT: `banks` is NOT hardcoded here on purpose. Paystack needs a
 * bank CODE (e.g. "058" for GTBank), not just a name, to run account
 * resolution — and the correct list of banks + codes changes over time
 * (new fintechs get added, codes can shift). Fetch it live from Paystack's
 * List Banks endpoint through your own backend (see notes below the
 * component) and pass the result in as `banks`.
 *
 * Props:
 * ------
 * banks           (array)   [{ name, code }] — fetch from your backend, see below
 * bank            (string)  controlled selected bank CODE (not name)
 * onBankChange    (func)    called with the new bank code string
 * accountNumber   (string)  controlled account number
 * onAccountNumberChange (func) called with the change event
 * onVerify        (func)    called when "Verify with Paystack" is clicked
 * verifying       (bool)    shows a "Verifying…" state on the button
 * verified        (bool)    shows a verified state on the button
 * resolvedName    (string)  the account name returned by Paystack once verified —
 *                            shown under the button so the user can confirm it matches them
 */
export default function BankVerify({
  banks = [],
  bank,
  onBankChange,
  accountNumber,
  onAccountNumberChange,
  onVerify,
  verifying = false,
  verified = false,
  resolvedName,
}) {
  const [internalBank, setInternalBank] = useState("");
  const [internalAccountNumber, setInternalAccountNumber] = useState("");
  const [bankFocused, setBankFocused] = useState(false);

  const currentBank = bank !== undefined ? bank : internalBank;
  const currentAccountNumber =
    accountNumber !== undefined ? accountNumber : internalAccountNumber;

  const handleBankChange = (e) => {
    if (bank === undefined) setInternalBank(e.target.value);
    onBankChange?.(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    if (accountNumber === undefined) setInternalAccountNumber(e.target.value);
    onAccountNumberChange?.(e);
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        {/* Bank dropdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: tokens.label,
            }}
          >
            Bank
            <span style={{ color: tokens.required, marginLeft: "3px" }}>*</span>
          </label>

          <div style={{ position: "relative" }}>
            <select
              value={currentBank}
              onChange={handleBankChange}
              onFocus={() => setBankFocused(true)}
              onBlur={() => setBankFocused(false)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                appearance: "none",
                WebkitAppearance: "none",
                background: tokens.bg,
                border: `1.5px solid ${bankFocused ? tokens.focusBorder : tokens.border}`,
                borderRadius: "999px",
                padding: "16px 44px 16px 20px",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "15px",
                color: currentBank ? tokens.label : tokens.placeholder,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="" disabled>
                {banks.length ? "Pick your bank..." : "Loading banks…"}
              </option>
              {banks.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              color={tokens.label}
              style={{
                position: "absolute",
                right: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Account number */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: tokens.label,
            }}
          >
            Account number
            <span style={{ color: tokens.required, marginLeft: "3px" }}>*</span>
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            placeholder="0123456789"
            value={currentAccountNumber}
            onChange={handleAccountNumberChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: tokens.bg,
              border: `1px solid ${tokens.border}`,
              borderRadius: "12px",
              padding: "16px 18px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "15px",
              letterSpacing: "0.03em",
              color: tokens.label,
              outline: "none",
            }}
          />

          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "13px",
              color: tokens.helperText,
              margin: 0,
            }}
          >
            10 digits, no spaces. We do an instant name lookup.
          </p>
        </div>
      </div>

      {/* Verify button */}
      <button
        type="button"
        onClick={onVerify}
        disabled={verifying}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "24px",
          border: `1px solid ${tokens.verifyBorder}`,
          borderRadius: "999px",
          background: "transparent",
          padding: "14px 24px",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "14.5px",
          fontWeight: 600,
          color: tokens.verifyText,
          cursor: verifying ? "default" : "pointer",
          opacity: verifying ? 0.7 : 1,
        }}
      >
        <ShieldCheck size={17} strokeWidth={2} />
        {verified
          ? "Verified"
          : verifying
            ? "Verifying…"
            : "Verify with Paystack"}
      </button>

      {verified && resolvedName && (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13.5px",
            color: "#0F3D2E",
            fontWeight: 600,
            marginTop: "10px",
          }}
        >
          Account name: {resolvedName}
        </p>
      )}

      {/* Info card */}
      <div
        style={{
          marginTop: "20px",
          border: `1px solid ${tokens.infoBorder}`,
          borderRadius: "16px",
          background: tokens.infoBg,
          padding: "18px 20px",
        }}
      >
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13.5px",
            lineHeight: 1.55,
            color: tokens.infoText,
            margin: 0,
          }}
        >
          <span style={{ fontWeight: 700, color: tokens.infoBold }}>
            What Paystack does, exactly.{" "}
          </span>
          The Resolve Account Number API returns the registered name. We compare
          it to your legal name. If they match, you're KYC'd. No documents, no
          BVN forms.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// const [banks, setBanks] = useState([]);
// const [bank, setBank] = useState("");
// const [accountNumber, setAccountNumber] = useState("");
// const [verifying, setVerifying] = useState(false);
// const [verified, setVerified] = useState(false);
// const [resolvedName, setResolvedName] = useState("");
//
// // fetch the bank list once, from YOUR backend (which proxies Paystack)
// useEffect(() => {
//   fetch("/api/banks.php")
//     .then((res) => res.json())
//     .then((data) => setBanks(data.banks)); // [{ name, code }]
// }, []);
//
// <BankVerify
//   banks={banks}
//   bank={bank}
//   onBankChange={setBank}
//   accountNumber={accountNumber}
//   onAccountNumberChange={(e) => setAccountNumber(e.target.value)}
//   verifying={verifying}
//   verified={verified}
//   resolvedName={resolvedName}
//   onVerify={async () => {
//     setVerifying(true);
//     const res = await fetch("/api/verify-account.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ bank_code: bank, account_number: accountNumber }),
//     });
//     const data = await res.json();
//     setVerifying(false);
//     if (data.status) {
//       setVerified(true);
//       setResolvedName(data.account_name);
//     }
//   }}
// />
// ---------------------------------------------------------------------
