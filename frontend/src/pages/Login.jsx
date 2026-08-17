import LinearContainer from "../components/LinearContainer.jsx";
import logo from "../assets/logo.png";
import axios from "axios";
import Animate from "../components/Animate.jsx";
import AuthIntro from "../components/AuthIntro.jsx";
import FormField from "../components/FormField.jsx";
import { Link, useNavigate } from "react-router-dom";
import Primaryactionbtn from "../components/Primaryactionbtn.jsx";
import OtpInput from "../components/Otpinput.jsx";
import OtpToast from "../components/OtpToast.jsx";
import { useState } from "react";
export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);

  // "details" = phone entry screen, "otp" = code-verification screen
  const [step, setStep] = useState("details");
  const [otp_hash, setOtpHash] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const validatePhone = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Phone number is required.";
    }
    const digitsOnly = trimmed.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      return "Enter a valid phone number.";
    }
    return "";
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (error) {
      // clear the error as soon as it becomes valid again
      const validationError = validatePhone(value);
      setError(validationError);
    }
  };

  // Step 1: validate phone, request an OTP, move to the otp step
  const handleContinue = async () => {
    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSendingOtp(true);

    try {
      const payload1 = {
        phone: phone,
      };
      await axios.post("http://localhost:3000/api/verifyuser", payload1);

      const payload = { phone: phone.trim(), purpose: "login" };
      const response = await axios.post(
        "http://localhost:3000/otp/generate",
        payload,
      );
      setOtpHash(response.data.otp);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  // Step 2: verify the entered OTP
  const handleVerify = () => {
    if (otp.length < 6) {
      setOtpError("Enter all 6 digits.");
      return;
    }
    setOtpError("");
    setVerifying(true);

    const verifyOtp = async (phoneNumber, code) => {
      try {
        const payload = {
          phone: phoneNumber,
          otp: code,
          purpose: "login",
        };
        await axios.post("http://localhost:3000/otp/verify", payload);
        setVerified(true);
        setVerifying(false);
        navigate("/app");
      } catch (err) {
        console.log(err.message);
        setVerified(false);
        setOtpError("Invalid or expired OTP, please try again");
        setVerifying(false);
      }
    };

    verifyOtp(phone.trim(), otp);

    // TODO: once verified is true, redirect / fetch the user session here
  };

  return (
    <>
      <div>
        <div>
          <div className="register-shell">
            <LinearContainer>
              <Animate
                delay={0.05}
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <div>
                  <img src={logo} className="logo" alt="Verivo logo" />
                </div>
                <div>
                  <h4 className="logoText" style={{ color: "#fff" }}>
                    Verivo
                  </h4>
                </div>
              </Animate>
              <Animate delay={0.16} style={{ width: "80%" }}>
                <h4 className="mono-tabular-text">
                  Field Interview - Lagos - 2026
                </h4>
                <h2 className="editorial-text">
                  “I have hired three tailors in eighteen months who claimed to
                  do French seams. Two could not. Verification, before I pay,
                  would have saved me four hundred thousand naira.”
                </h2>
                <figcaption class="figcaption">
                  <span class="line"></span>
                  <span style={{ fontFamily: "Poppins" }}>
                    <strong>Adaeze </strong> · Fashion entrepreneur · Lekki
                  </span>
                </figcaption>
              </Animate>
              <Animate
                delay={0.27}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <h4 className="mono-tabular-text">
                    Skill is a verb. Prove it.
                  </h4>
                </div>
                <div>
                  <h4 className="mono-tabular-text">Verivo · v1.0</h4>
                </div>
              </Animate>
            </LinearContainer>
            <div
              className="register-form-col"
              style={{
                overflowY: "auto",

                padding: "10px",
              }}
            >
              <div className="register-form-inner">
                {step === "details" ? (
                  <Animate
                    delay={0.05}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AuthIntro
                      eyebrow="Welcome back"
                      description="We’ll send a one-time code to your phone. No password."
                    >
                      <div>
                        Pick up where{" "}
                        <span style={{ color: "#0f3d2e", fontStyle: "italic" }}>
                          you left it.
                        </span>
                      </div>
                    </AuthIntro>
                    <div style={{ width: "100%" }}>
                      <FormField
                        type="tel"
                        label="Phone number"
                        required={true}
                        placeholder="803 000 0000"
                        countryCode="+234"
                        countryLabel="NG"
                        value={phone}
                        underText={
                          error ? undefined : "Same number you signed up with."
                        }
                        onChange={handlePhoneChange}
                      />
                      {error && (
                        <p
                          role="alert"
                          style={{
                            color: "#b3261e",
                            fontSize: "13px",
                            marginTop: "6px",
                            fontFamily: "poppins",
                            marginBottom: 0,
                          }}
                        >
                          {error}
                        </p>
                      )}
                    </div>
                    <div style={{ width: "100%" }}>
                      <Primaryactionbtn
                        onClick={handleContinue}
                        loading={sendingOtp}
                      >
                        {sendingOtp ? "Sending code…" : "Verify and continue"}
                      </Primaryactionbtn>
                    </div>
                    <div style={{ width: "100%" }}>
                      <h4
                        className="already-with-us"
                        style={{ color: "#6f6c63" }}
                      >
                        New here?
                        <Link to="/auth/">
                          <span
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            style={{
                              paddingLeft: "5px",
                              textDecoration: "underline",
                              textDecorationColor: "#c89a2a",
                              color: hover ? "#0f3d2e" : "#14110f",
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "4px",
                              transition: "color 0.3s ease",
                            }}
                          >
                            Pick your role
                          </span>
                        </Link>
                      </h4>
                    </div>
                  </Animate>
                ) : (
                  <Animate
                    delay={0.05}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep("details")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        alignSelf: "flex-start",
                        width: "100%",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 12H5M5 12L11 6M5 12L11 18"
                          stroke="#2A2A28"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="auth-go-back">Back</h4>
                    </button>

                    <AuthIntro
                      eyebrow="Verify your phone"
                      description="We just sent a 6-digit code by SMS. Enter it below — it expires in 5 minutes."
                    >
                      <div>
                        Enter the
                        <br />
                        <span style={{ color: "#0f3d2e", fontStyle: "italic" }}>
                          code.
                        </span>
                      </div>
                    </AuthIntro>

                    <div style={{ width: "100%" }}>
                      <OtpToast otp={otp_hash} />
                      <OtpInput
                        length={6}
                        error={!!otpError}
                        onChange={(code) => setOtp(code)}
                        onComplete={(code) => setOtp(code)}
                      />
                    </div>

                    {otpError && (
                      <p
                        role="alert"
                        style={{
                          color: "#b3261e",
                          fontFamily: "Poppins",
                          fontSize: "13px",
                          margin: 0,
                          width: "100%",
                        }}
                      >
                        {otpError}
                      </p>
                    )}

                    <div style={{ width: "100%" }}>
                      <Primaryactionbtn
                        onClick={handleVerify}
                        loading={verifying}
                      >
                        Verify and continue
                      </Primaryactionbtn>
                    </div>

                    <h4
                      className="already-with-us"
                      style={{ color: "#6f6c63" }}
                    >
                      Didn't get a code?
                      <span
                        onClick={() => {
                          /* TODO: trigger resend-OTP API call */
                        }}
                        style={{
                          paddingLeft: "5px",
                          textDecoration: "underline",
                          textDecorationColor: "#c89a2a",
                          color: "#14110f",
                          textDecorationThickness: "2px",
                          textUnderlineOffset: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Resend
                      </span>
                    </h4>
                  </Animate>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
