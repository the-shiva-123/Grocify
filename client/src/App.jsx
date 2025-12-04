import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './Components/Navbar'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { UseAppContext } from './context/AppContext'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart' 
import AddAddress from './pages/AddAddress'

const App = () => {
  const { pathname } = useLocation()
  const isSellerPath = pathname.includes('seller')
  const { showUserLogin } = UseAppContext();

  return (
    <div>
      {isSellerPath ? null : <NavBar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addaddress" element={<AddAddress />} />
        </Routes>
      </div>

      <div>
        {!isSellerPath && <Footer />}
      </div>
    </div>
  )
}

export default App