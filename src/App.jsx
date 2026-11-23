import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";

import { CartProvider } from "./context/CartContext";

function App() {

    return (

        <CartProvider>

            <BrowserRouter>

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route
                        path="/categories/:category"
                        element={<Menu />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                </Routes>

            </BrowserRouter>

        </CartProvider>

    );
}

export default App;