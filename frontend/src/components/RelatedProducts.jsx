"use client";

import React from "react";
import Products from "@/data/Products";
import ProductCard from "@/components/ProductCard";

const RelatedProducts = ({ currentProductId, subcategorySlug }) => {
  // Filter products by the same subcategory, excluding the current product
  const related = Products.filter(
    (p) => p.subcategorySlug === subcategorySlug && p._id !== currentProductId
  ).slice(0, 3); // Display up to 3 products to match your design image

  // If no related products exist, don't render the section
  if (related.length === 0) return null;

  return (
    <div className="w-full mt-24 lg:mt-32 border-t border-[#e0dacd] pt-16 lg:pt-24">
      <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-[#4a4238] text-center mb-12 lg:mb-16 tracking-tight">
        Products You’ll Love
      </h2>
      
      {/* 3-column grid matching your reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {related.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;