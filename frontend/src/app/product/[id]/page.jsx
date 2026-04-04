"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import Products from "@/data/Products"; // Importing real data
import RelatedProducts from "@/components/RelatedProducts"; // Importing new component
import Globe from "@/components/Globe";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params?.id, 10); // Convert URL string to number

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details from the local data file
  useEffect(() => {
    const foundProduct = Products.find((p) => p._id === productId);
    setProduct(foundProduct || null);
    setLoading(false);
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
        <div className="text-center">
          <h1 className="text-2xl text-[#645643] font-bold mb-2">Product not found</h1>
          <p className="text-gray-500">We couldn't find the product you're looking for.</p>
        </div>
      </main>
    );
  }

  /* ================= RENDER ================= */
  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-10 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ================= TOP PRODUCT SECTION ================= */}
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
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
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

        {/* ================= RELATED PRODUCTS COMPONENT ================= */}
        <RelatedProducts 
          currentProductId={product._id} 
          subcategorySlug={product.subcategorySlug} 
        />
        <Globe/>

      </div>
    </main>
  );
}