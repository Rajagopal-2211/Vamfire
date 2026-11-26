
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
  Leaf,
  CheckCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import "../styles/food-details.css";

const foodData = {
  burgers: [
    {
      name: "The OG Crunch",
      price: 199,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000",
      description: "Our signature crispy chicken burger with fresh vegetables and creamy sauce.",
      ingredients: ["Premium Burger Bun", "Crispy Chicken Patty", "Fresh Lettuce", "Cheese Slice", "Onion", "Signature Mayonnaise"],
      nutrition: { calories: 420, protein: 25, carbs: 38, fat: 18 },
    },
    {
      name: "Korean Crunch",
      price: 229,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=1000",
      description: "A crispy chicken burger coated with delicious Korean-style sauce.",
      ingredients: ["Burger Bun", "Crispy Chicken Patty", "Korean Sauce", "Caramelised Onion", "Lettuce", "Mayonnaise"],
      nutrition: { calories: 460, protein: 27, carbs: 42, fat: 20 },
    },
    {
      name: "Dynamite Blast",
      price: 249,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1000",
      description: "A flavour-packed burger with signature dynamite sauce and crispy chicken.",
      ingredients: ["Burger Bun", "Crispy Chicken Patty", "Dynamite Sauce", "Cheese", "Lettuce", "Gherkins"],
      nutrition: { calories: 490, protein: 29, carbs: 40, fat: 23 },
    },
    {
      name: "Mexican Feast",
      price: 249,
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1000",
      description: "A bold Mexican-inspired burger with creamy sauce and melted cheese.",
      ingredients: ["Burger Bun", "Chicken Patty", "Mexican Sauce", "Cheese", "Onion", "Lettuce"],
      nutrition: { calories: 475, protein: 27, carbs: 43, fat: 21 },
    },
    {
      name: "Cheese Overloaded",
      price: 279,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000",
      description: "A cheesy delight loaded with crispy chicken and creamy cheese sauce.",
      ingredients: ["Burger Bun", "Crispy Chicken Patty", "Extra Cheese", "Cheese Sauce", "Mayonnaise", "Lettuce"],
      nutrition: { calories: 540, protein: 30, carbs: 42, fat: 29 },
    },
  ],

  paneer: [
    {
      name: "Dynamite Paneer Crunch",
      price: 249,
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=1000",
      description: "Crispy paneer with dynamite sauce and fresh vegetables.",
      ingredients: ["Burger Bun", "Crispy Paneer Patty", "Dynamite Sauce", "Lettuce", "Cheese", "Onion"],
      nutrition: { calories: 460, protein: 19, carbs: 48, fat: 22 },
    },
    {
      name: "Korean Paneer Crunch",
      price: 229,
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=1000",
      description: "Crispy paneer burger with Korean sauce and caramelised onions.",
      ingredients: ["Burger Bun", "Crispy Paneer", "Korean Sauce", "Caramelised Onion", "Lettuce", "Mayonnaise"],
      nutrition: { calories: 445, protein: 18, carbs: 46, fat: 21 },
    },
  ],

  strips: [
    {
      name: "The OG Strips",
      price: 149,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=1000",
      description: "Four pieces of golden crispy chicken strips.",
      ingredients: ["Fresh Chicken Strips", "Crispy Coating", "Secret Seasoning", "Signature Dip"],
      nutrition: { calories: 320, protein: 24, carbs: 22, fat: 15 },
    },
    {
      name: "Korean Strips",
      price: 179,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=1000",
      description: "Crispy chicken strips coated with delicious Korean-style sauce.",
      ingredients: ["Chicken Strips", "Korean Sauce", "Sesame Seeds", "Spring Onion", "Crispy Coating"],
      nutrition: { calories: 370, protein: 25, carbs: 30, fat: 17 },
    },
    {
      name: "Peri-Peri Strips",
      price: 169,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=1000",
      description: "Crispy chicken strips with spicy peri-peri seasoning.",
      ingredients: ["Chicken Strips", "Peri-Peri Seasoning", "Crispy Coating", "Signature Dip"],
      nutrition: { calories: 350, protein: 25, carbs: 24, fat: 16 },
    },
    {
      name: "Chilli Garlic Strips",
      price: 169,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=1000",
      description: "Crispy chicken strips with delicious chilli and garlic flavour.",
      ingredients: ["Chicken Strips", "Chilli Sauce", "Fresh Garlic", "Crispy Coating", "Seasoning"],
      nutrition: { calories: 360, protein: 25, carbs: 26, fat: 16 },
    },
  ],

  fries: [
    {
      name: "The OG Fries",
      price: 99,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1000",
      description: "Classic golden and crispy French fries.",
      ingredients: ["Fresh Potatoes", "Cooking Oil", "Salt"],
      nutrition: { calories: 280, protein: 4, carbs: 36, fat: 14 },
    },
    {
      name: "Korean Fries",
      price: 149,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1000",
      description: "Crispy fries with delicious Korean-style flavour.",
      ingredients: ["French Fries", "Korean Sauce", "Sesame Seeds", "Spring Onion"],
      nutrition: { calories: 340, protein: 5, carbs: 45, fat: 16 },
    },
    {
      name: "Peri-Peri Fries",
      price: 129,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1000",
      description: "Golden fries coated with spicy peri-peri seasoning.",
      ingredients: ["French Fries", "Peri-Peri Seasoning", "Salt"],
      nutrition: { calories: 310, protein: 4, carbs: 40, fat: 15 },
    },
    {
      name: "Garlic Fries",
      price: 139,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1000",
      description: "Crispy fries with delicious garlic seasoning.",
      ingredients: ["French Fries", "Fresh Garlic", "Herbs", "Seasoning"],
      nutrition: { calories: 320, protein: 5, carbs: 40, fat: 16 },
    },
    {
      name: "Overloaded Fries",
      price: 210,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1000",
      description: "Loaded fries with delicious toppings and cheese.",
      ingredients: ["French Fries", "Cheese Sauce", "Mayonnaise", "Special Seasoning", "Toppings"],
      nutrition: { calories: 450, protein: 9, carbs: 48, fat: 25 },
    },
  ],

  shawarma: [
    {
      name: "The OG Shawarma",
      price: 129,
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1000",
      description: "Classic shawarma with juicy filling and fresh vegetables.",
      ingredients: ["Rumali Roti", "Chicken Filling", "Fresh Onion", "Lettuce", "Mayonnaise", "Garlic Sauce"],
      nutrition: { calories: 390, protein: 23, carbs: 42, fat: 15 },
    },
    {
      name: "Peri-Peri Shawarma",
      price: 159,
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1000",
      description: "Delicious shawarma with spicy peri-peri flavour.",
      ingredients: ["Rumali Roti", "Chicken Filling", "Peri-Peri Sauce", "Onion", "Lettuce", "Garlic Sauce"],
      nutrition: { calories: 420, protein: 24, carbs: 43, fat: 17 },
    },
    {
      name: "Vamfire Special Shawarma",
      price: 189,
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1000",
      description: "A special VAMFIRE-style shawarma packed with flavour.",
      ingredients: ["Rumali Roti", "Special Chicken Filling", "Signature Sauce", "Onion", "Lettuce", "Mayonnaise"],
      nutrition: { calories: 460, protein: 26, carbs: 45, fat: 19 },
    },
  ],

  drinks: [
    {
      name: "Diet Coke",
      price: 50,
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=1000",
      description: "Refreshing chilled Diet Coke.",
      ingredients: ["Carbonated Water", "Caramel Colour", "Sweetener", "Flavouring"],
      nutrition: { calories: 1, protein: 0, carbs: 0, fat: 0 },
    },
  ],
};

