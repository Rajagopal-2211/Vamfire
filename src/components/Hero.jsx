import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "../styles/home.css";

function Hero() {

    return (

        <section className="hero container">

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >

                <p className="hero-tag">🔥 WELCOME TO VAMFIRE</p>

                <h1>
                    FUEL YOUR
                    <span> CRAVINGS.</span>
                </h1>

                <p className="hero-description">
                    Experience the perfect combination of crispy,
                    juicy and delicious food. Every bite brings
                    a new level of flavour.
                </p>

                <button className="explore-btn">
                    Explore Menu
                    <ArrowRight size={19} />
                </button>

            </motion.div>


            <motion.div
    className="hero-food"
    animate={{ y: [0, -15, 0] }}
    transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
    }}
>
    <img
        src="/images/burger1.png"
        alt="VAMFIRE Signature Burger"
        className="hero-burger-image"
    />
</motion.div>

        </section>
    );
}

export default Hero;