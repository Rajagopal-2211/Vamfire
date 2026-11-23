import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import "../styles/menu.css";


const menuData = {

    burgers: {
        title: "Signature Burgers",
        fallback: "/images/burger1.jpg",
        items: [
            { name: "The OG Crunch", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", description: "Crispy chicken, fresh lettuce, creamy mayonnaise and melted cheese." },
            { name: "Korean Crunch", price: 229, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=800", description: "Crispy chicken tossed in Korean sauce with caramelised onions." },
            { name: "Dynamite Blast", price: 249, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800", description: "Signature dynamite sauce, fresh lettuce, cheese and gherkins." },
            { name: "Mexican Feast", price: 249, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800", description: "Bold Mexican sauce, creamy mayonnaise and melted cheese." },
            { name: "Cheese Overloaded", price: 279, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", description: "Golden crispy chicken with cheesy mayo and extra cheese." }
        ]
    },

    paneer: {
        title: "Paneer Signature Burgers",
        fallback: "/images/categories/panner.jpg",
        items: [
            { name: "Dynamite Paneer Crunch", price: 249, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800", description: "Crispy paneer, dynamite sauce, fresh lettuce and cheese." },
            { name: "Korean Paneer Crunch", price: 229, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800", description: "Korean sauce, caramelised onions and crispy paneer." }
        ]
    },

    strips: {
        title: "Chicken Strips",
        fallback: "/images/categories/strips.jpg",
        items: [
            { name: "The OG Strips", price: 149, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800", description: "Four pieces of golden crispy chicken strips." },
            { name: "Korean Strips", price: 179, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800", description: "Crispy strips coated with Korean-style sauce." },
            { name: "Peri-Peri Strips", price: 169, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800", description: "Crispy chicken strips with spicy peri-peri seasoning." },
            { name: "Chilli Garlic Strips", price: 169, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800", description: "Crispy strips with chilli and garlic flavour." }
        ]
    },

    fries: {
        title: "French Fries",
        fallback: "/images/categories/fries.png",
        items: [
            { name: "The OG Fries", price: 99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800", description: "Classic golden crispy French fries." },
            { name: "Korean Fries", price: 149, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800", description: "Crispy fries with Korean-style flavour." },
            { name: "Peri-Peri Fries", price: 129, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800", description: "Golden fries coated with spicy peri-peri seasoning." },
            { name: "Garlic Fries", price: 139, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800", description: "Crispy fries with delicious garlic seasoning." },
            { name: "Overloaded Fries", price: 210, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800", description: "Loaded fries with delicious toppings and cheese." }
        ]
    },

    shawarma: {
        title: "Shawarma",
        fallback: "/images/categories/shawarma.jpg",
        items: [
            { name: "The OG Shawarma", price: 129, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800", description: "Classic shawarma with juicy filling and fresh vegetables." },
            { name: "Peri-Peri Shawarma", price: 159, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800", description: "Shawarma with spicy peri-peri flavour." },
            { name: "Vamfire Special Shawarma", price: 189, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800", description: "A special VAMFIRE-style shawarma." }
        ]
    },

    drinks: {
        title: "Soft Drinks",
        fallback: "/images/categories/drinks.webp",
        items: [
            { name: "Diet Coke", price: 50, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800", description: "Refreshing chilled Diet Coke." }
        ]
    }
};


function Menu() {

    const { category } = useParams();
    const navigate = useNavigate();

    const { addItems, totalItems } = useCart();

    const selectedCategory = menuData[category];

    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
        setQuantities({});
    }, [category]);

    const updateQuantity = (index, change) => {

        setQuantities(previous => {

            const current = previous[index] || 0;

            return {
                ...previous,
                [index]: Math.max(0, current + change)
            };

        });

    };

    const selectedItems = selectedCategory
        ? selectedCategory.items
            .map((item, index) => ({
                ...item,
                id: `${category}-${item.name}`,
                quantity: quantities[index] || 0
            }))
            .filter(item => item.quantity > 0)
        : [];

    const totalPrice = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleAddToCart = () => {

        if (selectedItems.length === 0) {
            return;
        }

        addItems(selectedItems);

        navigate("/cart");

    };

    return (

        <section className="menu-page">

            <div className="menu-container">

                {selectedCategory ? (

                    <>

                        <div className="menu-heading">

                            <p>🔥 VAMFIRE SPECIALS</p>

                            <h1>{selectedCategory.title}</h1>

                            <span>
                                Freshly prepared. Seriously delicious.
                            </span>

                        </div>

                        <div className="menu-items">

                            {selectedCategory.items.map((item, index) => (

                                <motion.div
                                    className="menu-card"
                                    key={item.name}
                                    initial={{ opacity: 0, y: 35 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ y: -7 }}
                                >

                                    <div className="menu-card-image">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            onError={(event) => {
                                                event.currentTarget.onerror = null;
                                                event.currentTarget.src =
                                                    selectedCategory.fallback;
                                            }}
                                        />

                                    </div>

                                    <div className="menu-card-content">

                                        <h3>{item.name}</h3>

                                        <p>{item.description}</p>

                                        <div className="menu-card-bottom">

                                            <span className="menu-price">
                                                ₹{item.price}
                                            </span>

                                            <div className="quantity-control">

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(index, -1)
                                                    }
                                                    disabled={!quantities[index]}
                                                >
                                                    <Minus size={16} />
                                                </button>

                                                <span>
                                                    {quantities[index] || 0}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(index, 1)
                                                    }
                                                >
                                                    <Plus size={16} />
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </motion.div>

                            ))}

                        </div>

                        <div className="menu-order-summary">

                            <div>
                                <span>Selected Items</span>
                                <h3>
                                    {selectedItems.reduce(
                                        (sum, item) => sum + item.quantity, 0
                                    )}
                                </h3>
                            </div>

                            <div>
                                <span>Category Total</span>
                                <h3>₹{totalPrice}</h3>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={selectedItems.length === 0}
                            >
                                <ShoppingBag size={18} />
                                Add to Cart
                            </button>

                        </div>

                        <div className="menu-back-container">

                            <button
                                className="back-button"
                                onClick={() => navigate("/")}
                            >
                                <ArrowLeft size={20} />
                                Back to Home
                            </button>

                            {totalItems > 0 && (
                                <button
                                    className="back-button"
                                    onClick={() => navigate("/cart")}
                                >
                                    View Cart ({totalItems})
                                </button>
                            )}

                        </div>

                    </>

                ) : (

                    <div className="not-found">

                        <h2>Category Not Found!</h2>

                        <button
                            className="back-button"
                            onClick={() => navigate("/")}
                        >
                            Back to Home
                        </button>

                    </div>

                )}

            </div>

        </section>

    );

}

export default Menu;