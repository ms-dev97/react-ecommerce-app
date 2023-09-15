import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="py-3">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <Link to="/" className="logo">
                        <img src="" alt="" />
                        <span>uBuy</span>
                    </Link>

                    <ul className="md:flex gap-5">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Cart</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}