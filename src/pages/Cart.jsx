import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Trash2,
    ShoppingBag,
    Plus,
    Minus
} from "lucide-react";

import { useCart } from "../context/CartContext";

import "../styles/cart.css";

function Cart() {

    const navigate = useNavigate();

    const {
        cartItems,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalAmount
    } = useCart();


    // PLACE ORDER FUNCTION

    const handlePlaceOrder = () => {

        if (cartItems.length === 0) {
            return;
        }

        // Generate unique token number
        const tokenNumber =
            "VF" +
            Date.now().toString().slice(-6) +
            Math.floor(1000 + Math.random() * 9000);

        // Create order receipt
        const order = {

            tokenNumber: tokenNumber,

            items: cartItems.map(item => ({
                ...item
            })),

            totalItems: totalItems,

            totalAmount: totalAmount,

            orderDate: new Date().toLocaleString("en-IN"),

            status: "Order Placed Successfully"

        };

        // Save order in browser
        localStorage.setItem(
            "vamfire-last-order",
            JSON.stringify(order)
        );

        // Empty the shopping cart
        clearCart();

        // Navigate to confirmation page
        navigate("/order-success", {
            state: { order }
        });

    };


    return (

        <section className="cart-page">

            <div className="cart-container">

                <div className="cart-heading">

                    <p>🔥 VAMFIRE ORDER</p>

                    <h1>Your Shopping Cart</h1>

                    <span>
                        Review your delicious selection.
                    </span>

                </div>


                {cartItems.length === 0 ? (

                    <div className="empty-cart">

                        <ShoppingBag size={55} />

                        <h2>Your cart is empty!</h2>

                        <p>
                            Add your favourite VAMFIRE food items.
                        </p>

                        <button onClick={() => navigate("/")}>
                            Explore Menu
                        </button>

                    </div>

                ) : (

                    <>

                        <div className="cart-items">

                            {cartItems.map(item => (

                                <div
                                    className="cart-item"
                                    key={item.id}
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <div className="cart-item-info">

                                        <h3>{item.name}</h3>

                                        <p>
                                            ₹{item.price} per item
                                        </p>

                                        <strong>
                                            ₹{item.price * item.quantity}
                                        </strong>

                                    </div>


                                    <div className="cart-quantity">

                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, -1)
                                            }
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, 1)
                                            }
                                        >
                                            <Plus size={16} />
                                        </button>

                                    </div>


                                    <button
                                        className="remove-item"
                                        onClick={() =>
                                            removeItem(item.id)
                                        }
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                </div>

                            ))}

                        </div>


                        {/* BILL */}

                        <div className="bill-card">

                            <h2>Order Bill</h2>

                            <div className="bill-row">

                                <span>Total Items</span>

                                <span>{totalItems}</span>

                            </div>


                            <div className="bill-row">

                                <span>Subtotal</span>

                                <span>₹{totalAmount}</span>

                            </div>


                            <div className="bill-divider"></div>


                            <div className="bill-row bill-total">

                                <span>Total Amount</span>

                                <strong>₹{totalAmount}</strong>

                            </div>


                            <p className="bill-note">
                                Taxes and additional charges, if applicable,
                                will be confirmed at checkout.
                            </p>


                            {/* PLACE ORDER BUTTON */}

                            <button
                                className="checkout-button"
                                onClick={handlePlaceOrder}
                            >
                                <ShoppingBag size={19} />
                                Place Order
                            </button>


                            <button
                                className="clear-cart-button"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>

                        </div>

                    </>

                )}


                <button
                    className="cart-back-button"
                    onClick={() => navigate("/")}
                >

                    <ArrowLeft size={20} />

                    Continue Shopping

                </button>

            </div>

        </section>

    );

}

export default Cart;