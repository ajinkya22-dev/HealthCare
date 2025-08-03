const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const generateToken = require('../utils/generateToken');
// registration
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, specialization} = req.body;

        const userExists = await User.findOne({ email });
        // check user exists
        if (userExists) return res.status(400).json({ message: "User already exists" });

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

       // creating the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role });

        if (role === 'doctor') {
            await Doctor.create({ userId: user._id, specialization });
        } else if (role === 'patient') {
            await Patient.create({ userId: user._id });
        }

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" , error: error.message });
    }
};
