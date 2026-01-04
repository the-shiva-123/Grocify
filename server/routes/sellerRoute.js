import express from "express";
const sellerRouter = express.Router();
import { sellerLogin, sellerAuth, sellerLogout } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";

sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/auth", authSeller, sellerAuth);
sellerRouter.post("/logout", authSeller, sellerLogout);

export default sellerRouter;
