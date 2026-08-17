import { Clock, ScanEye, Sparkles, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Clock,
    title: "48-hour evidence window",
    description:
      "Both sides upload photos / video. Auto-confirm clock pauses while open.",
  },
  {
    number: "02",
    icon: ScanEye,
    title: "Vision model analyses",
    description:
      "Does the photo match the described complaint? Common faults are tagged.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "LLM proposes a resolution",
    description:
      "With reasoning visible to both sides. You can accept or escalate.",
  },
  {
    number: "04",
    icon: Users,
    title: "Human review only on conflicts",
    description:
      "If parties don't agree, or AI confidence < 60%, a Recivo ombudsperson takes the case.",
  },
];

export default function DisputeResolution() {
  return (
    <div className="dispute-card">
      <h2 className="dispute-card__title">How disputes are resolved</h2>

      <ul className="dispute-card__list">
        {steps.map((step) => (
          <li className="dispute-step" key={step.number}>
            <span className="dispute-step__badge">{step.number}</span>

            <div className="dispute-step__content">
              <h3 className="dispute-step__title">
                {/* <step.icon
                  className="dispute-step__icon"
                  size={16}
                  strokeWidth={2}
                /> */}
                {step.title}
              </h3>
              <p className="dispute-step__description">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
