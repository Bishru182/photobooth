import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CapturePage from "./pages/CapturePage";
import PreviewPage from "./pages/PreviewPage";
import AdminPage from "./pages/AdminPage";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Routes>
        {/* Public routes */}
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/capture" element={<CapturePage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
