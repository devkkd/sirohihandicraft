"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sirohi_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("sirohi_cart", JSON.stringify(items));
  }, [items, mounted]);

  const addToCart = (product) => {
    setItems((prev) => {
      if (prev.find((i) => i._id === product._id)) return prev;
      return [...prev, { _id: product._id, name: product.name, slug: product.slug, sku: product.sku, moq: product.moq, thumbnail: product.thumbnail }];
    });
  };

  const removeFromCart = (productId) =>
    setItems((prev) => prev.filter((i) => i._id !== productId));

  const clearCart = () => setItems([]);

  const totalItems = items.length;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalItems, mounted }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
