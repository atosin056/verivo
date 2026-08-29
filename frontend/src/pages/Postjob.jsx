import AppShell from "../components/AppShell";
import { useUserData } from "../UserDataContext.js";
import useBreakpoint from "../hooks/useBreakpoint";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/Sectionheader.jsx";
import { JobInputCard } from "../components/Jobinputcard.jsx";
import { useState } from "react";
import TopMatches from "../components/Topmatches.jsx";
import axios from "axios";

export default function Postjob() {
  const userData = useUserData();
  const [formInput, setFormInput] = useState("");
  const { isTablet, isMobile } = useBreakpoint();
  const [isParsing, setIsParsing] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  async function handleParse(text) {
    setIsParsing(true);
    const payload = { data: text };
    console.log(payload);
    try {
      const data = await axios.post(
        `${baseUrl}/api/employer/jobs/parse`,
        payload,
      );
      console.log(data);
      if (data.data.success === true) {
        setFormInput(data.data.message);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsParsing(false);
    }
  }

  //API RESPONSE SIMULATION..

  const jobCardsResponse = {
    query: { role: "seamstress", location: "Lagos" },
    generatedAt: "2026-08-28T09:12:00Z",
    matches: [
      {
        id: "wrk_1029",
        rank: 1,
        name: "Bisi Okonkwo",
        location: "Tejuosho, Yaba",
        avatarUrl: null,
        skills: ["French seam", "Bias cut"],
        trustScore: 88,
        rate: { amount: 1500, currency: "NGN", unit: "day" },
      },
      {
        id: "wrk_0741",
        rank: 2,
        name: "Amaka Eze",
        location: "Aba, Abia",
        avatarUrl: null,
        skills: ["Bridal", "Stoning"],
        trustScore: 81,
        rate: { amount: 1500, currency: "NGN", unit: "day" },
      },
    ],
  };
  return (
    <AppShell>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <SectionHeader
            eyebrow="Post a job · natural language"
            trailText="what you need."
            emphasisText="say"
            leadText="Just"
            description="Type or speak in plain English, Pidgin, Yorùbá, Igbo, or Hausa. Verivo parses the trade, specialty, location, deadline, and budget. You confirm. Then we match."
          />
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 20,
            }}
          >
            <div>
              <JobInputCard
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
                suggestions={[
                  "Phone repair · Ikeja · today",
                  "Generator service · Sabon Gari",
                ]}
                parsing={isParsing}
                onParse={(text) => {
                  handleParse(text);
                }}
              />
            </div>
            <div>
              <TopMatches matches={jobCardsResponse.matches} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
