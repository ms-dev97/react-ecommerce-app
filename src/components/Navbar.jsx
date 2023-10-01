import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cart from './Cart';
import {RxHamburgerMenu} from 'react-icons/rx';
import {AiFillCloseCircle} from 'react-icons/ai'
import { BsSearch } from "react-icons/bs";

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const menuBtn = useRef();

    function toggleMenu() {
        const menu = document.querySelector('.mobile-menu');
        menuBtn.current.classList.toggle('show');
        if (menuBtn.current.classList.contains('show')) {
            menu.style.transform = 'translateX(-100%)';
        } else {
            menu.style.transform = '';
        }
    }

    function closeMenu() {
        menuBtn.current.classList.remove('show');
        const menu = document.querySelector('.mobile-menu');
        menu.style.transform = '';
    }

    function searchProduct(e) {
        const query = e.target.value;

        if (query != '') {
            fetch(`https://dummyjson.com/products/search?q=${query}`)
                .then(res => res.json())
                .then(data => setSearchItems(data.products))
                .catch(e => setSearchItems([]));
        } else {
            setSearchItems([]);
        }
    }

    function clearSearchResults() {
        setTimeout(() => setSearchItems([]), 300);
    }

    return (
        <nav className="py-3 mb-10 relative">
            <div className="container mx-auto px-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="hover:no-underline text-cyan-600 hover:text-cyan-600">
                        <span className="font-bold text-3xl">uBuy</span>
                    </Link>

                    {/* Search */}
                    <div className="relative">
                        <input
                         placeholder="Search products..."
                         type="text" 
                         className="w-[400px] h-[40px] ps-3 border border-solid rounded-md"
                         onKeyUp={searchProduct}
                         onBlur={clearSearchResults}
                        />
                        
                        {/* Search Icon */}
                        <BsSearch className="absolute top-1/2 right-3 -translate-y-1/2" />

                        {/* Search Results */}
                        {searchItems.length > 0 && (
                            <div className="absolute top-full inset-x-0 z-50 bg-white shadow-2xl">
                                {searchItems.map((item, i) => {
                                    if (i >= 5) return;

                                    return <Link to={`/product/${item.category}/${item.id}`} className="flex gap-3 p-3 border-b" key={item.id}>
                                                <img src={item.thumbnail} className="w-10" />
                                                <div className="text-slate-900 hover:text-slate-900">{item.title}</div>
                                            </Link>
                                })}
                            </div>
                        )}

                    </div>

                    {/* Desktop Menu */}
                    <ul className="md:flex hidden gap-5">
                        <li>
                            <a href="#" className="font-bold text-slate-600 hover:text-cyan-600 hover:no-underline">Home</a>
                        </li>
                        <li>
                            <a href="#" className="font-bold text-slate-600 hover:text-cyan-600 hover:no-underline">About</a>
                        </li>
                        <li onClick={() => setIsCartOpen(!isCartOpen)} className="cursor-pointer font-bold text-slate-600 hover:text-cyan-600 hover:no-underline">
                            Cart
                        </li>
                    </ul>

                    {/* Menu Button */}
                    <div ref={menuBtn} className="menu-btn md:hidden" onClick={toggleMenu}>
                        <RxHamburgerMenu />
                    </div>

                    {/* Mobile Menu */}
                    <ul className="mobile-menu md:hidden fixed top-0 start-full z-30 w-40 h-full p-5 bg-white transition-transform">
                        <div className="close-ment absolute right-5" onClick={closeMenu}>
                            <AiFillCloseCircle />
                        </div>
                        <li className="mb-5">
                            <a href="#" className="font-bold text-slate-600 hover:text-cyan-600 hover:no-underline">Home</a>
                        </li>
                        <li className="mb-5">
                            <a href="#" className="font-bold text-slate-600 hover:text-cyan-600 hover:no-underline">About</a>
                        </li>
                        <li onClick={() => setIsCartOpen(!isCartOpen)} className="cursor-pointer font-bold text-slate-600 hover:text-cyan-600 hover:no-underline">
                            Cart
                        </li>
                    </ul>
                </div>
            </div>

            {isCartOpen && (
                <motion.div
                    className="fixed top-0 end-0 z-40 h-full w-60 p-3 text-white bg-slate-950"
                    initial={{translateX: 100}}
                    animate={{translateX: 0}}
                    exit={{translateX: 0}}
                    transition={{duration: 0.3}}
                >
                    <Cart closeCart={setIsCartOpen} />
                </motion.div>
            )}
            
        </nav>
    );
}