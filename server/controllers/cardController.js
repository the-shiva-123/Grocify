//Update User CardData : /api/card/update

import User from "../models/user.js";

export const updateCardData= async (req,res)=>{
    try {
        const {userId,cartItems}=req.body;
        await User.findByIdAndUpdate({userId},{cartItems})
        res.json({success:true,message:"Card updated successfully"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}