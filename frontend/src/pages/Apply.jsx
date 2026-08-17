import { useState, useEffect } from "react";
import axios from "axios";
import ApplySidebar from "../components/Applysidebar";
import InterviewTopbar from "../components/InterviewTopbar";
import { useNavigate } from "react-router-dom";
import ApplyIntro from "../components/ApplyIntro";
import Applicationcards from "../components/Applicationcards";
import PromiseBanner from "../components/Promisebanner";
import ApplyFooterNav from "../components/Applyfooternav";
import FormField from "../components/FormField";
import TradeSelect from "../components/TradeSelect";
import SubSpecialtiesSelect from "../components/SubSpecialtiesSelect";
import LearningPathSelect from "../components/Learningpathselect";
import { getSubSpecialtiesForTrade } from "../Tradesubspecialties";
import WorkplaceHistory from "../components/Workplacehistory";
import ToolsSelect from "../components/Toolsselect";
import { getToolsForTrade } from "../tradeTools.js";
import LanguageSelect from "../components/LanguageSelect.jsx";
import ReferenceList from "../components/Referencelist.jsx";
import BankVerify from "../components/BankVerify.jsx";
import VoicePrintCard from "../components/Voiceprintcard.jsx";

const STEPS = [
  { label: "Who you are", subSteps: 3 },
  { label: "Your story", subSteps: 4 },
  { label: "Your voice", subSteps: 3 },
  { label: "Your proof", subSteps: 3 },
  { label: "Review", subSteps: 1 },
];

const TOTAL_STEPS = STEPS.reduce((sum, step) => sum + step.subSteps, 0);

const stepsBeforeIndex = (mainStepIdx) =>
  STEPS.slice(0, mainStepIdx).reduce((sum, step) => sum + step.subSteps, 0);

const INITIAL_FORM_DATA = {
  fullName: "",
  phone: "",
  role: null,
  nickname: "",
  city: "",
  marketArea: "",
  yearSetUp: "",
  trade: null,
  subSpecialties: [],
  learningPath: null,
  workplaces: [{ place: "", role: "", yearFrom: "", yearTo: "" }],
  mastersName: "",
  yearLearned: "",
  tools: [],
  language: null,
  references: [{ name: "", phone: "", howTheyKnowYou: "" }],
  pitch: "",
  proudJobStory: "",
  difficultCustomerStory: "",
};

// On mount: prefer whatever's already been auto-saved mid-application
// (VerivoApplyData). If that's empty (first ever visit), fall back to
// the seed dropped by Register.jsx right after OTP verify
// (VerivoApplySeed — name/phone/trade/role). If neither exists, start blank.
const getInitialFormData = () => {
  try {
    const saved = sessionStorage.getItem("VerivoApplyData");
    if (saved) return { ...INITIAL_FORM_DATA, ...JSON.parse(saved) };
  } catch {
    // ignore corrupt saved state, fall through to seed
  }

  try {
    const seed = sessionStorage.getItem("VerivoApplySeed");
    if (seed) return { ...INITIAL_FORM_DATA, ...JSON.parse(seed) };
  } catch {
    // ignore corrupt seed
  }

  return INITIAL_FORM_DATA;
};

