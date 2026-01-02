import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Login Seller : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" })
            res.cookie("sellerToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.json({ success: true, message: "Seller logged in successfully" })
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//Seller Authentication : /api/seller/auth
export const sellerAuth = async (req, res) => {
    try {
        return res.json({ success: true, message: "Seller authenticated successfully", user: { email: process.env.SELLER_EMAIL } })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//Logout Seller : /api/seller/logout
export const sellerLogout = async (res, req) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({ success: true, message: "seller logged out successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}