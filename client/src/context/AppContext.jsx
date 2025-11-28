import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const [isSeller,setIsSeller] = useState(false)
    const [showUserLogin,setShowUserLogin] = useState(false)
    const value={user,setUser,navigate,isSeller,setIsSeller,showUserLogin,setShowUserLogin}
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const UseAppContext = () => {
    return useContext(AppContext)
}
