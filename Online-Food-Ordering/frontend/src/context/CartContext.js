import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if item already exists in cart
            const isItemInCart = prevCart.find((item) => item._id === product._id);

            if (isItemInCart) {
                // If it exists, increase quantity
                return prevCart.map((item) =>
                    item._id === product._id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            }
            // If it's new, add it with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // New function to decrease quantity
    const removeFromCart = (id) => {
        setCart((prevCart) =>
            prevCart.reduce((acc, item) => {
                if (item._id === id) {
                    if (item.quantity === 1) return acc; // Remove item if qty is 1
                    return [...acc, { ...item, quantity: item.quantity - 1 }];
                }
                return [...acc, item];
            }, [])
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
