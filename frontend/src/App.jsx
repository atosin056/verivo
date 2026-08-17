import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Offers from "./pages/Offers";
import Jobs from "./pages/Jobs";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Disputes from "./pages/Disputes";
import "./App.css";
import Diagnostic from "./pages/Diagnostic";
import Apply from "./pages/Apply";
import { Apple } from "lucide-react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth" element={<Register />} />
      <Route path="/app" element={<Dashboard />} />
      <Route path="/app/offers" element={<Offers />} />
      <Route path="/app/jobs" element={<Jobs />} />
      <Route path="/app/wallet" element={<Wallet />} />
      <Route path="/app/profile" element={<Profile />} />
      <Route path="/app/disputes" element={<Disputes />} />
      <Route path="/app/diagnostic" element={<Diagnostic />} />
      <Route path="/apply" element={<Apply />} />
    </Routes>
  );
}