export default function Apply() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [formData, setFormData] = useState(getInitialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Auto-save on every formData change so a refresh mid-application
  // doesn't lose progress. This is what the topbar's "Auto-saved · just
  // now" is actually referring to.
  useEffect(() => {
    sessionStorage.setItem("VerivoApplyData", JSON.stringify(formData));
  }, [formData]);

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const setField = (field) => (val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleTradeChange = (tradeKey) => {
    setFormData((prev) => ({
      ...prev,
      trade: tradeKey,
      subSpecialties: [],
    }));
  };

  const activeStepConfig = STEPS[currentStep - 1];
  const isReviewStep = currentStep === STEPS.length;
  const globalStepNumber = stepsBeforeIndex(currentStep - 1) + currentSubStep;

  const handleSubmit = async () => {
    setSubmitError("");
    setSubmitting(true);

    console.log(formData);
  };

  const handleContinue = () => {
    if (isReviewStep) {
      handleSubmit();
      return;
    }

    const subStepsInThisStep = activeStepConfig.subSteps;

    if (currentSubStep < subStepsInThisStep) {
      setCurrentSubStep((prev) => prev + 1);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      setCurrentSubStep(1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (currentSubStep > 1) {
      setCurrentSubStep((prev) => prev - 1);
    } else if (currentStep > 1) {
      const prevStepConfig = STEPS[currentStep - 2];
      setCurrentStep((prev) => prev - 1);
      setCurrentSubStep(prevStepConfig.subSteps);
    } else {
      navigate(-1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepsForSidebar = STEPS.map((step, idx) => ({
    label: step.label,
    subProgress:
      idx + 1 === currentStep && step.subSteps > 1
        ? `${currentSubStep}/${step.subSteps}`
        : undefined,
  }));

  return (
    <>
      <InterviewTopbar
        currentStep={globalStepNumber}
        totalSteps={TOTAL_STEPS}
        saveStatus="Auto-saved · just now"
        onSaveExit={() => navigate("/app")}
      />
      <div
        style={{
          marginTop: "60px",
          width: "100%",
          display: "flex",
          paddingInline: "154px",
          gap: "70px",
        }}
      >
        <div style={{ width: "25%" }}>
          <ApplySidebar
            eyebrow="Application · 12 mins"
            currentStep={currentStep}
            steps={stepsForSidebar}
            whyText="Verivo doesn't just take a star rating from strangers. We build a credential. The deeper you go here, the better the diagnostic interview matches you and the higher your starting Işẹ́ Score."
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingBottom: "20px",
          }}
        >
          {currentStep === 1 && currentSubStep === 1 && (
            <>
              <ApplyIntro
                stepLabel="01 · Begin"
                leadText="Welcome."
                emphasisText="Let's build your credential."
                name="there"
                body="Hello there. The next twelve minutes are about your work — who taught you, what you've fixed, what makes you different. We're not interviewing you. We're listening, so the diagnostic interview that comes next can match what you actually do."
              />
              <Applicationcards />
              <PromiseBanner />
            </>
          )}

          {currentStep === 1 && currentSubStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="01 · Who you are"
                leadText="What should we call you?"
                name="there"
                body="Your legal name goes on the credential. But customers know you by another name — your shop name, your tag. Tell us both."
              />
              <div
                style={{ flexDirection: "column", display: "flex", gap: 13 }}
              >
                <FormField
                  label="Full legal name"
                  required
                  value={formData.fullName}
                  onChange={updateField("fullName")}
                />
                <FormField
                  label="What customers call you"
                  placeholder="Tunde Phone Doctor"
                  value={formData.nickname}
                  onChange={updateField("nickname")}
                />
              </div>
            </div>
          )}

          {currentStep === 1 && currentSubStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="01 · Who you are"
                leadText="Where do you work?"
                name="there"
                body="City, the market or street, and the year you set up at this location. Customers will see this on your profile."
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                  }}
                >
                  <FormField
                    label="City"
                    placeholder="Lagos"
                    required
                    value={formData.city}
                    onChange={updateField("city")}
                  />
                  <FormField
                    label="Market / area"
                    required
                    placeholder="Computer Village / Ikeja"
                    value={formData.marketArea}
                    onChange={updateField("marketArea")}
                  />
                </div>
                <div>
                  <FormField
                    label="Year you set up here"
                    placeholder="2010"
                    value={formData.yearSetUp}
                    onChange={updateField("yearSetUp")}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && currentSubStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="02 · Your story"
                leadText="What work do you do?"
                name="there"
                body="Pick the closest match. You'll choose sub-specialties next. We add a new trade every six weeks — if yours isn't listed, write it in."
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 30 }}
              >
                <TradeSelect
                  value={formData.trade}
                  onChange={handleTradeChange}
                />
                <div>
                  <SubSpecialtiesSelect
                    options={getSubSpecialtiesForTrade(formData.trade)}
                    value={formData.subSpecialties}
                    onChange={setField("subSpecialties")}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && currentSubStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="02 · Your story"
                leadText="How did you"
                emphasisText="learn"
                trailText="this work?"
                name="there"
                body="Every trade has a path in — under a master, in a family workshop, at a school, or by yourself with YouTube and patience. None of these are worse than the others. We just want to know yours."
              />
              <div>
                <LearningPathSelect
                  label=""
                  value={formData.learningPath}
                  onChange={setField("learningPath")}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: 20,
                }}
              >
                <FormField
                  label="Master's name"
                  placeholder="Baba Wale · stall 142, Computer Village"
                  value={formData.mastersName}
                  onChange={updateField("mastersName")}
                />
                <FormField
                  label="Year you set up here"
                  placeholder="2010"
                  required
                  value={formData.yearLearned}
                  onChange={updateField("yearLearned")}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && currentSubStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="02 · Your story"
                leadText="Where else have you worked?"
                name="there"
                body="Up to three places. Apprenticeships count. Family workshops count. The more of your timeline we can show employers, the easier the hire."
              />
              <div>
                <WorkplaceHistory
                  value={formData.workplaces}
                  onChange={setField("workplaces")}
                  maxEntries={3}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && currentSubStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="02 · Your story"
                leadText="Which tools do you own?"
                name="there"
                body="Tools say more than years. A motherboard repair tech without a microscope is doing screens, not boards. Pick what's yours. Add anything we missed."
              />
              <div>
                <ToolsSelect
                  options={getToolsForTrade(formData.trade)}
                  value={formData.tools}
                  onChange={setField("tools")}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && currentSubStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="03 · Your voice"
                leadText="What languages can you work in?"
                name="there"
                body="Customers and the voice agent will switch into whichever you pick. You can speak two, three, five — we'll listen in all of them."
              />
              <div>
                <LanguageSelect
                  value={formData.language}
                  onChange={setField("language")}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && currentSubStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="03 · Your voice"
                leadText="In your own words"
                emphasisText="what makes your work different"
                trailText="?"
                name="there"
                body="Not what we tell employers. What you tell them. Speak the way you would in your shop — Pidgin, English, mixed, whatever feels real."
              />
              <div>
                <FormField
                  type="textarea"
                  label="Two or three sentences. Be specific."
                  placeholder="Most of the people in this market do screen swap and battery. I dey go board level — I fit chase short on motherboard, no be guess work. That's why customer dey return."
                  underText="We display this verbatim to employers."
                  maxLength={600}
                  value={formData.pitch}
                  onChange={updateField("pitch")}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && currentSubStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="03 · Your voice"
                leadText="Tell us about a job you’re proud of."
                name="there"
                body="One specific repair, one specific garment, one specific install. Not the easy one — the hard one that worked. We use it to seed your portfolio."
              />
              <div>
                <FormField
                  type="textarea"
                  label="The Story"
                  placeholder="MA Samsung S20 fell in water for three days. Customer say na throw away. I drained the board, ultrasonic for forty minutes, replaced the audio IC. The phone came back. He still uses it today."
                  underText="Optional but strongly encouraged."
                  maxLength={500}
                  value={formData.proudJobStory}
                  onChange={updateField("proudJobStory")}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && currentSubStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="04 · Your proof"
                leadText="A difficult customer. How did you handle it?"
                name="there"
                body="We're not testing whether the customer was wrong. We're listening for how you reasoned through it — what you'd say to make it right."
              />
              <div>
                <FormField
                  type="textarea"
                  label="What happened and what you did"
                  placeholder="One customer say the new screen I put dey flicker after two days. I no argue. I tell am bring am back, I open am, the ribbon don shift — I seat am, tested under charge for thirty minutes. No charge. He came back twice after that with friends."
                  underText="Optional. Speak honestly."
                  maxLength={500}
                  value={formData.difficultCustomerStory}
                  onChange={updateField("difficultCustomerStory")}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && currentSubStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="04 · Your proof"
                leadText="Two people who can vouch for you."
                name="there"
                body="Past customers, masters, suppliers, neighbours in your market. We don't call them at sign-up — only if a dispute requires it. They're not seen by employers."
              />
              <div>
                <ReferenceList
                  value={formData.references}
                  onChange={setField("references")}
                  maxEntries={3}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && currentSubStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="04 · Your proof"
                leadText="Where should"
                emphasisText="payments"
                trailText="land?"
                name="there"
                body="Paystack confirms the name on this account matches your legal name. It's the only KYC we do — no document upload, no BVN drama. Three API calls and you're verified."
              />
              <div>
                <BankVerify />
              </div>
            </div>
          )}

          {isReviewStep && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <ApplyIntro
                stepLabel="04 · Your proof"
                leadText="Now your voice"
                name="there"
                body="Read the line below in any language you're comfortable in. We use this to confirm it's you on future retakes — and only for that. Deletable on request."
              />
              <div>
                <VoicePrintCard />
              </div>

              {submitError && (
                <p
                  style={{
                    color: "#c0392b",
                    fontFamily: "Instrument Sans",
                    fontSize: "13px",
                    margin: 0,
                  }}
                >
                  {submitError}
                </p>
              )}
            </div>
          )}

          <ApplyFooterNav
            onBack={handleBack}
            onContinue={handleContinue}
            continueLabel={isReviewStep ? "Submit application" : undefined}
            loading={isReviewStep ? submitting : false}
          />
        </div>
      </div>
    </>
  );
}
