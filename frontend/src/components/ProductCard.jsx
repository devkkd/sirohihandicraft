"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiTrash2 } from "react-icons/fi"; // Swapped FiCheck for FiTrash2
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  // 1. Extracted removeFromCart from your context
  const { addToCart, removeFromCart, items } = useCart();
  const isInCart = items.some((i) => i._id === product._id);

  const imageUrl = product?.thumbnail || product?.image || "/images/placeholder.jpg";
  const productName = product?.name || "Product Name";
  const productSku = product?.sku || "SH-XXX-00-00";

  // 2. Updated handler to toggle add/remove
  const handleCartAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(product._id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="flex flex-col h-full group w-full">

      {/* IMAGE */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="w-full aspect-square bg-[#f5f5f5] mb-3 md:mb-5 overflow-hidden">
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
      </Link>

      {/* INFO - flex-1 so it pushes button to bottom */}
      <div className="flex flex-col flex-1 px-1">
        <div className="items-start justify-between mb-2 md:mb-4 flex-1">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-[#4a4238] text-sm md:text-md font-bold leading-tight pr-2 hover:text-[#615236] transition-colors line-clamp-2">
              {productName}
            </h3>
          </Link>
          <span className="text-gray-500 text-[9px] md:text-[13px] whitespace-nowrap pt-0.5 block">
            {productSku}
          </span>
        </div>

        {/* BUTTON always at bottom */}
        <div className="mt-2 md:mt-3">
          <button
            onClick={handleCartAction}
            // 3. Removed the disabled attribute so it can be clicked to remove
            className={`flex items-center gap-1.5 px-3 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap ${
              isInCart
                ? "bg-[#f0ebe3] hover:bg-[#e6ddcf] text-[#645643]" // Maintained your beige/brown theme
                : "bg-[#645643] hover:bg-[#4d4233] text-white"
            }`}
          >
            {isInCart ? (
              <>REMOVE <FiTrash2 size={12} /></> 
            ) : (
              <>ADD TO ENQUIRY <FiArrowRight size={12} strokeWidth={2.5} /></>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;