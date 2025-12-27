import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true, //Prevent JavaScript to access cookies
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
            maxAge: 24 * 60 * 60 * 1000 //1 day
        });
        return res.json({ success: true, newUser: { email: newUser.email, name: newUser.name } })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Login user :api/user/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true, //Prevent JavaScript to access cookies
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
            maxAge: 24 * 60 * 60 * 1000 //1 day
        });
        return res.json({ success: true, user: { email: user.email, name: user.name } })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//chech Auth : /api/user/auth
export const checkAuth = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        return res.json({ success: true, user: { email: user.email, name: user.name } })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Logout user : /api/user/logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
