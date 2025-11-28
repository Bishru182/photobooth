import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 max-w-xl w-full">
        <h1 className="text-3xl font-semibold mb-3 text-slate-800">
          Party Photobooth
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          This will be your digital photobooth. Users can take 3 photos,
          place them in a custom frame, and receive the final image via
          email or QR code.
        </p>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-slate-900 text-slate-50 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
          <button
            className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm hover:bg-slate-100 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
