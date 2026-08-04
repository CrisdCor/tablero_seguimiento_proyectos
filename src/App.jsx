import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import TeamPage from "./pages/TeamPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/equipo" element={<TeamPage />} />
      </Route>
    </Routes>
  );
}
