import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import {AnimatePresence } from 'framer-motion'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:category/:id' element={<Product />} />
      </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
