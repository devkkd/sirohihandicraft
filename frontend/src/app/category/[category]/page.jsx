"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Categories from "@/data/Categories";
import SubCategories from "@/data/SubCategories";
import Products from "@/data/Products"; // <-- Import the new data file
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract slugs from URL
  const categorySlug = params?.category;
  const subSlug = searchParams.get("sub");

  const [activeSub, setActiveSub] = useState("all");

  // 1. Get current category data
  const currentCategory = Categories.find((c) => c.slug === categorySlug);

  // 2. Get related subcategories
  const relatedSubcategories = currentCategory
    ? SubCategories.filter((s) => s.categoryId === currentCategory.id)
    : [];

  // Sync active tab state with the URL query parameter
  useEffect(() => {
    if (subSlug) {
      const subExists = relatedSubcategories.find((s) => s.slug === subSlug);
      if (subExists) setActiveSub(subExists.slug);
    } else {
      setActiveSub("all");
    }
  }, [subSlug, relatedSubcategories]);

  // Handle Tab Navigation
  const handleTabClick = (slug) => {
    setActiveSub(slug);
    if (slug === "all") {
      router.push(`/category/${categorySlug}`, { scroll: false });
    } else {
      router.push(`/category/${categorySlug}?sub=${slug}`, { scroll: false });
    }
  };

  // 404 State
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

  // --- FILTER PRODUCTS FROM THE IMPORTED DATA FILE ---
  // 1st pass: Only show products belonging to the current main category (Wooden vs Marble)
  const categoryProducts = Products.filter(
    (p) => p.categoryId === currentCategory.id
  );

  // 2nd pass: Filter by the active subcategory tab
  const displayedProducts = activeSub === "all" 
    ? categoryProducts 
    : categoryProducts.filter((p) => p.subcategorySlug === activeSub);

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

        {/* ================= TABS SECTION ================= */}
        <div className="w-full flex flex-wrap justify-center gap-x-6 gap-y-4 border-b border-gray-300 pb-0 mb-14">
          
          {/* "ALL" Tab */}
          <button
            onClick={() => handleTabClick("all")}
            className={`text-sm font-medium pb-3 px-2 transition-all duration-200 border-b-2 whitespace-nowrap
              ${
                activeSub === "all"
                  ? "text-[#111111] border-[#111111] font-bold"
                  : "text-gray-500 border-transparent hover:text-[#645643]"
              }
            `}
          >
            All
          </button>

          {/* Dynamic Subcategory Tabs */}
          {relatedSubcategories.map((sub) => (
            <button
              key={sub._id}
              onClick={() => handleTabClick(sub.slug)}
              className={`text-sm font-medium pb-3 px-2 transition-all duration-200 border-b-2 whitespace-nowrap
                ${
                  activeSub === sub.slug
                    ? "text-[#111111] border-[#111111] font-bold"
                    : "text-gray-500 border-transparent hover:text-[#645643]"
                }
              `}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
              <p className="text-gray-500 text-lg">No products available in this specific subcategory yet.</p>
              <button 
                onClick={() => handleTabClick("all")}
                className="mt-4 text-[#645643] font-semibold underline hover:text-black transition-colors"
              >
                View all {currentCategory.title} products
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}