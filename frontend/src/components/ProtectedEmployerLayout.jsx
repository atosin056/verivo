// ProtectedEmployerLayout.jsx
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import { UserDataContext } from "../UserDataContext.js";
import api from "../api.js";

export default function ProtectedEmployerLayout() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
      return;
    }
    let cancelled = false;
    async function getUserData() {
      try {
        const response = await api.get("/api/employer/me"); // <- swap to your real endpoint
        const employer = response.data.employer;
        if (!cancelled && employer) {
          setUserData({
            accountType: "employer",
            user: {
              ...employer,
              name: employer.fullName,
              role: "Employer",
            },
            employer,
            iseScore: null,
          });
        }
      } catch (err) {
        console.log(err.message);
        if (!cancelled) navigate("/auth/login");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    getUserData();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (loading) return <Spinner />;
  if (!userData) return null;

  return (
    <UserDataContext.Provider value={userData}>
      <Outlet />
    </UserDataContext.Provider>
  );
}
