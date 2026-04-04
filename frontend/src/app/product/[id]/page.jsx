"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id;

  // Mock data state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate an API call to fetch product details based on the ID
  useEffect(() => {
    // Replace this setTimeout with your actual fetch call later
    // e.g., fetch(`/api/products/${productId}`).then(...)
    setTimeout(() => {
      setProduct({
        id: productId,
        name: "Chopping Boards",
        sku: "SH-CBW-26-38",
        specs: {
          "Material": "Wood (FSC Certified)",
          "Finish": "Natural Food-Safe Oil",
          "MOQ": "20 pcs",
        },
        image: "/images/placeholder1.jpg", // Make sure you have a placeholder image here
      });
      setLoading(false);
    }, 500);
  }, [productId]);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <main className="w-full bg-[#FFFDF9] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#645643]"></div>
      </main>
    );
  }

  /* ================= NOT FOUND STATE ================= */
  if (!product) {
    return (
      <main className="w-full bg-[#FFFDF9] min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600 font-bold">Product not found</h1>
      </main>
    );
  }

  /* ================= RENDER ================= */
  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-10 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Product Image */}
          <div className="w-full bg-[#f5f5f5] rounded-sm overflow-hidden relative aspect-[4/3] lg:aspect-[5/4]">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col py-4 lg:py-8">
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#4a4238] mb-6 tracking-tight">
              {product.name}
            </h1>
            
            {/* SKU */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-12">
              {product.sku}
            </h2>

            {/* Specifications List */}
            <div className="flex flex-col gap-6 mb-16">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="text-base md:text-lg text-gray-800 font-medium">
                  {key} : {value}
                </div>
              ))}
            </div>

            {/* Call to Action Button */}
            <button 
              className="bg-[#645643] hover:bg-[#4d4233] text-white px-8 py-4 rounded-full text-xs md:text-sm font-bold tracking-widest flex items-center justify-center gap-3 w-max transition-colors shadow-sm"
              onClick={() => console.log("Request quote for", product.name)}
            >
              REQUEST A QUOTE <FiArrowRight size={18} strokeWidth={2.5} />
            </button>

            {/* Helper Text */}
            <p className="mt-8 text-sm md:text-[15px] text-gray-900 font-medium">
              Contact Our Team For Pricing, Samples, And Bulk Orders
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}