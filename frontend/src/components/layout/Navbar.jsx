import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo2.png";

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
    <div className="relative w-full">
      {/* Blue radial glow */}
      <div className="absolute left-1/2 top-1 -translate-x-1/2 -translate-y-1/2 w-300 h-8 rounded-full bg-[#008CFF] opacity-30 blur-2xl z-0" />
      {/* Glassy navbar */}
      <header className="relative z-10 w-full bg-white/5 border-b border-white/30 backdrop-blur-lg shadow-lg rounded-[10px]">
        <div className=" max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className=" flex justify-center mt-1 ml-7">
            <img
              src={logo}
              alt="party photobooth logo"
              className="h-10 opacity-100"
            />
          </div>
          <div className="  flex items-center gap-2 ml-28">
            {/* <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
              PB
            </div> */}
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold text-slate-400">
                Digital Photobooth
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/capture")}
              className={`text-xs sm:text-sm px-3 py-1.5 text-white${
                isCapturePage
                  ? "bg-slate-100 text-white border-slate-100"
                  : " border-slate-300 hover:border-b text-slate-100"
              } transition`}
            >
              Capture
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className={`text-xs sm:text-sm px-3 py-1.5 text-white ${
                isAdminPage
                  ? "bg-slate-900 text-white border-slate-900"
                  : "text-slate-600 border-slate-300 hover:border-b"
              } transition`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs sm:text-sm text-slate-600 border bg-slate-100 rounded-full px-3 py-1.5 hover:bg-slate-700 hover:text-white hover:border-slate-900 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
