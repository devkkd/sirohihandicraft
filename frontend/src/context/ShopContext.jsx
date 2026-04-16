"use client";

import { createContext, useContext, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com";

const ShopContext = createContext({
  categories: [],
  subCategories: [],
  products: [],
  loading: true,
});

export function ShopProvider({ children }) {
  const [state, setState] = useState({
    categories: [],
    subCategories: [],
    products: [],
    loading: true,
  });

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/categories`).then((r) => r.json()),
      fetch(`${API_URL}/api/subcategories`).then((r) => r.json()),
      fetch(`${API_URL}/api/products?limit=1000`).then((r) => r.json()),
    ])
      .then(([cats, subs, prods]) => {
        setState({
          categories: cats.data || [],
          subCategories: subs.data || [],
          products: prods.data || [],
          loading: false,
        });
      })
      .catch(() => setState((prev) => ({ ...prev, loading: false })));
  }, []);

  return <ShopContext.Provider value={state}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
