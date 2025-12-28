import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
    try {
        const sellerToken = req.cookies.token;
        if (!sellerToken) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if (decoded.email=== process.env.SELLER_EMAIL) {
            next();
        }
        else {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
export default authSeller;

