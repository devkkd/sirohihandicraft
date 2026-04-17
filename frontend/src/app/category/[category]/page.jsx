"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import { FiArrowRight } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com";
const LIMIT = 20;

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categorySlug = params?.category;
  const subSlug = searchParams.get("sub");

  const { categories, subCategories, loading: contextLoading } = useShop();

  const [activeSub, setActiveSub] = useState(subSlug || "all");
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const currentCategory = categories.find((c) => c.slug === categorySlug);
  const relatedSubcategories = currentCategory
    ? subCategories.filter((s) => (s.category?._id || s.category) === currentCategory._id)
    : [];

  // Sync activeSub with URL - but only after subcategories are loaded
  useEffect(() => {
    if (relatedSubcategories.length === 0) return;
    if (subSlug) {
      const exists = relatedSubcategories.find((s) => s.slug === subSlug);
      setActiveSub(exists ? subSlug : "all");
    } else {
      setActiveSub("all");
    }
  }, [subSlug, relatedSubcategories.length]);

  // Fetch products - depends on currentCategory AND activeSub being in sync
  useEffect(() => {
    if (!currentCategory?._id) return;
    // Wait for subcategories to load before fetching with subCategory filter
    if (subSlug && relatedSubcategories.length === 0) return;

    setProducts([]);
    setPage(1);
    setHasMore(false);
    setProductsLoading(true);

    const activeSubObj = relatedSubcategories.find((s) => s.slug === activeSub);
    const subQuery = activeSubObj ? `&subCategory=${activeSubObj._id}` : "";

    fetch(`${API_URL}/api/products?category=${currentCategory._id}${subQuery}&page=1&limit=${LIMIT}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.data || []);
        setHasMore((data.pagination?.page || 1) < (data.pagination?.pages || 1));
      })
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, [currentCategory?._id, activeSub, relatedSubcategories.length]);

  const loadMore = async () => {
    if (loadingMore || !currentCategory?._id) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    const activeSubObj = relatedSubcategories.find((s) => s.slug === activeSub);
    const subQuery = activeSubObj ? `&subCategory=${activeSubObj._id}` : "";

    try {
      const res = await fetch(`${API_URL}/api/products?category=${currentCategory._id}${subQuery}&page=${nextPage}&limit=${LIMIT}`);
      const data = await res.json();
      setProducts((prev) => [...prev, ...(data.data || [])]);
      setPage(nextPage);
      setHasMore(nextPage < (data.pagination?.pages || 1));
    } catch {}
    setLoadingMore(false);
  };

  const handleTabClick = (slug) => {
    setActiveSub(slug);
    if (slug === "all") router.push(`/category/${categorySlug}`, { scroll: false });
    else router.push(`/category/${categorySlug}?sub=${slug}`, { scroll: false });
  };

  if (contextLoading) {
    return (
      <main className="w-full bg-[#FFFDF9] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!currentCategory) {
    return (
      <main className="w-full bg-[#FFFDF9] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#615236] font-bold mb-2">Category Not Found</h2>
          <p className="text-gray-500">The category you are looking for does not exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-16 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        {/* ================= HEADER SECTION ================= */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#645643] mb-6 tracking-wide uppercase text-center">
          {currentCategory.title}
        </h1>
        <p className="text-center text-sm md:text-base text-gray-700 max-w-4xl mb-14 leading-relaxed">
          {currentCategory.description}
        </p>

        {/* Tabs */}
        <div className="w-full flex flex-wrap justify-center gap-x-6 gap-y-4 border-b border-gray-300 pb-0 mb-14">
          <button onClick={() => handleTabClick("all")}
            className={`text-sm font-medium pb-3 px-2 transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeSub === "all" ? "text-[#111111] border-[#111111] font-bold" : "text-gray-500 border-transparent hover:text-[#645643]"
            }`}>
            All
          </button>
          {relatedSubcategories.map((sub) => (
            <button key={sub._id} onClick={() => handleTabClick(sub.slug)}
              className={`text-sm font-medium pb-3 px-2 transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeSub === sub.slug ? "text-[#111111] border-[#111111] font-bold" : "text-gray-500 border-transparent hover:text-[#645643]"
              }`}>
              {sub.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="w-full flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 items-stretch">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <p className="text-gray-500 text-lg">No products available in this subcategory yet.</p>
                  <button onClick={() => handleTabClick("all")}
                    className="mt-4 text-[#645643] font-semibold underline hover:text-black transition-colors">
                    View all {currentCategory.title} products
                  </button>
                </div>
              )}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-16 flex flex-col items-center gap-3">
                {/* <p className="text-xs text-[#9e8f7e] tracking-widest uppercase">
                  Showing {products.length} products
                </p> */}
                <button onClick={loadMore} disabled={loadingMore}
                  className="flex items-center gap-2 bg-[#645643] hover:bg-[#4d4233] text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-60">
                  {loadingMore
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><FiArrowRight size={14} /> LOAD MORE</>}
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}
