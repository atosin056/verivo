import express from "express";
import "dotenv/config";
import cors from "cors";

import { generateOtp, verifyOtp } from "./controllers/otp.js";
import verifyphone from "./controllers/verifyphone.js";
import createuser from "./controllers/createuser.js";
import updateJobStateController from "./controllers/updateJobState.js";

import {
  uploadtopinecone,
  generateQa,
  calculateIseScore,
  transcribe,
} from "./controllers/diagnostic.js";
import { createemployer } from "./controllers/createemployer.js";
import requireAuth from "./middleware/auth.js";
import { getMe } from "./controllers/fetchuser.js";
import { fetchEmployer } from "./controllers/fetchemployer.js";
import topupemployer from "./controllers/employertopup.js";
import {
  parsejob,
  postjob,
  fetchJobs,
  fetchcandidates,
  fetchcandidatesdata,
  assignJob,
} from "./controllers/employerjob.js";
import fetchoffers from "./controllers/fetchoffers.js";
import updateOfferStatus from "./controllers/updateOffers.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "20mb" }));
app.use(cors());

app.post("/otp/generate", generateOtp);
app.post("/otp/verify", verifyOtp);
app.post("/api/verifyuser", verifyphone);
app.post("/api/createuser", createuser);
app.post("/api/uploadchunks", uploadtopinecone);
app.post("/api/generateqa", generateQa);
app.post("/api/calculatescore", calculateIseScore);
app.post("/api/transcribe", transcribe);
app.get("/api/me", requireAuth, getMe);
app.post("/api/createemployer", createemployer);
app.get("/api/employer/me", requireAuth, fetchEmployer);
app.post("/api/employer/topup", topupemployer);
app.post("/api/employer/jobs/parse", parsejob);
app.post("/api/employer/jobs/post", postjob);
app.get("/api/employer/jobs/fetch", fetchJobs);
app.get("/api/employer/candidates/fetch", fetchcandidates);
app.get("/api/employer/candidates/data", fetchcandidatesdata);
app.post("/api/employer/jobs/assign", assignJob);
app.post("/api/fetchoffers", fetchoffers);
app.patch("/api/offers/:id", updateOfferStatus);
app.patch("/api/employer/jobs/:id/state", updateJobStateController);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
