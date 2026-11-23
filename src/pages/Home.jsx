import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FoodCategories from "../components/FoodCategories";

function Home() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <FoodCategories />
            </main>
        </>
    );
}

export default Home;