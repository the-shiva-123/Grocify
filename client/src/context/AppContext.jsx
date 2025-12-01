import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import { toast } from "react-hot-toast"

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [Products, setProducts] = useState([])
    const [filteredProducts, setFilterProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState("")


    //featch products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }
    //add Products to Cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }

    //update cart item quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated")
    }

    //remove item from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] <=0){
                delete cartData[itemId];
                setCartItems(cartData);
                toast.success("Item removed from cart")
                return;
            }
        }
        setCartItems(cartData);
        toast.success("Item removed from cart")
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    const value = { user, setUser, navigate, isSeller, setIsSeller,
         showUserLogin, setShowUserLogin, Products, currency, cartItems,
          addToCart, updateCartItem, removeFromCart, searchQuery, setSearchQuery, filteredProducts, setFilterProducts };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const UseAppContext = () => {
    return useContext(AppContext)
}
