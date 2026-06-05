"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("aura_wick_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    }
  }, []);

  // Save cart changes
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("aura_wick_cart", JSON.stringify(newCart));
  };

  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...product, quantity }]);
    }
    setIsCartOpen(true); // Open cart drawer automatically when adding an item
  };

  const removeFromCart = (productId) => {
    saveCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        setIsCartOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
