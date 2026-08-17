import LinearContainer from "../components/LinearContainer";
import logo from "../assets/logo.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import RegChoice from "../components/RegChoice";
import Animate from "../components/Animate";
import AuthIntro from "../components/AuthIntro";
import RoleToggle from "../components/RoleToggle";
import FormField from "../components/FormField";
import TradeSelect from "../components/TradeSelect";
import AgreementCheckbox from "../components/AgreementCheckbox";
import PrimaryActionButton from "../components/PrimaryActionBtn";
import TrustBadge from "../components/TrustBadge";
import OtpInput from "../components/Otpinput";
import OtpToast from "../components/OtpToast";
export default function Register() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [otp_hash, setOtpHash] = useState("");

  // Seed role from whatever's in the URL the moment this mounts...
  const [role, setRole] = useState(() => searchParams.get("role"));

  // "details" = the name/phone/trade form, "otp" = the code-verification screen
  const [step, setStep] = useState("details");
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  // Single source of truth for everything this form collects. Shape this
  // to match whatever your backend endpoint expects as the payload.
  const [formData, setFormData] = useState({
    role: role,
    name: "",
    phone: "",
    trade: "",
    agreed: false,
    otp: "",
  });

  useEffect(() => {
    setRole(searchParams.get("role"));
    setFormData((prev) => ({ ...prev, role: searchParams.get("role") }));
  }, [searchParams]);

  // Generic setter: updateField("name", "Tosin"), updateField("agreed", true), etc.
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [continueError, setContinueError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleContinue = async () => {
    if (!formData.name.trim()) {
      setContinueError("Enter your name.");
      return;
    }
    if (!formData.phone.trim()) {
      setContinueError("Enter your phone number.");
      return;
    }
    if (!formData.trade) {
      setContinueError("Pick a trade.");
      return;
    }
    if (!formData.agreed) {
      setContinueError("Please agree to the Terms and Privacy Notice.");
      return;
    }

    setContinueError("");
    setSendingOtp(true);

    try {
      const payload = { phone: formData.phone.trim(), purpose: "signup" };
      const response = await axios.post(
        "http://localhost:3000/otp/generate",
        payload,
      );
      setOtpHash(response.data.otp);
      setStep("otp");
    } catch (err) {
      setContinueError(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerify = () => {
    if (formData.otp.length < 6) {
      setOtpError("Enter all 6 digits.");
      return;
    }
    setOtpError("");
    setVerifying(true);

    const verifyOtp = async (phone, otp) => {
      try {
        const payload = {
          phone: phone,
          otp: otp,
          purpose: "signup",
        };
        await axios.post("http://localhost:3000/otp/verify", payload);
        setVerified(true);

        sessionStorage.setItem(
          "VerivoApplySeed",
          JSON.stringify({
            fullName: formData.name,
            phone: formData.phone,
            trade: formData.trade,
            role: formData.role,
          }),
        );

        navigate("/apply");

        //setRegStep(1);
      } catch (err) {
        console.log(err.message);
        setVerified(false);
        setOtpError("Invalid or Expired OTP, Please try again");
      } finally {
        setVerifying(false);
      }
    };

    verifyOtp(formData.phone.trim(), formData.otp);
  };

  return (
    <>
      <div>
        <div className="register-shell">
          <LinearContainer>
            <Animate
              delay={0.05}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
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
                “If the customer can see I passed the test before hiring me, I
                dont need to beg for the job. The test is begging for me.”
              </h2>
              <figcaption class="figcaption">
                <span class="line"></span>
                <span style={{ fontFamily: "Instrument Sans" }}>
                  <strong>Emeka</strong> · Phone repair · Computer Village
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
          <div className="register-form-col" style={{ overflowY: "auto" }}>
            <div className="register-form-inner">
              {role ? (
                <div className="register-form-inner-alt">
                  {step === "details" ? (
                    <Animate
                      delay={0.05}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <AuthIntro
                        eyebrow="Create your Verivo"
                        description="First, your phone. Then we open a Paystack Virtual Account in the background while you do the real work — the diagnostic interview."
                      >
                        <div>
                          Let’s set up the
                          <br />
                          <span
                            style={{ color: "#0f3d2e", fontStyle: "italic" }}
                          >
                            paperwork.
                          </span>
                        </div>
                      </AuthIntro>
                      <RoleToggle
                        value={role}
                        onChange={(next) =>
                          setSearchParams((prev) => {
                            const params = new URLSearchParams(prev);
                            params.set("role", next);
                            return params;
                          })
                        }
                      />
                      <div>
                        <FormField
                          type="text"
                          label="Your name"
                          required={true}
                          placeholder="Oluwatosin Akinfenwa"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                        />
                        <FormField
                          type="tel"
                          label="Phone number"
                          required={true}
                          placeholder="803 000 0000"
                          countryCode="+234"
                          countryLabel="NG"
                          underText="We'll send a one-time code. No password to remember."
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <TradeSelect
                          value={formData.trade}
                          onChange={(key) => updateField("trade", key)}
                        />
                      </div>
                      <div>
                        <AgreementCheckbox
                          checked={formData.agreed}
                          onChange={(val) => updateField("agreed", val)}
                          color="#0f3d2e"
                        >
                          I agree to the Verivo Terms and Privacy Notice .
                          NDPR-compliant; voice recordings deletable on request.
                        </AgreementCheckbox>
                      </div>

                      {continueError && (
                        <p
                          style={{
                            color: "#c0392b",
                            fontFamily: "Instrument Sans",
                            fontSize: "13px",
                            margin: 0,
                          }}
                        >
                          {continueError}
                        </p>
                      )}

                      <div>
                        <PrimaryActionButton
                          onClick={handleContinue}
                          loading={sendingOtp}
                        >
                          {sendingOtp
                            ? "Sending OTP…"
                            : "Continue — verify your phone"}
                        </PrimaryActionButton>
                      </div>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <TrustBadge
                          icon="./src/assets/shield.png"
                          label="OTP, never a password"
                        />
                        <TrustBadge
                          icon="./src/assets/mic.png"
                          label="Voice biometric for re-auth"
                        />
                        <TrustBadge
                          icon="./src/assets/star.png"
                          label="Paystack VA provisioned for you"
                        />
                      </div>
                      <div>
                        <h4
                          className="already-with-us"
                          style={{ color: "#6f6c63" }}
                        >
                          Already on Verivo?
                          <Link to="/auth/login">
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
                              Sign in
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
                          <span
                            style={{ color: "#0f3d2e", fontStyle: "italic" }}
                          >
                            code.
                          </span>
                        </div>
                      </AuthIntro>

                      <div>
                        <OtpToast otp={otp_hash} />
                        <OtpInput
                          length={6}
                          error={!!otpError}
                          onChange={(code) => updateField("otp", code)}
                          onComplete={(code) => updateField("otp", code)}
                        />
                      </div>

                      {otpError && (
                        <p
                          style={{
                            color: "#c0392b",
                            fontFamily: "Instrument Sans",
                            fontSize: "13px",
                            margin: 0,
                          }}
                        >
                          {otpError}
                        </p>
                      )}

                      <div>
                        <PrimaryActionButton
                          onClick={handleVerify}
                          loading={verifying}
                        >
                          Verify and continue
                        </PrimaryActionButton>
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
              ) : (
                <>
                  <div style={{ paddingTop: "100px" }}>
                    <Link to="/">
                      <Animate
                        delay={0.05}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 12H5M5 12L11 6M5 12L11 18"
                            stroke="#2A2A28"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <h4 className="auth-go-back">Back</h4>
                      </Animate>
                    </Link>
                    <div>
                      <Animate delay={0.16}>
                        <AuthIntro
                          eyebrow="Sign in or Join"
                          description="Verivo serves two sides. Pick one and we’ll tailor what you’re asked to share. You can switch later."
                        >
                          Are you here to{" "}
                          <span
                            style={{ color: "#0f3d2e", fontStyle: "italic" }}
                          >
                            do the <br /> work
                          </span>
                          , <br />
                          or to <span style={{ color: "#ea580c" }}>
                            hire
                          </span>{" "}
                          it?
                        </AuthIntro>
                      </Animate>
                      <Animate
                        stagger
                        delay={0.3}
                        step={0.1}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <Link to="?role=worker">
                          <RegChoice
                            icon="../src/assets/workerTools.png"
                            iconBg="#E2E0D6"
                            eyebrow="01 — Artisans, technicians, craftspeople"
                            bigText="I do the work"
                            smallText="Prove a real trade. Get matched to jobs. Build a portable credential employers can replay before hiring."
                          />
                        </Link>
                        <Link to="?role=employer">
                          <RegChoice
                            icon="../src/assets/employer.png"
                            iconBg="#F2E1D2"
                            hoverColor="#EA580C"
                            eyebrow="02 — Brands, SMEs, fleet managers"
                            bigText="I hire the work"
                            smallText="Post in plain language. Replay each worker's diagnostic interview. Fund per-job escrow. Release on completion."
                          />
                        </Link>
                      </Animate>
                      <Animate
                        delay={0.49}
                        style={{ paddingTop: "20px", paddingBottom: "20px" }}
                      >
                        <div className="register-bottom-row">
                          <h4 className="already-with-us">
                            Already with us?
                            <Link to="/auth/login">
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
                                Sign in
                              </span>
                            </Link>
                          </h4>
                          <div>
                            <Link to="/">
                              <h3
                                style={{
                                  color: "#14110a",
                                  fontFamily: "Instrument Sans",
                                  fontWeight: "400",
                                  fontSize: "15px",
                                }}
                              >
                                Back to home
                              </h3>
                            </Link>
                          </div>
                        </div>
                      </Animate>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
