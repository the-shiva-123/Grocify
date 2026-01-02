import express from "express";
import { authUser } from "../middlewares/authUser";
import { addAddress, getUserAddress } from "../controllers/addressController";
const addressRouter = express.Router();
addressRouter.post('/add',authUser,addAddress);
addressRouter.get('/user',authUser,getUserAddress);
export default addressRouter
