import express from "express";
import authUser from "../middlewares/authUser.js";
import { updateCardData } from "../controllers/cardController.js";

const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCardData)

export default cartRouter;