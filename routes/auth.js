const express = require("express");
const User = require("../models/user");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.use(express.json());

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  //lets check whetrer the user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bycript.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async(req,res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid= await bycript.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  return res.status(200).json({ token, userId: user._id, role: user.role, message: "Logged in successfully" });
});

module.exports = router;
