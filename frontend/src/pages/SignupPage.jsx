import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../services/auth.service";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Save token + user
      localStorage.setItem("authToken", res.token);
      localStorage.setItem("userName", res.user.name);

      // 👉 Redirect to Capture Page
      navigate("/capture");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to sign up. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-1 text-slate-800">
          Create an account
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Sign up to start using the digital photobooth.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-slate-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/70"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/70"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/70"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-slate-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/70"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-slate-50 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-slate-900 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;
