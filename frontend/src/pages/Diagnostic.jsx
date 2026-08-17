import AppShell from "../components/AppShell";
import SectionHeader from "../components/Sectionheader";
import Aimic from "../components/Aimic";
import Typewritertext from "../components/Typewritertext";
export default function Diagnostic() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Diagnostic · Interview" />
      <div
        style={{
          width: "100%",
          display: "flex",
          minHeight: "70vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{}}>
            <h5 style={{ fontFamily: "JetBrains mono", fontWeight: "600" }}>
              Question:{" "}
              <Typewritertext
                readOnly
                text="I need a senior engineer to explain why my screen flips completely upside down and plays a deafening dial-up tone whenever I receive a call while connected to my car's Bluetooth. It happens every single time without fail, turning a simple hands-free call into a full-blown jump scare, and two factory resets haven't touched it. Please just process an RMA before this cursed edge-case bug causes me to pull a muscle on my morning commute."
              />
            </h5>
          </div>
          <div>
            <Aimic />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
