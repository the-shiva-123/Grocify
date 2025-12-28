import express from "express";
const sellerRouter = express.Router();
import { sellerLogin, sellerAuth, sellerLogout } from "../controllers/sellerController.js";
import authSeller  from "../middlewares/authSeller.js";

sellerRouter.post("/seller/login", sellerLogin);
sellerRouter.get("/seller/auth", authSeller, sellerAuth);
sellerRouter.post("/seller/logout", authSeller, sellerLogout);

export default sellerRouter;
