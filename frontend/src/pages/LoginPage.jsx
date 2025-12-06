import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/auth.service";
import logo from "../assets/logo/Untitled-1.png";
import Lottie from "lottie-react";
import bgAnim from "../assets/lottie/bg-login.json"; // <-- your file
import bgiAnim from "../assets/lottie/Let it snow.json";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("authToken", res.token);
      localStorage.setItem("userName", res.user.name);
      localStorage.setItem("userEmail", res.user.email);

      navigate("/capture");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-bishblue overflow-hidden flex items-center justify-center">
      {/* === LOTTIE BACKGROUND === */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Lottie
          animationData={bgiAnim}
          loop
          autoplay
          className="w-full h-full object-cover scale-[2]"
        />
      </div>

      {/* top blue glow */}
      <div
        className="
          pointer-events-none
          absolute -top-1/2 left-1/2
          -translate-x-1/2
          w-[500px] h-[400px]
          rounded-full
          bg-[#008CFF]
          opacity-90
          blur-[140px]
          z-0
        "
      />
      {/* softer wider glow */}
      <div
        className="
          pointer-events-none
          absolute -top-1/2 left-1/2
          -translate-x-1/2
          w-[1000px] h-[580px]
          rounded-full
          bg-[#008CFF]
          opacity-16
          blur-[100px]
          z-0
        "
      />

      <main className="relative z-20 w-full flex items-center justify-center px-4">
        {/* glassy login card */}
        <div className="w-full max-w-90 rounded-[10px] bg-white/5 border border-white/10 backdrop-blur-lg px-10 py-10 text-center text-white">
          <h2 className="text-sm tracking-[0.25em] mb-10">LOGIN</h2>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="username"
                className="
                  w-full
                  bg-transparent
                  border-b
                  border-white/30
                  pb-2
                  text-sm
                  text-white
                  text-center
                  placeholder:text-white/70
                  focus:outline-none
                  focus:border-white/80
                "
                required
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="
                  w-full
                  bg-transparent
                  border-b
                  border-white/30
                  pb-2
                  text-sm
                  text-white
                  text-center
                  placeholder:text-white/70
                  focus:outline-none
                  focus:border-white/80
                "
                required
              />
            </div>

            <button
              type="submit"
              className="
                mt-2
                inline-flex items-center justify-center
                px-8 py-2.5
                rounded-md
                border border-white/40
                text-xs font-medium tracking-[0.2em]
                uppercase
                bg-white/5
                hover:bg-white/10
                transition
              "
            >
              Login
            </button>
          </form>

          <p className="mt-10 text-[11px] text-white/70">
            no account?{" "}
            <Link
              to="/signup"
              className="underline underline-offset-4 text-white"
            >
              sign-up
            </Link>
          </p>

          <div className="flex justify-center mt-4">
            <img
              src={logo}
              alt="logo"
              className="h-30 opacity-80 hover:opacity-100 transition"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
