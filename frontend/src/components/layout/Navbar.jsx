import React from "react";
import { useNavigate } from "react-router-dom";

const TOKEN_KEY = "authToken";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth-related data
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("userName"); // if you're storing it

    navigate("/login");
  };

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

        <button
          type="button"
          onClick={handleLogout}
          className="text-xs sm:text-sm text-slate-600 border border-slate-300 rounded-full px-3 py-1.5 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
