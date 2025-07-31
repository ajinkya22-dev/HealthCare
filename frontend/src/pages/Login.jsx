// Login.jsx
import { useState } from "react";

export default function Login() {
  const [activeTab, setActiveTab] = useState("patient");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = (e)=>{
            e.preventDefault();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
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
            <label className="block mb-1 text-sm font-medium">
              Email or Mobile Number
            </label>
            <input value={email} onChange={(e)=>{
                     setemail(e.target.value);   
            }}
              type="text"
              placeholder="Enter email or mobile number"
              className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input value={password} onChange={(e)=>{
                        setpassword(e.target.value);
              }}
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            
          </div>

          <button 
            type="submit"
            className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Sign In
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
