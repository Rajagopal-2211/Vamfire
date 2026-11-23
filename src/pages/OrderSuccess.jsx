import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
    Check,
    Flame,
    ShoppingBag,
    Home
} from "lucide-react";

import "../styles/order-success.css";

function OrderSuccess() {

    const location = useLocation();
    const navigate = useNavigate();

    // Get order information
    const order =
        location.state?.order ||
        JSON.parse(
            localStorage.getItem("vamfire-last-order") || "null"
        );


    if (!order) {

        return (

            <div className="order-not-found">

                <h2>No recent order found!</h2>

                <button onClick={() => navigate("/")}>
                    Back to Home
                </button>

            </div>

        );

    }


    return (

        <section className="success-page">

            <div className="success-container">


                {/* SUCCESS ANIMATION */}

                <motion.div
                    className="success-icon"

                    initial={{
                        scale: 0,
                        rotate: -180
                    }}

                    animate={{
                        scale: 1,
                        rotate: 0
                    }}

                    transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 12
                    }}
                >

                    <Check size={55} strokeWidth={3} />

                </motion.div>


                {/* SUCCESS MESSAGE */}

                <motion.div

                    className="success-heading"

                    initial={{
                        opacity: 0,
                        y: 30
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        delay: 0.3,
                        duration: 0.6
                    }}
                >

                    <div className="success-brand">

                        <Flame size={20} />

                        VAMFIRE

                    </div>

                    <h1>
                        Order Placed
                        <span> Successfully!</span>
                    </h1>

                    <p>
                        Thank you for choosing VAMFIRE.
                        Your delicious food order has been confirmed!
                    </p>

                </motion.div>


                {/* TOKEN NUMBER */}

                <motion.div

                    className="token-card"

                    initial={{
                        opacity: 0,
                        scale: 0.7
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1
                    }}

                    transition={{
                        delay: 0.7,
                        type: "spring"
                    }}
                >

                    <p>YOUR ORDER TOKEN NUMBER</p>

                    <h2>{order.tokenNumber}</h2>

                    <span>
                        Please remember your token number.
                    </span>

                </motion.div>


                {/* BILL RECEIPT */}

                <motion.div

                    className="success-bill"

                    initial={{
                        opacity: 0,
                        y: 50
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        delay: 1,
                        duration: 0.6
                    }}
                >

                    <div className="receipt-heading">

                        <ShoppingBag size={23} />

                        <h2>Order Receipt</h2>

                    </div>


                    <div className="receipt-details">

                        <div>
                            <span>Token Number</span>
                            <strong>{order.tokenNumber}</strong>
                        </div>

                        <div>
                            <span>Order Date</span>
                            <strong>{order.orderDate}</strong>
                        </div>

                        <div>
                            <span>Order Status</span>
                            <strong className="confirmed">
                                Confirmed
                            </strong>
                        </div>

                    </div>


                    <div className="receipt-divider"></div>


                    <h3 className="ordered-items-title">
                        Your Ordered Items
                    </h3>


                    <div className="receipt-items">

                        {order.items.map((item, index) => (

                            <motion.div

                                className="receipt-item"

                                key={item.id}

                                initial={{
                                    opacity: 0,
                                    x: -25
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}

                                transition={{
                                    delay: 1.2 + index * 0.15
                                }}
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div className="receipt-item-info">

                                    <h4>{item.name}</h4>

                                    <p>
                                        ₹{item.price} × {item.quantity}
                                    </p>

                                </div>

                                <strong>
                                    ₹{item.price * item.quantity}
                                </strong>

                            </motion.div>

                        ))}

                    </div>


                    <div className="receipt-divider"></div>


                    <div className="receipt-total-row">

                        <span>Total Items</span>

                        <strong>{order.totalItems}</strong>

                    </div>


                    <div className="receipt-total-row final-total">

                        <span>Total Amount</span>

                        <strong>
                            ₹{order.totalAmount}
                        </strong>

                    </div>


                    <div className="receipt-thankyou">

                        <Flame size={20} />

                        FUELED BY FLAVOR

                    </div>

                </motion.div>


                {/* HOME BUTTON */}

                <motion.button

                    className="success-home-button"

                    onClick={() => navigate("/")}

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}

                    transition={{ delay: 1.7 }}

                    whileHover={{ scale: 1.05 }}

                    whileTap={{ scale: 0.95 }}
                >

                    <Home size={20} />

                    Back to Home

                </motion.button>


            </div>

        </section>

    );

}

export default OrderSuccess;