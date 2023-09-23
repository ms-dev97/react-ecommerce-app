import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cart from './Cart';

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <nav className="py-3 relative">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <Link to="/" className="logo">
                        <img src="" alt="" />
                        <span className="">uBuy</span>
                    </Link>

                    <ul className="md:flex gap-5">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li onClick={() => setIsCartOpen(!isCartOpen)} className="cursor-pointer">
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