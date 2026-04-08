"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FiArrowRight, FiCheck, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import RelatedProducts from "@/components/RelatedProducts";
import Globe from "@/components/Globe";
import { useCart } from "@/context/CartContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProductDetailPage() {
  const params = useParams();
  const productSlug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [added, setAdded] = useState(false);

  const { addToCart, items } = useCart();

  useEffect(() => {
    if (!productSlug) return;
    fetch(`${API_URL}/api/products/slug/${productSlug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.data || null);
        setActiveImage(data.data?.thumbnail || data.data?.gallery?.[0] || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [productSlug]);

  const isInCart = items.some((i) => i._id === product?._id);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <main className="w-full bg-[#FFFDF9] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#645643]" />
      </main>
    );
  }

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

  const allImages = [
    ...(product.thumbnail ? [product.thumbnail] : []),
    ...(product.gallery || []),
  ].filter(Boolean);

  const specs = [
    { label: "Material", value: product.material },
    { label: "Finish", value: product.finish },
  ].filter((s) => s.value);

  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-10 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Images */}
          <div className="flex flex-col gap-4">
            <div className="w-full bg-[#f5f5f5] rounded-sm overflow-hidden aspect-[4/3] lg:aspect-[5/4]">
              <img
                src={activeImage || "/images/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? "border-[#645643]" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col py-4 lg:py-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#4a4238] mb-3 tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm font-mono text-gray-500 mb-1">{product.sku}</p>
            <p className="text-sm text-[#645643] font-semibold mb-8">MOQ: {product.moq}</p>

            {product.description && (
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {specs.length > 0 && (
              <div className="flex flex-col gap-3 mb-10">
                {specs.map(({ label, value }) => (
                  <div key={label} className="text-sm text-gray-700">
                    <span className="font-semibold">{label}:</span> {value}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold tracking-widest transition-all ${
                  isInCart ? "bg-[#f0ebe3] text-[#645643] cursor-default" : "bg-[#645643] hover:bg-[#4d4233] text-white"
                }`}
                disabled={isInCart}>
                {isInCart ? <><FiCheck size={16} /> ADDED TO ENQUIRY</> : <><FiShoppingBag size={16} /> ADD TO ENQUIRY</>}
              </button>

              {isInCart && (
                <Link href="/cart"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold tracking-widest bg-[#645643] hover:bg-[#4d4233] text-white transition-all">
                  VIEW ENQUIRY <FiArrowRight size={16} />
                </Link>
              )}
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Contact our team for pricing, samples, and bulk orders
            </p>
          </div>
        </div>

        <RelatedProducts
          currentProductId={product._id}
          subCategoryId={product.subCategory?._id || product.subCategory}
        />
        <Globe />
      </div>
    </main>
  );
}
