import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TOKEN_KEY = "authToken";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const isAdminPage = location.pathname === "/admin";
  const isCapturePage = location.pathname === "/capture";

  return (
    <header className="w-full bg-white/90 border-b border-slate-200 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
            PB
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-800">
              Party Photobooth
            </span>
            <span className="text-[11px] text-slate-500">
              Capture • Frame • Share
            </span>
          </div>
        </div>


        <div className="flex items-center gap-3">

          
        <button
          type="button"
          onClick={() => navigate("/capture")}
          className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border ${
            isCapturePage
              ? "bg-slate-900 text-white border-slate-900"
              : "text-slate-600 border-slate-300 hover:bg-slate-100"
          } transition`}
        >
          Capture
        </button>
        
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border ${
              isAdminPage
                ? "bg-slate-900 text-white border-slate-900"
                : "text-slate-600 border-slate-300 hover:bg-slate-100"
            } transition`}
          >
            Admin
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="text-xs sm:text-sm text-slate-600 border border-slate-300 rounded-full px-3 py-1.5 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
