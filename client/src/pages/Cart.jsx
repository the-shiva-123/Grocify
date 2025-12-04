import { useState, useEffect } from "react"
import { UseAppContext } from "../context/AppContext";

const Cart = () => {
    const { Products, currency, cartItems, removeFromCart, updateCartItem, getCartAmount, navigate, addToCart, dummyAddresses, selectedAddress, setSelectedAddress } = UseAppContext();
    const [cartData, setCartData] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [showAddressDropdown, setShowAddressDropdown] = useState(false);

    useEffect(() => {
        if (Products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                if (cartItems[items] > 0) {
                    const product = Products.find((product) => product._id === items);
                    if (product) {
                        tempData.push({
                            _id: items,
                            quantity: cartItems[items],
                            ...product
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, Products]);

    const currentAddress = dummyAddresses[selectedAddress] || dummyAddresses[0];

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-10">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-gray-500">({cartData.length} Items)</span>
                </h1>

                {cartData.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                        <p className="text-xl text-gray-500 font-medium">Your cart is empty</p>
                        <p className="text-gray-400 mt-2">Looks like you haven't added anything to your cart yet.</p>
                        <button onClick={() => navigate('/products')} className="mt-6 px-8 py-3 bg-primary text-white rounded hover:bg-primary/80 transition font-medium">
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-[3fr_1fr_0.5fr] md:grid-cols-[3fr_1fr_0.5fr] text-gray-500 text-sm md:text-base font-medium pb-4 border-b border-gray-200">
                            <p className="text-left">Product Details</p>
                            <p className="text-center">Subtotal</p>
                            <p className="text-center">Remove</p>
                        </div>

                        {cartData.map((item, index) => (
                            <div key={index} className="grid grid-cols-[3fr_1fr_0.5fr] md:grid-cols-[3fr_1fr_0.5fr] items-center text-sm md:text-base py-6 border-b border-gray-200">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="cursor-pointer w-16 h-16 md:w-24 md:h-24 flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden bg-gray-50" onClick={() => navigate(`/product/${item.category}/${item._id}`)}>
                                        <img className="w-full h-full object-cover hover:scale-110 transition duration-500" src={item.image[0]} alt={item.name} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium text-gray-800 cursor-pointer hover:text-primary transition line-clamp-1 md:line-clamp-2" onClick={() => navigate(`/product/${item.category}/${item._id}`)}>{item.name}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-gray-500">{currency}{item.offerPrice}</p>
                                            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="px-2 py-1 hover:bg-gray-100 transition text-gray-600 hover:text-primary font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="px-3 py-1 text-sm font-medium text-gray-800 border-x border-gray-300 min-w-[40px] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(item._id)}
                                                    className="px-2 py-1 hover:bg-gray-100 transition text-gray-600 hover:text-primary font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center font-medium text-gray-800">{currency}{item.offerPrice * item.quantity}</p>
                                <button onClick={() => removeFromCart(item._id)} className="cursor-pointer mx-auto text-gray-400 hover:text-red-500 transition p-2 rounded-full hover:bg-red-50">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        <button onClick={() => navigate('/products')} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium hover:underline w-max">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-1 transition">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Continue Shopping
                        </button>
                    </>
                )}
            </div>

            {/* Order Summary */}
            {cartData.length > 0 && (
                <div className="max-w-[380px] w-full bg-white p-6 max-md:mt-8 border border-gray-200 rounded-xl shadow-sm h-fit sticky top-24">
                    <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-800">{currency}{getCartAmount()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping Fee</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Tax (Estimated)</span>
                            <span className="font-medium text-gray-800">{currency}0.00</span>
                        </div>

                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-800">Total</span>
                            <span className="text-xl font-bold text-primary">{currency}{getCartAmount()}</span>
                        </div>
                    </div>

                    {/* Delivery Address Section */}
                    <div className="mt-8">
                        <p className="text-sm font-medium text-gray-700 mb-3">Delivery Address</p>
                        <div className="relative">
                            <div
                                onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                                className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-primary transition bg-gray-50"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                                                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
                                            </svg>
                                            <p className="font-medium text-gray-800 text-sm">{currentAddress.name}</p>
                                        </div>
                                        <p className="text-xs text-gray-600">{currentAddress.fullName}</p>
                                        <p className="text-xs text-gray-500 mt-1">{currentAddress.address}</p>
                                        <p className="text-xs text-gray-500">{currentAddress.city}, {currentAddress.state} {currentAddress.zipCode}</p>
                                        <p className="text-xs text-gray-500">{currentAddress.phone}</p>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-gray-400 transition-transform ${showAddressDropdown ? 'rotate-180' : ''}`}>
                                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {showAddressDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                                    {dummyAddresses.map((address) => (
                                        <div
                                            key={address.id}
                                            onClick={() => {
                                                setSelectedAddress(address.id);
                                                setShowAddressDropdown(false);
                                            }}
                                            className={`p-3 cursor-pointer hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0 ${selectedAddress === address.id ? 'bg-primary/5' : ''}`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                                                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
                                                </svg>
                                                <p className="font-medium text-gray-800 text-sm">{address.name}</p>
                                                {selectedAddress === address.id && (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary ml-auto">
                                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-600">{address.fullName}</p>
                                            <p className="text-xs text-gray-500 mt-1">{address.address}</p>
                                            <p className="text-xs text-gray-500">{address.city}, {address.state} {address.zipCode}</p>
                                        </div>
                                    ))}
                                    <div className="p-3 text-center border-t border-gray-200 bg-gray-50">
                                        <button onClick={() => navigate('/addaddress')} className="text-sm text-primary font-medium hover:underline">+ Add New Address</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700 mb-3">Payment Method</p>
                        <div className="space-y-3">
                            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${paymentMethod === "COD" ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-primary accent-primary cursor-pointer"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 text-sm">Cash on Delivery</p>
                                    <p className="text-xs text-gray-500">Pay when you receive</p>
                                </div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                                    <path d="M2 8.5C2 6.567 3.567 5 5.5 5H18.5C20.433 5 22 6.567 22 8.5V15.5C22 17.433 20.433 19 18.5 19H5.5C3.567 19 2 17.433 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </label>
                            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${paymentMethod === "Online" ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Online"
                                    checked={paymentMethod === "Online"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-primary accent-primary cursor-pointer"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 text-sm">Online Payment</p>
                                    <p className="text-xs text-gray-500">UPI, Cards, Net Banking</p>
                                </div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700 mb-2">Promo Code</p>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Enter code" className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary text-sm" />
                            <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900 transition">Apply</button>
                        </div>
                    </div>

                    <button className="w-full py-3.5 mt-8 cursor-pointer bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition shadow-md hover:shadow-lg transform active:scale-[0.99]">
                        Proceed to Checkout
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-xs">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Secure Checkout
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart