import AppShell from "../components/AppShell";
import SectionHeader from "../components/Sectionheader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TradesDirectory from "../components/Tradesdirectory";
export default function Candidates() {
  const baseUrl =
    import.meta.env.VITE_BASE_URL || "https://verivo.onrender.com";
  const [professionals, setProfessionals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Candidates | Iṣẹ́";
    // Fetch candidates from the backend API
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/employer/candidates/fetch`,
        );
        setProfessionals(response.data.data);
        console.log("stuff", professionals);
        console.log("Candidates response:", response.data.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const professional = [
    {
      id: "pro_1",
      name: "Bisi Okonkwo",
      trade: "Tailoring",
      tradeId: "tailoring",
      roleLabel: "Tailor",
      specialty: "chiffon & silk",
      location: "Tejuosho, Yaba",
      jobsCount: 142,
      repeatPercent: 72,
      bio: "Eight years finishing for two Lekki ateliers before going independent. Self-taught French seams —  clean, no fraying, no shortcuts.",
      tags: ["French seam", "Bias cut", "Beadwork"],
      pricePerHour: 3400,
      iseScore: 88,
      verified: true,
      imageUrl: "https://picsum.photos/seed/bisi-okonkwo/500/500",
    },
    {
      id: "pro_2",
      name: "Kabir Mohammed",
      trade: "Generator repair",
      tradeId: "generator_repair",
      roleLabel: "Generator mechanic",
      specialty: "",
      location: "Sabon Gari, Kano",
      jobsCount: 67,
      repeatPercent: 61,
      bio: "Family workshop in Sabon Gari since '08. Stator rewinds the local market does not trust to anyone else in the area.",
      tags: ["Tiger / Lutian 4kVA", "Carburettor", "Stator rewind"],
      pricePerHour: 3400,
      iseScore: 84,
      verified: true,
      imageUrl: "https://picsum.photos/seed/kabir-mohammed/500/500",
    },
    {
      id: "pro_3",
      name: "Amaka Eze",
      trade: "Tailoring",
      tradeId: "tailoring",
      roleLabel: "Tailor",
      specialty: "bridal",
      location: "Aba, Abia",
      jobsCount: 88,
      repeatPercent: 69,
      bio: "Six bridal commissions a month. Trained at the Ariaria fashion cluster. Bead placement is her signature finish.",
      tags: ["Bridal", "Stoning", "Aso-oke"],
      pricePerHour: 3800,
      iseScore: 81,
      verified: true,
      imageUrl: "https://picsum.photos/seed/amaka-eze/500/500",
    },
    {
      id: "pro_4",
      name: "Emeka Obi",
      trade: "Phone repair",
      tradeId: "phone_repair",
      roleLabel: "Phone technician",
      specialty: "screens & boards",
      location: "Computer Village, Ikeja",
      jobsCount: 210,
      repeatPercent: 78,
      bio: "Board-level repair — micro-soldering, charging port swaps, water damage recovery. Ten minutes from Computer Village market.",
      tags: ["Micro-soldering", "Screen replacement", "Board repair"],
      pricePerHour: 2900,
      iseScore: 91,
      verified: true,
      imageUrl: "https://picsum.photos/seed/emeka-obi/500/500",
    },
    {
      id: "pro_5",
      name: "Segun Adeyemi",
      trade: "Auto mechanic",
      tradeId: "auto_mechanic",
      roleLabel: "Mechanic",
      specialty: "Toyota & Lexus",
      location: "Berger, Lagos",
      jobsCount: 134,
      repeatPercent: 65,
      bio: "Fifteen years on Toyota and Lexus engines. Runs diagnostics before quoting, not after — no surprise costs.",
      tags: ["Engine diagnostics", "Suspension", "AC repair"],
      pricePerHour: 4200,
      iseScore: 86,
      verified: false,
      imageUrl: "https://picsum.photos/seed/segun-adeyemi/500/500",
    },
    {
      id: "pro_6",
      name: "Halima Yusuf",
      trade: "Electrician",
      tradeId: "electrician",
      roleLabel: "Electrician",
      specialty: "residential wiring",
      location: "Wuse, Abuja",
      jobsCount: 96,
      repeatPercent: 74,
      bio: "Licensed residential electrician. Rewires older buildings to modern code without tearing up every wall.",
      tags: ["Rewiring", "Inverter install", "Fault finding"],
      pricePerHour: 3600,
      iseScore: 83,
      verified: true,
      // imageUrl: "https://aicsum.photos/seed/halima-yusuf/500/500",
    },
  ];

  return (
    <AppShell>
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <SectionHeader
              eyebrow="Candidates · 6 verified"
              leadText="The pool, ranked by"
              emphasisText="Iṣẹ́ Score."
              description="Filter by trade and location. Tap a card to replay their diagnostic interview before you reach out."
            />
          </div>
          <div>
            <TradesDirectory
              professionals={professionals}
              onSelectProfessional={(id) =>
                navigate(`/employer/candidates/${id}`)
              }
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
