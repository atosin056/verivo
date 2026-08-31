import AppShell from "../components/AppShell";
import { useUserData } from "../UserDataContext.js";
import useBreakpoint from "../hooks/useBreakpoint";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/Sectionheader.jsx";
import { JobInputCard } from "../components/Jobinputcard.jsx";
import { useState } from "react";
import TopMatches from "../components/Topmatches.jsx";
import axios from "axios";
import FormField from "../components/FormField.jsx";
import Primaryactionbtn from "../components/Primaryactionbtn.jsx";

export default function Postjob() {
  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Abuja (FCT)",
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [budget, setBudget] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const [showPostJob, setPostJob] = useState(false);

  const userData = useUserData();
  const [formInput, setFormInput] = useState("");
  const { isTablet, isMobile } = useBreakpoint();
  const [isParsing, setIsParsing] = useState(false);
  const navigate = useNavigate();
  const employerId = userData.employer.id;

  const finalDesc = description.trim() ? description : formInput;

  const formData = {
    title,
    location,
    budget,
    state,
    deadline,
    description: finalDesc,
    employerId,
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  async function handleParse(text) {
    setIsParsing(true);
    const payload = { data: text };
    try {
      const data = await axios.post(
        `${baseUrl}/api/employer/jobs/parse`,
        payload,
      );
      if (data.data.success === true) {
        setFormInput(data.data.message);
        setPostJob(true);
        // if the parse also returns structured fields, prefill them:
        // if (data.data.title) setTitle(data.data.title);
        // if (data.data.location) setLocation(data.data.location);
        // etc.
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsParsing(false);
    }
  }

  function clearError(field) {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!title?.trim()) newErrors.title = "This field is required";
    if (!location?.trim()) newErrors.location = "This field is required";
    if (!budget) newErrors.budget = "This field is required";
    if (!state) newErrors.state = "This field is required";
    if (!deadline) newErrors.deadline = "This field is required";
    if (!finalDesc?.trim()) newErrors.description = "This field is required"; // was `description`
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;

    setIsSubmitting(true);
    console.log(formData);

    try {
      const res = await axios.post(
        `${baseUrl}/api/employer/jobs/post`,
        formData,
      );
      console.log(res.data);
      // navigate(`/jobs/${res.data.jobId}`)
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsSubmitting(false);
      setPostJob(false);
      setCreated(true);
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
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <JobInputCard
                  value={formInput}
                  onChange={(e) => setFormInput(e.target.value)}
                  suggestions={[
                    "Phone repair · Ikeja · today",
                    "Generator service · Sabon Gari",
                  ]}
                  parsing={isParsing}
                  onParse={(text) => handleParse(text)}
                />
              </div>
              {showPostJob ? (
                <div>
                  <div
                    style={{
                      border: "1px solid rgb(214, 205, 184)",
                      background: "white",
                      borderRadius: 20,
                      padding: "10px 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "Fraunces",
                          letterSpacing: "-0.025em",
                          fontWeight: 500,
                          margin: 0,
                          marginTop: 10,
                        }}
                      >
                        Post a Job
                      </h3>
                      <p
                        style={{
                          fontFamily: "Instrument Sans",
                          fontSize: 12,
                          margin: 0,
                          color: "#6b6055",
                          lineHeight: "30.12px",
                        }}
                      >
                        Describe your task and connect with a trusted
                        professional.
                      </p>
                    </div>
                    <div>
                      <div>
                        <div>
                          <FormField
                            label="Job Title"
                            required
                            value={title}
                            placeholder="e.g. Repair faulty phone charging port"
                            error={errors.title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                              clearError("title");
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10,
                          }}
                        >
                          <FormField
                            label="Location"
                            placeholder="38, Olasumbo street, Ikeja"
                            required
                            value={location}
                            error={errors.location}
                            onChange={(e) => {
                              setLocation(e.target.value);
                              clearError("location");
                            }}
                          />

                          <FormField
                            type="currency"
                            label="Budget"
                            value={budget}
                            placeholder="20000"
                            required
                            error={errors.budget}
                            onChange={(e) => {
                              setBudget(e.target.value);
                              clearError("budget");
                            }}
                          />
                        </div>
                        <div>
                          <FormField
                            label="Description"
                            value={description || formInput}
                            required
                            error={errors.description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                              clearError("description");
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10,
                          }}
                        >
                          <FormField
                            type="state"
                            label="State"
                            required
                            placeholder="Select a state"
                            options={nigerianStates}
                            value={state}
                            error={errors.state}
                            onChange={(e) => {
                              setState(e.target.value);
                              clearError("state");
                            }}
                          />
                          <FormField
                            type="date"
                            label="Close Date"
                            value={deadline}
                            required
                            error={errors.deadline}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                              setDeadline(e.target.value);
                              clearError("deadline");
                            }}
                          />
                        </div>
                        <div>
                          <Primaryactionbtn
                            type="button"
                            onClick={handleSubmit}
                            loading={isSubmitting}
                          >
                            Post Job
                          </Primaryactionbtn>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
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