const categoryTitles = {
  burgers: "SIGNATURE BURGER",
  paneer: "PANEER SIGNATURE BURGER",
  strips: "CHICKEN STRIPS",
  fries: "FRENCH FRIES",
  shawarma: "SHAWARMA",
  drinks: "SOFT DRINKS",
};

function FoodDetails() {
  const { category, itemId } = useParams();
  const navigate = useNavigate();
  const { addItems } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const items = foodData[category] || [];
  const selectedFood = items[Number(itemId)];

  if (!selectedFood || !Number.isInteger(Number(itemId)) || Number(itemId) < 0) {
    return (
      <div className="food-not-found">
        <h2>Food Item Not Found</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const isVegetarian = category === "paneer" || category === "fries" || category === "drinks";

  const handleAddToCart = () => {
    addItems([
      {
        ...selectedFood,
        id: `${category}-${selectedFood.name}`,
        quantity,
      },
    ]);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="food-details-page">
      <nav className="food-details-nav">
        <button
          className="food-back-btn"
          onClick={() => navigate(`/categories/${category}`)}
        >
          <ArrowLeft size={20} />
          Back to Menu
        </button>

        <h2 className="food-brand">
          VAM<span>FIRE</span>
        </h2>

        <button
          className="food-cart-btn"
          onClick={() => navigate("/cart")}
        >
          <ShoppingBag size={22} />
        </button>
      </nav>

      <div className="food-details-container">
        <motion.div
          className="food-details-image"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img src={selectedFood.image} alt={selectedFood.name} />

          <span className="food-image-label">
            🔥 VAMFIRE SPECIAL
          </span>
        </motion.div>

        <motion.div
          className="food-details-content"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="food-category-tag">
            {categoryTitles[category]}
          </p>

          <h1>{selectedFood.name}</h1>

          <h2 className="food-detail-price">
            ₹{selectedFood.price}
          </h2>

          <p className="food-description">
            {selectedFood.description}
          </p>

          <div className="food-type">
            {isVegetarian ? <Leaf size={18} /> : <Beef size={18} />}
            {isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
          </div>

          <div className="food-highlights">
            <div>
              <Flame size={20} />
              <span>Freshly Prepared</span>
            </div>

            <div>
              <Clock size={20} />
              <span>Preparation time: To be confirmed</span>
            </div>
          </div>

          <div className="food-ingredients">
            <h3>What's Inside?</h3>

            <div className="ingredient-list">
              {selectedFood.ingredients.map((ingredient, index) => (
                <span key={index}>
                  <CheckCircle size={15} />
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div className="nutrition-section">
            <h3>Nutrition Information</h3>

            <div className="nutrition-grid">
              <div className="nutrition-card">
                <h4>Calories</h4>
                <p>{selectedFood.nutrition.calories}</p>
                <span>kcal</span>
              </div>

              <div className="nutrition-card">
                <h4>Protein</h4>
                <p>{selectedFood.nutrition.protein}g</p>
                <span>Protein</span>
              </div>

              <div className="nutrition-card">
                <h4>Carbs</h4>
                <p>{selectedFood.nutrition.carbs}g</p>
                <span>Carbohydrates</span>
              </div>

              <div className="nutrition-card">
                <h4>Fat</h4>
                <p>{selectedFood.nutrition.fat}g</p>
                <span>Total Fat</span>
              </div>
            </div>
          </div>

          <div className="food-order-section">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={18} />
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus size={18} />
              </button>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              {added ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
              {added
                ? "Added Successfully!"
                : `Add to Cart · ₹${selectedFood.price * quantity}`}
            </button>
          </div>

          <p className="food-note">
            * Nutrition values are illustrative estimates, not verified
            laboratory values. Confirm actual recipes and serving sizes
            before publishing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default FoodDetails;
