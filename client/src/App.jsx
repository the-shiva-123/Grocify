import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/Navbar'
import Home from './pages/Home'
const App = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App