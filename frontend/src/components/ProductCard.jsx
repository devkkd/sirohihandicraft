"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, items } = useCart();
  const isInCart = items.some((i) => i._id === product._id);

  const imageUrl = product?.thumbnail || product?.image || "/images/placeholder.jpg";
  const productName = product?.name || "Product Name";
  const productSku = product?.sku || "SH-XXX-00-00";

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) addToCart(product);
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
            onClick={handleAdd}
            disabled={isInCart}
            className={`flex items-center gap-1.5 px-3 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap ${
              isInCart
                ? "bg-[#f0ebe3] text-[#645643] cursor-default"
                : "bg-[#645643] hover:bg-[#4d4233] text-white"
            }`}
          >
            {isInCart ? <><FiCheck size={12} /> ADDED</> : <>ADD TO ENQUIRY <FiArrowRight size={12} strokeWidth={2.5} /></>}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
