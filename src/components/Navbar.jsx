export default function Navbar() {
    return (
        <nav className="py-3">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <a href="#" className="logo">
                        <img src="" alt="" />
                        <span>uBuy</span>
                    </a>

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