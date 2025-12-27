import express from "express";
import { registerUser, loginUser, checkAuth, logoutUser } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth", authUser, checkAuth);
router.get("/logout", authUser, logoutUser);
export default router;
