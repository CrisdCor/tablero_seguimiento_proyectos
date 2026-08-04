import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import TeamPage from "./pages/TeamPage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/equipo" element={<TeamPage />} />
        <Route path="/detalle" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}
