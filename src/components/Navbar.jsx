import { ShoppingBag, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

function Navbar() {

    const { totalItems } = useCart();

    return (
        <nav className="navbar">

            <div className="nav-logo">
                <img
                    src="/images/logo/vamfire-logo.png"
                    alt="VAMFIRE Official Logo"
                />
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/#categories">Menu</Link>
                <a href="/#featured">Popular</a>
                <a href="/#about">About</a>
            </div>

            <div className="nav-actions">

                <Link to="/cart" className="cart-btn">
                    <ShoppingBag size={20} />
                    <span>{totalItems}</span>
                </Link>

                <button className="mobile-menu">
                    <Menu size={25} />
                </button>

            </div>

        </nav>
    );
}

export default Navbar;