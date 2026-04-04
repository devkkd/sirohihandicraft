"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Categories from "@/data/Categories";
import SubCategories from "@/data/SubCategories";

const WhatWeMake = () => {
  return (
    <section className="w-full py-20 bg-[#FFFDF9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Global Section Header */}
        <div className="mb-16">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-gray-500 uppercase mb-4 block">
            What We Make
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#4a4238]">
            Product Categories
          </h2>
        </div>

        {/* Map through each Main Category */}
        {Categories.map((category, index) => {
          // Get subcategories that belong to this category
          const categorySubs = SubCategories.filter(
            (sub) => sub.categoryId === category.id
          );

          return (
            <div 
              key={category.id} 
              className={index !== Categories.length - 1 ? "mb-28" : ""}
            >
              
              {/* Category Header Row (Title Left, Desc Right) */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
                <h3 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#4a4238] tracking-tight capitalize">
                  {category.title}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-700 max-w-2xl leading-relaxed font-medium pb-1 lg:pb-2">
                  {category.description}
                </p>
              </div>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                {categorySubs.map((sub) => (
                  <div key={sub._id} className="group flex flex-col">
                    
                    {/* Subcategory Image */}
                    <Link 
                      href={`/category/${category.slug}?sub=${sub.slug}`}
                      className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-5 bg-[#f5f5f5] block"
                    >
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                    </Link>

                    {/* Subcategory Info Row */}
                    <div className="flex items-center justify-between px-1">
                      <Link 
                        href={`/category/${category.slug}?sub=${sub.slug}`}
                        className="text-lg md:text-xl font-bold text-[#4a4238] group-hover:text-[#615236] transition-colors"
                      >
                        {sub.name}
                      </Link>
                      
                      <Link 
                        href={`/category/${category.slug}?sub=${sub.slug}`}
                        className="flex items-center gap-1 text-[11px] md:text-xs font-semibold text-gray-600 uppercase tracking-widest hover:text-[#615236] transition-colors whitespace-nowrap"
                      >
                        Explore <FiArrowRight size={14} />
                      </Link>
                    </div>

                  </div>
                ))}
              </div>

              {/* Bottom "See All" Link */}
              <div className="mt-16 flex items-center justify-center">
                <Link
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-2 text-sm font-bold text-[#4a4238] border-b-[1.5px] border-[#4a4238] pb-1 hover:text-[#615236] hover:border-[#615236] transition-all tracking-wide"
                >
                  See All {category.title} Products <FiArrowRight size={16} />
                </Link>
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
};

export default WhatWeMake;