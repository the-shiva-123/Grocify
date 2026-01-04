import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import { toast } from "react-hot-toast"
import axios from "axios"

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials=true; 
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
    const [selectedAddress, setSelectedAddress] = useState(0)

    // Dummy addresses state
    const [dummyAddresses, setDummyAddresses] = useState([
        {
            id: 0,
            name: "Home",
            fullName: "John Doe",
            phone: "+1 234 567 8900",
            address: "123 Main Street, Apartment 4B",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
        },
        {
            id: 1,
            name: "Office",
            fullName: "John Doe",
            phone: "+1 234 567 8900",
            address: "456 Business Ave, Suite 200",
            city: "Manhattan",
            state: "NY",
            zipCode: "10002",
            country: "USA"
        },
        {
            id: 2,
            name: "Parents House",
            fullName: "Robert Doe",
            phone: "+1 234 567 8901",
            address: "789 Family Lane",
            city: "Brooklyn",
            state: "NY",
            zipCode: "11201",
            country: "USA"
        }
    ]);

    // Add new address
    const addNewAddress = (newAddress) => {
        const addressWithId = {
            ...newAddress,
            id: dummyAddresses.length
        };
        setDummyAddresses([...dummyAddresses, addressWithId]);
        setSelectedAddress(addressWithId.id);
        toast.success("Address added successfully!");
    }


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
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
                setCartItems(cartData);
                toast.success("Item removed from cart")
                return;
            }
        }
        setCartItems(cartData);
        toast.success("Item removed from cart")
    }

    //get cart items count
    const getCartItemsCount = () => {
        let totalCount = 0;
        for (const key in cartItems) {
            totalCount += cartItems[key];
        }
        return totalCount;
    }

    //get total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = Products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const value = {
        user, setUser, navigate, isSeller, setIsSeller,
        showUserLogin, setShowUserLogin, Products, currency, cartItems,
        addToCart, updateCartItem, removeFromCart, searchQuery, setSearchQuery,
        filteredProducts, setFilterProducts, getCartItemsCount, getCartAmount,
        dummyAddresses, selectedAddress, setSelectedAddress, addNewAddress, axios
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const UseAppContext = () => {
    return useContext(AppContext)
}
