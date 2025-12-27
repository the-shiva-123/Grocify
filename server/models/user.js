import mongoose from "mongoose";
const useSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }   ,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cartItems:{type: Object, default: {}},
    
}, {minimize:false})  
const User= mongoose.models.User ||mongoose.model("User",useSchema);
export default User;
