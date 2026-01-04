import express from "express";
import authUser from "../middlewares/authUser.js";
import { addAddress, getUserAddress } from "../controllers/addressController.js";
const addressRouter = express.Router();
addressRouter.post('/add',authUser,addAddress);
addressRouter.get('/user',authUser,getUserAddress);
export default addressRouter
