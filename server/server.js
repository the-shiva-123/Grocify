import cookieParser from "cookie-parser";
import express from "express";  
import cors from "cors";
import connectDB from "./configs/db.js";
import userRoute from "./routes/userRoute.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
await connectDB();  

//Allow mutiple origins 
const allowedOrigins = ["http://localhost:5173"];
//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get("/", (req, res) => {
    res.send("Api is working");
});
app.use("/api/user", userRoute);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
