import Order from "../models/order.js";
import Product from "../models/product.js";
// place order COD:/api/order/cod

export const placeOrderCod=async(req,res)=>{
    try {
        const {userId,items,address} = req.body;
        if(!address || items==0){
            return res.status(400).json({message:"Address and items are required"})
        }
        //calculate total amount
        let amount=await items.reduce(async(acc,item)=>{
            const product = await Product.findById(item.product);
            return (await acc)+product.price*item.quantity;
        },0)
        //Add Tax Charges(2%)
        amount+=Math.floor(amount*0.02);
        await Order.create({userId,items,address,amount,paymentType:"COD",isPaid:false})
        return res.status(200).json({success:true,message:"Order placed successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}
