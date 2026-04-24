"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useShop } from "@/context/ShopContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com";
const LIMIT = 10;

export default function CollectionsClient({ subCategories, initialProducts, totalPages, total }) {
  const { categories } = useShop();
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalPages > 1);

  // Group products by subcategory
  const grouped = {};
  products.forEach((p) => {
    const subId = p.subCategory?._id || p.subCategory || "uncategorized";
    if (!grouped[subId]) grouped[subId] = [];
    grouped[subId].push(p);
  });

  const getSubName = (subId) => {
    const sub = subCategories.find((s) => s._id === subId);
    return sub?.name || "Other";
  };

  const getCatSlug = (subId) => {
    const sub = subCategories.find((s) => s._id === subId);
    const catId = sub?.category?._id || sub?.category;
    const cat = categories.find((c) => c._id === catId);
    return cat?.slug || "";
  };

  const getSubSlug = (subId) => {
    const sub = subCategories.find((s) => s._id === subId);
    return sub?.slug || "";
  };

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API_URL}/api/products?page=${nextPage}&limit=${LIMIT}`);
      const data = await res.json();
      setProducts((prev) => [...prev, ...(data.data || [])]);
      setPage(nextPage);
      setHasMore(nextPage < (data.pagination?.pages || 1));
    } catch {}
    setLoading(false);
  };

  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-12 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#8c8273] uppercase mb-4">
            All Collections
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#4a4238] tracking-tight mb-6">
            Our All Collection of Products
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Explore our complete range of handcrafted products. Thoughtfully designed for buyers with many tastes and styles. From unique handcrafted to commercial pieces, discover quality, craftsmanship, and the SKU in one place.
          </p>
        </div>

        {/* Grouped by subcategory */}
        <div className="flex flex-col gap-16">
          {Object.entries(grouped).map(([subId, prods]) => (
            <div key={subId}>
              {/* Section header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#e0dacd]">
                <h2 className="text-sm font-bold text-[#3b2f1e] uppercase tracking-widest">
                  {getSubName(subId)}
                </h2>
                <img src="/images/icons/SirohiIcon.svg" alt="Sirohi" className="h-8 w-auto opacity-60" />
              </div>

              {/* Product grid - 4 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {prods.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug}`}
                    className="flex flex-col gap-2 group"
                  >
                    <div className="aspect-square bg-[#f5f5f5] overflow-hidden">
                      <img
                        src={product.thumbnail || "/images/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex flex-col items-center gap-3 mt-16">
            <p className="text-xs text-[#9e8f7e] tracking-widest uppercase">
              Showing {products.length} of {total} products
            </p>
            <button
              onClick={loadMore}
              disabled={loading}
              className="flex items-center gap-2 bg-[#645643] hover:bg-[#4d4233] text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-60"
            >
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><FiArrowRight size={14} /> LOAD MORE</>}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
