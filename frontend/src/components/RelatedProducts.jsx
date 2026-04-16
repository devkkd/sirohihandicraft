"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com";

const RelatedProducts = ({ currentProductId, subCategoryId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!subCategoryId) return;
    fetch(`${API_URL}/api/products?subCategory=${subCategoryId}&limit=5`)
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data.data || [])
          .filter((p) => p._id !== currentProductId)
          .slice(0, 4);
        setRelated(filtered);
      })
      .catch(() => {});
  }, [subCategoryId, currentProductId]);

  if (related.length === 0) return null;

  return (
    <div className="w-full mt-24 lg:mt-32 border-t border-[#e0dacd] pt-16 lg:pt-24">
      <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-[#4a4238] text-center mb-12 lg:mb-16 tracking-tight">
        Products You'll Love
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {related.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
