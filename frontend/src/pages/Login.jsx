import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import DoctorInstrumentsBackground from "./components/ui/doctorInstrumentsBackground.jsx";

export default function Login() {
  const [activeTab, setActiveTab] = useState("patient");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true, remember: true });

    if (!email || !password || !remember) {
      return; // Don't submit if required fields are empty
    }

    setLoading(true);
    setError("");
    try {
      const response = await authAPI.login({ email, password });
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      if (userData.role === "doctor") {
        navigate("/doctorDashboard");
      } else if (userData.role === "patient") {
        navigate("/patientDashboard");
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <DoctorInstrumentsBackground>
        <div className="p-12 rounded-2xl shadow-2xl w-full max-w-3xl
                      bg-gray-800/40 backdrop-blur-lg border border-white/20
                      text-white">
          <h2 className="text-4xl font-bold text-center mb-8">Welcome Back!</h2>

          {error && (
              <div className="mb-4 text-center text-red-200 font-semibold
                          bg-red-500/30 border border-red-400 rounded p-2">
                {error}
              </div>
          )}

          <div className="flex justify-center mb-8 gap-2">
            <button
                onClick={() => setActiveTab("patient")}
                className={`px-8 py-3 rounded-l-lg font-semibold shadow-sm transition-all duration-200 ${
                    activeTab === "patient"
                        ? "bg-white/30 text-teal-200 shadow"
                        : "bg-transparent text-gray-200 border border-white/40"
                }`}
            >
              Patient
            </button>
            <button
                onClick={() => setActiveTab("doctor")}
                className={`px-8 py-3 rounded-r-lg font-semibold shadow-sm transition-all duration-200 ${
                    activeTab === "doctor"
                        ? "bg-teal-500/60 text-white shadow"
                        : "bg-transparent text-gray-200 border border-white/40"
                }`}
            >
              Doctor
            </button>
          </div>

          <form onSubmit={handlesubmit} className="space-y-6" noValidate>
            <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                type="text"
                placeholder="Email"
                className={`w-full border rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-teal-300
                       text-lg bg-transparent placeholder-white/70 text-white
                       ${
                    touched.email && !email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/40"
                }`}
            />

            <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                type="password"
                placeholder="Password"
                className={`w-full border rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-teal-300
                       text-lg bg-transparent placeholder-white/70 text-white
                       ${
                    touched.password && !password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/40"
                }`}
            />

            <div
                className={`flex items-center text-sm cursor-pointer ${
                    touched.remember && !remember ? "text-red-400" : "text-white"
                }`}
            >
              <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  onBlur={() => setTouched((prev) => ({ ...prev, remember: true }))}
                  className="mr-2"
              />
              Remember me
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-400 to-blue-500
                       text-white py-4 rounded-lg font-bold text-lg shadow-md
                       hover:from-teal-500 hover:to-blue-600 transition
                       disabled:bg-gray-400"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-white/90">
            Don't have an account?{" "}
            <a href="/register" className="text-teal-200 hover:underline font-semibold">
              Register here
            </a>
          </p>
        </div>
      </DoctorInstrumentsBackground>
  );
}
