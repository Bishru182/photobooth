import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CapturePage from "./pages/CapturePage";
import PreviewPage from "./pages/PreviewPage"; 

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/capture" element={<CapturePage />} />
        <Route path="/preview" element={<PreviewPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
