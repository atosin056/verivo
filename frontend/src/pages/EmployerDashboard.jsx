// EmployerDashboard.jsx (and any other /employer/* page)
import AppShell from "../components/AppShell.jsx";
import { useUserData } from "../UserDataContext.js";

export default function EmployerDashboard() {
  const userData = useUserData();

  return <AppShell>{/* employer-specific page content here */}</AppShell>;
}
