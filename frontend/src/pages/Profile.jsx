import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import SectionHeader from "../components/Sectionheader";
import ProfileCard from "../components/ProfileCard";
import ToolsCard from "../components/Toolscard";
import ReviewCard from "../components/Reviewcard";
import useBreakpoint from "../hooks/useBreakpoint.js";

export default function Profile() {
  const navigate = useNavigate();
  const { isTablet } = useBreakpoint();

  const TOOLS = [
    "Microscope (Amscope SM-4)",
    "Hot air rework station",
    "Soldering iron · T12",
    "DC power supply · 30V/5A",
    "Multimeter · UNI-T",
    "Ultrasonic cleaner",
    "Tri-point set",
    "Programmer · NAND",
  ];

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Public profile · what employers see"
        leadText="This is"
        emphasisText="your page."
        description="Edit any block in place. Employers see this card before they hire. Replay of your diagnostic interview lives at the bottom."
      />

      <ProfileCard
        initials="OA"
        name="Oluwatosin Akinfenwa"
        verifiedLabel="Recivo · Verified"
        trade="Phone repair"
        location="Computer Village, Ikeja"
        knowledge={0}
        trust={0}
        iseScore={0}
        bio="Twelve years repairing Android boards. Started under Baba Wale at stall #142. Specialises in motherboard-level fault isolation."
        skills={[
          "Soldering · specialist",
          "Screen replacement",
          "Charging port",
          "Water damage",
          "Same-day",
        ]}
        glanceItems={[
          { icon: "check", text: "0 Squad-confirmed jobs" },
          { icon: "sparkle", text: "0% repeat customers" },
          { icon: "globe", text: "Yorùbá · Pidgin · English" },
          { icon: "phone", text: "Replies in 6 min avg." },
        ]}
        rate="₦2,200/hr"
        rateNote="negotiable"
        onReplacePhoto={() => console.log("replace photo")}
        onEditBio={() => console.log("edit bio")}
      />

      <div
        style={{
          display: "flex",
          flexDirection: isTablet ? "column" : "row",
          gap: "30px",
        }}
      >
        <div style={{ width: isTablet ? "100%" : "70%" }}>
          <ToolsCard
            tools={TOOLS}
            note="Tools are a stronger signal than years. Customers can ask before they hire."
            onEdit={() => console.log("edit tools")}
          />
        </div>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <h4 className="customers-say">What customers say</h4>
            <h5 className="reviews">24 reviews · 4.7 avg</h5>
          </div>
          <div
            style={{
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              maxHeight: "300px",
            }}
          >
            <ReviewCard
              name="Adaeze"
              customerTag="repeat customer"
              timeAgo="2 days ago"
              rating={5}
              quote="Twice now. He came with his own multimeter, fixed the charging port in twenty minutes, and explained what was wrong. I'll use him again."
              tags={["On-time", "Clean work", "Came with tools"]}
            />
            <ReviewCard
              name="Adaeze"
              customerTag="repeat customer"
              timeAgo="2 days ago"
              rating={5}
              quote="Twice now. He came with his own multimeter, fixed the charging port in twenty minutes, and explained what was wrong. I'll use him again."
              tags={["On-time", "Clean work", "Came with tools"]}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
