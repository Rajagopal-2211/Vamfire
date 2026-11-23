import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import {
    ArrowLeft,
    ShoppingBag,
    Flame,
    Clock,
    Plus,
    Minus,
    Beef,
    Leaf
} from "lucide-react";

import "../styles/food-details.css";

const foodData = {
    "signature-burgers": [
        "The OG Crunch",
        "Korean Crunch",
        "Dynamatic Blast",
        "Mexican Feast",
        "Cheese Overloaded"
    ],

    "paneer-burgers": [
        "Dynamatic Paneer Crunch",
        "Korean Paneer Crunch"
    ],

    "chicken-strips": [
        "OG Strips",
        "Korean Strips",
        "Peri-Peri Strips",
        "Chilli Garlic Strips"
    ],

    "fries": [
        "OG Fries",
        "Korean Fries",
        "Peri-Peri Fries",
        "Garlic Fries",
        "Overloaded Fries"
    ],

    "shawarma": [
        "OG Shawarma",
        "Peri-Peri Shawarma",
        "Vamfire Shawarma"
    ],

    "drinks": [
        "Diet Coke",
        "Sprite",
        "Thums Up",
        "Mountain Dew"
    ]
};

const categoryImages = {
    "signature-burgers": "/images/burger1.jpg",
    "paneer-burgers": "/images/categories/panner.jpg",
    "chicken-strips": "/images/categories/strips.jpg",
    "fries": "/images/categories/fries.png",
    "shawarma": "/images/categories/shawarma.jpg",
    "drinks": "/images/categories/drinks.webp"
};

function FoodDetails() {

    const { category, itemId } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

    const items = foodData[category] || [];

    const itemIndex = Number(itemId);

    const foodName = items[itemIndex];

    if (!foodName) {
        return (
            <div className="food-not-found">
                <h2>Food Item Not Found</h2>

                <button onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        );
    }

    const foodImage = categoryImages[category];

    const isVegetarian = category === "paneer-burgers";

    return (

        <section className="food-details-page">

            {/* Navigation */}
            <nav className="food-details-nav">

                <button
                    className="food-back-btn"
                    onClick={() => navigate(`/menu/${category}`)}
                >
                    <ArrowLeft size={20} />
                    Back to Menu
                </button>

                <h2 className="food-brand">
                    VAM<span>FIRE</span>
                </h2>

                <button className="food-cart-btn">
                    <ShoppingBag size={22} />
                </button>

            </nav>


            {/* Food Details */}
            <div className="food-details-container">

                {/* Food Image */}
                <motion.div
                    className="food-details-image"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >

                    <img
                        src={foodImage}
                        alt={foodName}
                    />

                    <span className="food-image-label">
                        🔥 VAMFIRE SPECIAL
                    </span>

                </motion.div>


                {/* Food Information */}
                <motion.div
                    className="food-details-content"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >

                    <p className="food-category-tag">
                        {category.replaceAll("-", " ").toUpperCase()}
                    </p>

                    <h1>{foodName}</h1>

                    <p className="food-description">
                        Discover the delicious taste of {foodName}.
                        Freshly prepared with carefully selected
                        ingredients and signature VAMFIRE flavours.
                    </p>


                    {/* Food Type */}
                    <div className="food-type">

                        {isVegetarian ? (
                            <>
                                <Leaf size={18} />
                                Vegetarian
                            </>
                        ) : (
                            <>
                                <Beef size={18} />
                                Food Category Special
                            </>
                        )}

                    </div>


                    {/* Food Highlights */}
                    <div className="food-highlights">

                        <div>
                            <Flame size={20} />
                            <span>Freshly Prepared</span>
                        </div>

                        <div>
                            <Clock size={20} />
                            <span>Preparation Time: To be confirmed</span>
                        </div>

                    </div>


                    {/* Ingredients */}
                    <div className="food-ingredients">

                        <h3>Ingredients</h3>

                        <p>
                            Ingredient details will be updated
                            according to the restaurant's final recipe.
                        </p>

                    </div>


                    {/* Nutrition */}
                    <div className="nutrition-section">

                        <h3>Nutrition Information</h3>

                        <div className="nutrition-grid">

                            <div className="nutrition-card">
                                <h4>Calories</h4>
                                <p>--</p>
                                <span>kcal</span>
                            </div>

                            <div className="nutrition-card">
                                <h4>Protein</h4>
                                <p>--</p>
                                <span>grams</span>
                            </div>

                            <div className="nutrition-card">
                                <h4>Carbs</h4>
                                <p>--</p>
                                <span>grams</span>
                            </div>

                            <div className="nutrition-card">
                                <h4>Fat</h4>
                                <p>--</p>
                                <span>grams</span>
                            </div>

                        </div>

                    </div>


                    {/* Quantity */}
                    <div className="food-order-section">

                        <div className="quantity-selector">

                            <button
                                onClick={() =>
                                    setQuantity(Math.max(1, quantity - 1))
                                }
                            >
                                <Minus size={18} />
                            </button>

                            <span>{quantity}</span>

                            <button
                                onClick={() =>
                                    setQuantity(quantity + 1)
                                }
                            >
                                <Plus size={18} />
                            </button>

                        </div>


                        <button
                            className="add-to-cart-btn"
                            type="button"
                            disabled
                        >
                            <ShoppingBag size={20} />
                            Add to Cart
                        </button>

                    </div>

                    <p className="food-note">
                        * Ingredients, nutrition and prices will be
                        updated using confirmed restaurant information.
                    </p>

                </motion.div>

            </div>

        </section>
    );
}

export default FoodDetails;