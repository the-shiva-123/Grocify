import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
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
import MyOrders from './pages/MyOrders'
import SellerLogin from './Components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './Components/seller/AddProduct'
import ProductList from './Components/seller/ProductList'
import Orders from './Components/seller/Orders'

const App = () => {
  const { pathname } = useLocation()
  const isSellerPath = pathname.includes('seller')
  const { showUserLogin, isSeller } = UseAppContext();

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
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
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/sellerlogin" element={isSeller ? <Navigate to="/seller" /> : <SellerLogin />} />
          <Route path="/seller/*" element={isSeller ? <SellerLayout /> : <Navigate to="/sellerlogin" />}>
            <Route index element={<AddProduct />} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>

      <div>
        {!isSellerPath && <Footer />}
      </div>
    </div>
  )
}

export default App