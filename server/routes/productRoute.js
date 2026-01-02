import express from "express";
import { upload } from "../configs/Multer";
import authSeller from "../middlewares/authSeller";
import { addProduct, changeStock, getAllProducts, getSingleProduct } from "../controllers/productController";
const productRouter = express.Router();

productRouter.post('/add',upload.array([images]),authSeller,addProduct)
productRouter.get('/list',getAllProducts)
productRouter.get('/:id',getSingleProduct)
productRouter.post('/stock',authSeller,changeStock)

export default productRouter