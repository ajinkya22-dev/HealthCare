const express = require('express');
const router = express.Router();
const { register, login } = require('../Controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post("/upload-image", (req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }
    const imageUrl= `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
});

module.exports = router;
