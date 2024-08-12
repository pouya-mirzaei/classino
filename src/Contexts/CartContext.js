import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const contains = (courseId) => cartItems.some((course) => course.id == courseId);
  const isEmpty = () => cartItems.length == 0;

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const finalPrice = () => {
    let sum = 0;
    cartItems.map((course) => (sum += course.price));
    return sum;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    contains,
    finalPrice,
    isEmpty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
