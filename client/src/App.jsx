import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { FloatingContact } from "./components/FloatingContact";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { ServiceShowcasePage } from "./pages/ServiceShowcasePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/catering"
          element={
            <ServiceShowcasePage
              title="ආහාර පාන සැපයීම"
              eyebrow="Signature Catering"
              image="/assets/sgl-images/hero-buffet.jpg"
              description="විවාහ උත්සව, දාන පිංකම්, ආයතනික හමුවීම් සහ පවුල් සැමරුම් සඳහා රසය, පිළිවෙළ සහ වෘත්තීයභාවය එක් කරන ආහාර හා පාන සැපයුම් අත්දැකීමක් අපි ඔබ වෙනුවෙන් සකස් කරමු."
            />
          }
        />
        <Route
          path="/renting"
          element={
            <ServiceShowcasePage
              title="උත්සව භාණ්ඩ සැපයීම"
              eyebrow="Event Rentals"
              image="/assets/sgl-images/indoor-buffet.jpg"
              description="බෆේ උපකරණ, සේවනාංග, මේස සැකසුම් සහ උත්සව අවශ්‍ය භාණ්ඩ විශ්වාසයෙන් සැපයීම හරහා ඔබේ උත්සව සැලසුම වඩාත් සම්පූර්ණ සහ පිළිවෙළට ක්‍රියාත්මක කිරීමට අපි සහාය වෙමු."
            />
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingContact />
    </>
  );
}

export default App;
