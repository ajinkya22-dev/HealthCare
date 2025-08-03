export const dummyDoctors = [
  {
    id: "doc1",
    fullName: "Dr. Rohan Mehta",
    experience: 12,
    email: "rohan.mehta@healthcare.com",
    password: "hashedpassword123", // Will be hashed in real backend
    phone: "9876543210",
    gender: "Male",
    address: "Bandra West, Mumbai",
    profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
    qualification: "MBBS, MD (Cardiology)",
    licenseNo: "MH12345678",
    hospitalName: "Lilavati Hospital",
    role: "doctor",
    consultationFee: 800
  },
  {
    id: "doc2",
    fullName: "Dr. Anjali Sharma",
    experience: 8,
    email: "anjali.sharma@clinic.in",
    password: "securepass456",
    phone: "9812345678",
    gender: "Female",
    address: "Koregaon Park, Pune",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    qualification: "MBBS, MS (Gynaecology)",
    licenseNo: "PN98765432",
    hospitalName: "Ruby Hall Clinic",
    role: "doctor",
    consultationFee: 600
  }
];

export const dummyPatients = [
  {
    id: "pat1",
    fullName: "Aditya Thorat",
    email: "aditya.thorat@example.com",
    password: "mypassword123",
    phone: "9090909090",
    role: "patient",
    profilePicture: "https://randomuser.me/api/portraits/men/33.jpg",
    address: "Dhanakwadi, Pune",
    gender: "Male"
  },
  {
    id: "pat2",
    fullName: "Sneha Kulkarni",
    email: "sneha.kulkarni@example.com",
    password: "sneha12345",
    phone: "9876543211",
    role: "patient",
    profilePicture: "https://randomuser.me/api/portraits/women/36.jpg",
    address: "Kothrud, Pune",
    gender: "Female"
  }
];
