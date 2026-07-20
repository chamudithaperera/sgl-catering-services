import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { FloatingContact } from "./components/FloatingContact";
import { HomePage } from "./pages/HomePage";

const AdminPage = lazy(() => import("./pages/AdminPage"));
const CateringPage = lazy(() => import("./pages/CateringPage"));
const RentingPage = lazy(() => import("./pages/RentingPage"));

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
        <Route
          path="/catering"
          element={
            <Suspense fallback={null}>
              <CateringPage />
            </Suspense>
          }
        />
        <Route
          path="/renting"
          element={
            <Suspense fallback={null}>
              <RentingPage />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={null}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdminRoute ? <FloatingContact /> : null}
    </>
  );
}

export default App;
