import React from "react";
import { assets } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = UseAppContext();

    if (!product) return null;

    return (
        <div onClick={() => { navigate(`/product/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0); }} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img key={`star-${product._id}-${i}`} className="md:w-3.5 w-3" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                    ))}
                    <p>(4.5)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency} {product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e) => e.stopPropagation()} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 px-3 md:px-4 h-8 md:h-9 rounded text-primary font-medium cursor-pointer hover:bg-primary/20 transition" onClick={() => addToCart(product._id)}>
                                <img src={assets.cart_icon} alt="cart_icon" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 bg-primary/25 rounded select-none h-8 md:h-9 px-2">
                                <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-lg px-1 h-full hover:opacity-70">
                                    −
                                </button>
                                <span className="w-6 text-center text-sm">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer text-lg px-1 h-full hover:opacity-70">
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;