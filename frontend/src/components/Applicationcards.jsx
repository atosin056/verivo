import React from "react";
import { Users, BookOpen, Mic, CheckCircle2 } from "lucide-react";

const cards = [
  {
    icon: Users,
    title: "Who you are",
    time: "2 min",
    description: "Name, location, trade.",
  },
  {
    icon: BookOpen,
    title: "Your story",
    time: "4 min",
    description: "How you learned. Where you've worked. Tools you own.",
  },
  {
    icon: Mic,
    title: "Your voice",
    time: "3 min",
    description: "What sets you apart, in your own words.",
  },
  {
    icon: CheckCircle2,
    title: "Your proof",
    time: "3 min",
    description: "References, photos, bank, voice biometric.",
  },
];

export default function Applicationcards() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        {cards.map(({ icon: Icon, title, time, description }) => (
          <div
            key={title}
            style={{
              background: "#F4F0E6",
              border: "1px solid #C9BFA0",
              borderRadius: 12,
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", gap: 15 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: "#E4DEC9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={17} color="#3F3A2E" strokeWidth={2} />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div
                    style={{
                      fontSize: 15.5,
                      fontFamily: "Instrument Sans",
                      fontWeight: 600,
                      color: "#2B2A22",
                    }}
                  >
                    {title}
                  </div>

                  <div
                    style={{
                      fontSize: 11.5,
                      fontFamily: "Instrument Sans",
                      color: "#6b6055",
                      lineHeight: 1.4,
                    }}
                  >
                    {description}
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: "#6b6055",
                  whiteSpace: "nowrap",
                  paddingTop: 4,
                  fontFamily: "JetBrains Mono",
                }}
              >
                {time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
