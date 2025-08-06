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
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      if (userData.role === "doctor") {
        navigate("/doctorDashboard");
      } else if (userData.role === "patient") {
        navigate("/patientDashboard");
      } else {
        alert("Unknown role");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
    
    >
      <div className="bg-[#FFFFF0] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your TrustBasket account
        </p>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("patient")}
            className={`px-4 py-2 rounded-l-md border cursor-pointer ${
              activeTab === "patient"
                ? "bg-white text-black font-medium"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Login as Patient
          </button>
          <button
            onClick={() => setActiveTab("doctor")}
            className={`px-4 py-2 rounded-r-md border cursor-pointer ${
              activeTab === "doctor"
                ? "bg-white text-black font-medium"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Login as Doctor
          </button>
        </div>

        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="text"
              placeholder="Enter email or mobile number"
              className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input required type="checkbox" className="mr-2" />
              Remember me
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
