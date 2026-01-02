import mongoose from "mongoose";
import authUser from "../middlewares/authUser";
import { updateCardData } from "../controllers/cardController";

const cartRouter = mongoose.Router();

cartRouter.post('/update',authUser,updateCardData)

export default cartRouter