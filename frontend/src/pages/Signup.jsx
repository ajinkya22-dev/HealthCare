import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import DoctorInstrumentsBackground from "./components/ui/doctorInstrumentsBackground.jsx";

export default function Register() {
  const [userType, setUserType] = useState("patient");
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [experience, setexperience] = useState("");
  const [qualification, setqualification] = useState("");
  const [address, setaddress] = useState("");
  const [licenseno, setlicenseno] = useState("");
  const [hospitalname, sethospitalname] = useState("");
  const [email, setemail] = useState("");
  const [fee, setfee] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!fullname.trim()) newErrors.fullname = true;
    if (!email.trim()) newErrors.email = true;
    if (!password.trim()) newErrors.password = true;
    if (!gender) newErrors.gender = true;
    if (!agree) newErrors.agree = true;

    if (userType === "doctor") {
      if (!specialization) newErrors.specialization = true;
      if (!experience) newErrors.experience = true;
      if (!qualification.trim()) newErrors.qualification = true;
      if (!licenseno.trim()) newErrors.licenseno = true;
      if (!hospitalname.trim()) newErrors.hospitalname = true;
      if (!fee) newErrors.fee = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = {
        name: fullname,
        email,
        password,
        phoneNo: phone,
        gender,
        address,
        role: userType,
      };

      if (userType === "doctor") {
        userData.specialization = specialization;
        userData.qualification = qualification;
        userData.experience = parseInt(experience);
        userData.licenceNo = licenseno;
        userData.hospitalName = hospitalname;
        userData.fees = parseInt(fee);
      }

      const response = await authAPI.register(userData);
      localStorage.setItem("user", JSON.stringify(response.data));

      if (response.data.role === "doctor") {
        navigate("/doctorDashboard");
      } else {
        navigate("/patientDashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const baseInputClasses =
      "border rounded-lg p-3 focus:outline-none w-full " +
      "bg-white/10 text-white placeholder-white/70";

  return (
      <DoctorInstrumentsBackground>
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-800/70 rounded-2xl shadow-2xl flex flex-col items-center overflow-y-auto max-h-[90vh] border border-white/20">
          <div className="flex justify-center mb-6 gap-2 w-full">
            <button
                onClick={() => setUserType("patient")}
                type="button"
                className={`px-6 py-2 cursor-pointer rounded-l-lg font-semibold shadow-sm transition-all duration-200 ${
                    userType === "patient"
                        ? "bg-white/30 text-teal-200 shadow"
                        : "bg-transparent text-gray-200 border border-white/40"
                }`}
            >
              Patient
            </button>
            <button
                onClick={() => setUserType("doctor")}
                type="button"
                className={`px-6 py-2 cursor-pointer rounded-r-lg font-semibold shadow-sm transition-all duration-200 ${
                    userType === "doctor"
                        ? "bg-teal-500/60 text-white shadow"
                        : "bg-transparent text-gray-200 border border-white/40"
                }`}
            >
              Doctor
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-center text-white w-full">
            MediConnect
          </h2>
          <h3 className="text-lg font-semibold mb-6 text-center text-white w-full">
            Create account
          </h3>

          <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
              noValidate
          >
            <input
                value={fullname}
                onChange={(e) => setfullname(e.target.value)}
                type="text"
                placeholder="Full Name"
                className={`${baseInputClasses} ${
                    errors.fullname ? "border-red-500" : "border-white/40"
                }`}
            />
            <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="Email"
                className={`${baseInputClasses} ${
                    errors.email ? "border-red-500" : "border-white/40"
                }`}
            />
            <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="Password"
                className={`${baseInputClasses} ${
                    errors.password ? "border-red-500" : "border-white/40"
                }`}
            />
            <input
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                type="text"
                placeholder="Phone Number"
                className={`${baseInputClasses} border-white/40`}
            />
            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`${baseInputClasses} ${
                    errors.gender ? "border-red-500" : "border-white/40"
                }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <textarea
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Address"
                className={`${baseInputClasses} border-white/40 md:col-span-2 h-20`}
            />
            {userType === "doctor" && (
                <>
                  <select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className={`${baseInputClasses} ${
                          errors.specialization ? "border-red-500" : "border-white/40"
                      }`}
                  >
                    <option value="">Select Specialization</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="General Physician">General Physician</option>
                  </select>
                  <input
                      value={experience}
                      onChange={(e) => setexperience(e.target.value)}
                      type="number"
                      placeholder="Experience (years)"
                      className={`${baseInputClasses} ${
                          errors.experience ? "border-red-500" : "border-white/40"
                      }`}
                  />
                  <input
                      value={qualification}
                      onChange={(e) => setqualification(e.target.value)}
                      type="text"
                      placeholder="Qualification"
                      className={`${baseInputClasses} ${
                          errors.qualification ? "border-red-500" : "border-white/40"
                      }`}
                  />
                  <input
                      value={licenseno}
                      onChange={(e) => setlicenseno(e.target.value)}
                      type="text"
                      placeholder="Medical License Number"
                      className={`${baseInputClasses} ${
                          errors.licenseno ? "border-red-500" : "border-white/40"
                      }`}
                  />
                  <input
                      value={hospitalname}
                      onChange={(e) => sethospitalname(e.target.value)}
                      type="text"
                      placeholder="Clinic/Hospital Name"
                      className={`${baseInputClasses} ${
                          errors.hospitalname ? "border-red-500" : "border-white/40"
                      }`}
                  />
                  <input
                      value={fee}
                      onChange={(e) => setfee(e.target.value)}
                      type="number"
                      placeholder="Consultation Fee (₹)"
                      className={`${baseInputClasses} ${
                          errors.fee ? "border-red-500" : "border-white/40"
                      }`}
                  />
                </>
            )}
            <div className="md:col-span-2 flex items-start gap-2">
              <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1"
              />
              <p
                  className={`text-sm ${
                      errors.agree ? "text-red-400" : "text-white"
                  }`}
              >
                I agree to the{" "}
                <span className="text-teal-300 underline">
                terms and conditions
              </span>.
              </p>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 cursor-pointer bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:from-teal-500 hover:to-blue-600 disabled:bg-gray-400"
            >
              {loading
                  ? "Registering..."
                  : `Register as ${userType === "doctor" ? "Doctor" : "Patient"}`}
            </button>
          </form>
        </div>
      </DoctorInstrumentsBackground>
  );
}
