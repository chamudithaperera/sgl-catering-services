import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { FloatingContact } from "./components/FloatingContact";
import { servicePageContent } from "./data/servicePageContent";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { ServiceShowcasePage } from "./pages/ServiceShowcasePage";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catering" element={<ServiceShowcasePage page={servicePageContent.catering} />} />
        <Route path="/renting" element={<ServiceShowcasePage page={servicePageContent.renting} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdminRoute ? <FloatingContact /> : null}
    </>
  );
}

export default App;
