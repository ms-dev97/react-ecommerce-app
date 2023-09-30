import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import {AnimatePresence} from 'framer-motion'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import cartReducer from './reducers/cartReducer'

const store = createStore(combineReducers({cart: cartReducer}))

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <AnimatePresence mode='wait'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:category/:id' element={<Product />} />
          </Routes>
        </AnimatePresence>
        <footer className='text-center border-t p-5 mt-5'>
          All rights reserved
        </footer>
      </BrowserRouter>
    </Provider>
  )
}

export default App
