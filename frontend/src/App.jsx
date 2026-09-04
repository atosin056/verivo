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
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import ProtectedEmployerLayout from "./components/ProtectedEmployerLayout.jsx";
import EmployerDashboard from "./pages/EmployerDashboard.jsx";
import Postjob from "./pages/Postjob.jsx";
import Billing from "./pages/Billing.jsx";
import Employerjobs from "./pages/Employerjobs.jsx";
import Candidates from "./pages/Candidates.jsx";
import ViewUserProfile from "./pages/ViewUserProfile.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth" element={<Register />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/offers" element={<Offers />} />
        <Route path="/app/jobs" element={<Jobs />} />
        <Route path="/app/wallet" element={<Wallet />} />
        <Route path="/app/profile" element={<Profile />} />
        <Route path="/app/disputes" element={<Disputes />} />
        <Route path="/app/diagnostic" element={<Diagnostic />} />
      </Route>
      <Route element={<ProtectedEmployerLayout />}>
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/employer/post-job" element={<Postjob />} />
        <Route path="/employer/billing" element={<Billing />} />
        <Route path="/employer/jobs" element={<Employerjobs />} />
        <Route path="/employer/candidates" element={<Candidates />} />
        <Route
          path="/employer/candidates/:userId"
          element={<ViewUserProfile />}
        />
      </Route>
      <Route path="/apply" element={<Apply />} />
    </Routes>
  );
}
