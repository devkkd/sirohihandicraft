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
        <div className="w-full aspect-square bg-[#f5f5f5] mb-5 overflow-hidden">
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
      </Link>

      {/* INFO - flex-1 so it pushes button to bottom */}
      <div className="flex flex-col flex-1 px-1">
        <div className=" items-start justify-between mb-4 flex-1">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-[#4a4238] text-lg md:text-xl font-bold leading-tight pr-4 hover:text-[#615236] transition-colors">
              {productName}
            </h3>
          </Link>
          <span className="text-gray-800 text-sm md:text-base whitespace-nowrap pt-1">
            {productSku}
          </span>
        </div>

        {/* BUTTON always at bottom */}
        <div>
          <button
            onClick={handleAdd}
            disabled={isInCart}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 ${
              isInCart
                ? "bg-[#f0ebe3] text-[#645643] cursor-default"
                : "bg-[#645643] hover:bg-[#4d4233] text-white"
            }`}
          >
            {isInCart ? <><FiCheck size={14} /> ADDED TO ENQUIRY</> : <>ADD TO ENQUIRY <FiArrowRight size={14} strokeWidth={2.5} /></>}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
