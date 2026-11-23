import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("vamfire-cart")) || [];
        } catch {
            return [];
        }
    });

    const saveCart = (updatedCart) => {
        setCartItems(updatedCart);
        localStorage.setItem("vamfire-cart", JSON.stringify(updatedCart));
    };

    const addItems = (newItems) => {

        const updatedCart = [...cartItems];

        newItems.forEach((newItem) => {

            const existingItem = updatedCart.find(
                item => item.id === newItem.id
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                updatedCart.push(newItem);
            }

        });

        saveCart(updatedCart);
    };

    const updateQuantity = (id, change) => {

        const updatedCart = cartItems
            .map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + change
                    };
                }
                return item;
            })
            .filter(item => item.quantity > 0);

        saveCart(updatedCart);
    };

    const removeItem = (id) => {
        saveCart(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        saveCart([]);
    };

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    return (
        <CartContext.Provider value={{
            cartItems,
            addItems,
            updateQuantity,
            removeItem,
            clearCart,
            totalItems,
            totalAmount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}