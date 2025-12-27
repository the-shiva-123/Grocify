
import jwt from "jsonwebtoken";
const authUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id) {
            req.userId = decoded.id;
        }
        else {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
export default authUser;