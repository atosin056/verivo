import express from "express";
import "dotenv/config";
import cors from "cors";

import { generateOtp, verifyOtp } from "./controllers/otp.js";
import verifyphone from "./controllers/verifyphone.js";
import createuser from "./controllers/createuser.js";
import { uploadtopinecone, generateQa } from "./controllers/diagnostic.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.post("/otp/generate", generateOtp);
app.post("/otp/verify", verifyOtp);
app.post("/api/verifyuser", verifyphone);
app.post("/api/createuser", createuser);
app.post("/api/uploadchunks", uploadtopinecone);
app.post("/api/generateqa", generateQa);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
