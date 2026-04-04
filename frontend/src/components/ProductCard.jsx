import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const imageUrl =
    product?.image ||
    product?.images?.[0] ||
    "/images/placeholder.jpg";

  const productName = product?.name || "Product Name";
  const productSku = product?.sku || "SH-XXX-00-00";

  return (
    <Link href={`/product/${product._id}`} className="block">
      <div className="flex flex-col group cursor-pointer w-full">

        {/* IMAGE */}
        <div className="w-full aspect-square bg-[#f5f5f5] mb-5 overflow-hidden relative">
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* INFO */}
        <div className="flex items-start justify-between mb-5 px-1">
          <h3 className="text-[#4a4238] text-lg md:text-xl font-bold leading-tight pr-4">
            {productName}
          </h3>
          <span className="text-gray-800 text-sm md:text-base whitespace-nowrap pt-1">
            {productSku}
          </span>
        </div>

        {/* BUTTON */}
        <div>
          <button
            className="bg-[#645643] hover:bg-[#4d4233] text-white px-6 py-3 rounded-full text-xs md:text-sm font-semibold tracking-wide flex items-center gap-2 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault(); // 🚨 IMPORTANT: stop Link navigation
              e.stopPropagation();

              console.log("Request quote for:", productName);
            }}
          >
            REQUEST A QUOTE{" "}
            <FiArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;