import { motion } from "framer-motion";

import {
    ArrowUpRight,
    Beef,
    Leaf,
    Drumstick,
    Utensils,
    Sandwich,
    CupSoda
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../styles/categories.css";

const categories = [
    {
        id: 1,
        name: "Signature Burgers",
        slug: "burgers",
        icon: Beef,
        description: "Crispy, juicy and loaded with flavour.",
        image: "/images/burger1.jpg",
        count: "05 Items"
    },
    {
        id: 2,
        name: "Paneer Burgers",
        slug: "paneer",
        icon: Leaf,
        description: "Delicious vegetarian burger experience.",
        image: "/images/categories/panner.jpg",
        count: "02 Items"
    },
    {
        id: 3,
        name: "Chicken Strips",
        slug: "strips",
        icon: Drumstick,
        description: "Golden crispy strips with bold flavours.",
        image: "/images/categories/strips.jpg",
        count: "04 Items"
    },
    {
        id: 4,
        name: "French Fries",
        slug: "fries",
        icon: Utensils,
        description: "Perfectly seasoned crispy fries.",
        image: "/images/categories/fries.png",
        count: "05 Items"
    },
    {
        id: 5,
        name: "Shawarma",
        slug: "shawarma",
        icon: Sandwich,
        description: "Fresh, juicy and delicious shawarma.",
        image: "/images/categories/shawarma.jpg",
        count: "03 Items"
    },
    {
        id: 6,
        name: "Soft Drinks",
        slug: "drinks",
        icon: CupSoda,
        description: "Refresh yourself with every sip.",
        image: "/images/categories/drinks.webp",
        count: "05 Items"
    }
];

function FoodCategories() {

    const navigate = useNavigate();

    return (
        <section className="categories-section" id="categories">

            <div className="container">

                {/* Section Heading */}

                <motion.div
                    className="category-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >

                    <div>
                        <p className="section-tag">
                            🔥 EXPLORE OUR MENU
                        </p>

                        <h2>
                            WHAT ARE YOU
                            <span> CRAVING?</span>
                        </h2>

                        <p className="section-description">
                            Discover our delicious collection of
                            freshly prepared food.
                        </p>
                    </div>

                    <span className="category-count">
                        06 Categories
                    </span>

                </motion.div>


                {/* Food Category Cards */}

                <div className="categories-grid">

                    {categories.map((category, index) => {

                        const Icon = category.icon;

                        return (

                            <motion.div
                                className="category-card"
                                key={category.id}

                                initial={{
                                    opacity: 0,
                                    y: 50
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}

                                viewport={{
                                    once: true,
                                    amount: 0.2
                                }}

                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}

                                whileHover={{
                                    y: -8,
                                    scale: 1.02
                                }}
                            >

                                {/* Food Image */}

                                <div className="category-image">

                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        loading="lazy"
                                    />

                                    <span className="category-items">
                                        {category.count}
                                    </span>

                                </div>


                                {/* Category Information */}

                                <div className="category-info">

                                    <div>

                                        <div className="category-title">

                                            <Icon
                                                size={24}
                                                className="category-logo"
                                            />

                                            <h3>
                                                {category.name}
                                            </h3>

                                        </div>

                                        <p>
                                            {category.description}
                                        </p>

                                    </div>


                                    {/* Explore Button */}

                                    <button
                                        className="category-arrow"
                                        aria-label={`Explore ${category.name}`}
                                        type="button"
                                        onClick={() =>
                                            navigate(`/categories/${category.slug}`)
                                        }
                                    >
                                        <ArrowUpRight size={22} />
                                    </button>

                                </div>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default FoodCategories;