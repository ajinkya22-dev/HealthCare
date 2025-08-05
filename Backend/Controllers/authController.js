const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const generateToken = require('../utils/generateToken');

// Register Controller
exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phoneNo,
            gender,
            address,
            role,
            specialization,
            profileImage,
            qualification,
            experience,
            licenceNo,
            hospitalName,
            fees
        } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle profile image - if it's a blob URL, we'll store it as is for now
        // In a production environment, you'd want to convert blob URLs to actual files
        let finalProfileImage = profileImage || 'default.png';
        
        // If it's a blob URL, we can store it temporarily
        // For production, you should convert blob to file and upload
        if (profileImage && profileImage.startsWith('blob:')) {
            finalProfileImage = profileImage;
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: finalProfileImage,
            phoneNo,
            gender,
            address,
        });

        if (role === 'doctor') {
            await Doctor.create({
                userId: user._id,
                specialization,
                qualification,
                experience,
                licenceNo,
                hospitalName,
                fees
            });
        } else if (role === 'patient') {
            await Patient.create({ userId: user._id });
        }

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            profileImage: user.profileImage,
            phoneNo: user.phoneNo,
            gender: user.gender,
            address: user.address,
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: err.message });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No');

        if (!user)
            return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        console.log('Password match:', match ? 'Yes' : 'No');
        
        if (!match)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);
        console.log('Token generated successfully');

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
            profileImage: user.profileImage,
            phoneNo: user.phoneNo,
            gender: user.gender,
            address: user.address,
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
