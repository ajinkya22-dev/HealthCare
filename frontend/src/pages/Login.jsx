import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

// If image is inside /public folder, no need to import.
// If it's inside src/assets, import it:
// import bgImage from "../assets/69596c0b-65b7-4804-8bf7-3dbf28948268.jpg";

export default function Login() {
  const [activeTab, setActiveTab] = useState("patient");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
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
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50">
      {/* Left: Doctor Image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-white h-full">
        <img
                          src="/src/assets/images/login.png"
          alt="Doctor Placeholder"
          className="object-fill w-full h-full max-h-[600px] rounded-l-2xl shadow-lg "
          style={{ minHeight: '400px', minWidth: '300px' }}
        />
      </div>
      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full h-3xl max-w-2xl z-50">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back!</h2>
          {error && (
            <div className="mb-4 text-center text-red-600 font-semibold bg-red-100 border border-red-300 rounded p-2">
              {error}
            </div>
          )}
          <div className="flex justify-center mb-8 gap-2">
            <button
              onClick={() => setActiveTab("patient")}
              className={`px-6 py-2 cursor-pointer rounded-l-lg font-semibold shadow-sm transition-all duration-200 ${activeTab === "patient" ? "bg-gray-100 text-teal-600 shadow" : "bg-white text-gray-500 border"}`}
            >
              Login as <span className="text-teal-600">Patient</span>
            </button>
            <button
              onClick={() => setActiveTab("doctor")}
              className={`px-6 py-2 cursor-pointer rounded-r-lg font-semibold shadow-sm transition-all duration-200 ${activeTab === "doctor" ? "bg-teal-500 text-white shadow" : "bg-white text-gray-500 border"}`}
            >
              Login as Doctor
            </button>
          </div>
          <form onSubmit={handlesubmit} className="space-y-5">
            <div>
              <input
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="text"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
              />
            </div>
            <div>
              <input
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
              />
            </div>
            <div className="flex items-center text-sm cursor-pointer">
              <input required type="checkbox" className="mr-2" />
              Remember me
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:from-teal-500 hover:to-blue-600 transition disabled:bg-gray-400"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm mt-6">
            Don't have an account?{' '}
            <a href="/register" className="text-teal-600 hover:underline font-semibold">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
