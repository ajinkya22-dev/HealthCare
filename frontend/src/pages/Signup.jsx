// Register.jsx
import { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

export default function Register() {
  const [userType, setUserType] = useState("patient");
  const profileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleProfileClick = () => {
    profileInputRef.current.click();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        profileImage: profileImage || "", // (handle actual upload separately)
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

      // Store user data
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect based on role
      if (response.data.role === "doctor") {
        navigate("/doctorDashboard");
      } else {
        navigate("/patientDashboard");
      }

    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setUserType("patient")}
            className={`px-4 py-2 rounded-l-md border cursor-pointer ${
              userType === "patient"
                ? "bg-white text-black font-medium"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setUserType("doctor")}
            className={`px-4 py-2 rounded-r-md border cursor-pointer ${
              userType === "doctor"
                ? "bg-white text-black font-medium"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Doctor
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">
          {userType === "doctor" ? "Doctor" : "Patient"} Registration
        </h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required value={fullname} onChange={(e)=>{
            setfullname(e.target.value);
            
          }} type="text" placeholder="Full Name" className="input border-gray-600 border-2 rounded-[5px] p-2" />
          <input required value={email} onChange={(e)=>{
            setemail(e.target.value);
          }} type="email" placeholder="Email" className="input border-gray-600 border-2 rounded-[5px] p-2" />
          <input required value={password} onChange={(e)=>{
            setpassword(e.target.value);

          }} type="password" placeholder="Password" className="input border-gray-600 border-2 rounded-[5px] p-2" />
          <input value={phone} onChange={(e)=>{
            setphone(e.target.value);
          }} type="text" placeholder="Phone Number" className="input border-gray-600 border-2 rounded-[5px] p-2" />
          <select 
            required 
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input border-gray-600 border-2 rounded-[5px] p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea value={address} onChange={(e)=>{
            setaddress(e.target.value);
          }} placeholder="Address" className="input border-gray-600 border-2 rounded-[5px] p-2 md:col-span-2 h-20" />

          {/* Profile Picture Upload with Icon */}
          <div className="md:col-span-2 flex items-center gap-4">
            <div
              onClick={handleProfileClick}
              className="w-16 h-16 border rounded-full flex items-center justify-center cursor-pointer bg-gray-100 relative overflow-hidden"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaCamera className="text-gray-500 text-lg" />
              )}
              <input
                type="file"
                ref={profileInputRef}
                className="hidden "
                accept="image/*"
                onChange={handleProfileChange}
              />
            </div>
            <span className="text-sm text-gray-600 border-gray-600 border-2 rounded-[5px] p-2">Click icon to upload profile picture</span>
          </div>

          {/* Doctor Specific Fields */}
          {userType === "doctor" && (
            <>
              <select 
                required 
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="input border-gray-600 border-2 rounded-[5px] p-2"
              >
                <option value="">Select Specialization</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dentist">Dentist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="General Physician">General Physician</option>
              </select>
              <input required value={experience} onChange={(e)=>{
                setexperience(e.target.value);
              }} type="number" placeholder="Experience (years)" className="input border-gray-600 border-2 rounded-[5px] p-2" />
              <input required value={qualification} onChange={(e)=>{
                setqualification(e.target.value);
              }} type="text" placeholder="Qualification" className="input border-gray-600 border-2 rounded-[5px] p-2" />
              <input required value={licenseno} onChange={(e)=>{
                setlicenseno(e.target.value);
              }} type="text" placeholder="Medical License Number" className="input border-gray-600 border-2 rounded-[5px] p-2" />
              <input required value={hospitalname} onChange={(e)=>{
                sethospitalname(e.target.value);
              }} type="text" placeholder="Clinic/Hospital Name" className="input border-gray-600 border-2 rounded-[5px] p-2" />
              
              <input required value={fee} onChange={(e)=>{
                setfee(e.target.value);
              }}
                type="number"
                placeholder="Consultation Fee (₹)"
                className="input border-gray-600 border-2 rounded-[5px] p-2"
              />
            </>
          )}

          {/* Terms and Conditions */}
          <div className="md:col-span-2 flex items-start gap-2">
            <input required type="checkbox" className="mt-1" />
            <p className="text-sm">
              I agree to the <span className="text-green-600 underline">terms and conditions</span>.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Registering..." : `Register as ${userType === "doctor" ? "Doctor" : "Patient"}`}
          </button>
        </form>
      </div>
    </div>
  );
}
