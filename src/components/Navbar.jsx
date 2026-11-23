import { ShoppingBag, Menu } from "lucide-react";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="nav-logo">
                <img
                    src="/images/logo/vamfire-logo.png"
                    alt="VAMFIRE Official Logo"
                />
            </div>

            <div className="nav-links">
                <a href="/">Home</a>
                <a href="#categories">Menu</a>
                <a href="#featured">Popular</a>
                <a href="#about">About</a>
            </div>

            <div className="nav-actions">
                <button className="cart-btn">
                    <ShoppingBag size={20} />
                    <span>0</span>
                </button>

                <button className="mobile-menu">
                    <Menu size={25} />
                </button>
            </div>

        </nav>
    );
}

export default Navbar;