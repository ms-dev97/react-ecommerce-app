import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cart from './Cart';

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <nav className="py-3 mb-10 relative">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <Link to="/" className="hover:no-underline text-cyan-600 hover:text-cyan-600">
                        <span className="font-bold text-3xl">uBuy</span>
                    </Link>

                    <ul className="md:flex gap-5">
                        <li>
                            <a href="#" className="font-bold text-cyan-600 hover:text-cyan-600 hover:no-underline">Home</a>
                        </li>
                        <li>
                            <a href="#" className="font-bold text-cyan-600 hover:text-cyan-600 hover:no-underline">About</a>
                        </li>
                        <li onClick={() => setIsCartOpen(!isCartOpen)} className="cursor-pointer font-bold text-cyan-600 hover:text-cyan-600 hover:no-underline">
                            Cart
                        </li>
                    </ul>
                </div>
            </div>

            {isCartOpen && (
                <motion.div
                    className="fixed top-0 end-0 h-full w-60 p-3 text-white bg-slate-950"
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