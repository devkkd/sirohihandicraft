"use client";

import React from "react";

const exportRegions = [
  {
    id: 1,
    image: "/images/home/maps1.svg",
    flag: "🇺🇸",
    title: "United States",
    desc: "Home Décor Retailers, Kitchenware Brands, Lifestyle Stores",
  },
  {
    id: 2,
    image: "/images/home/maps2.svg",
    flag: "🇬🇧",
    title: "United Kingdom & Europe",
    desc: "Premium Homeware Importers And Design-led Brands",
  },
  {
    id: 3,
    image: "/images/home/maps3.svg",
    flag: "🇦🇪",
    title: "Gulf Region",
    desc: "UAE, Qatar, Kuwait - Luxury Gifting And Retail",
  },
  {
    id: 4,
    image: "/images/home/maps4.svg",
    flag: "🇦🇺",
    title: "Australia & Canada",
    desc: "Wholesale And Private Label Partnerships",
  },
];

const Globe = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-[#FFFDF9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-16 lg:mb-24 text-left">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#8c8273] uppercase mb-4 block">
            Where We Export
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#4a4238] tracking-tight">
            Trusted By Brands Across The Globe
          </h2>
        </div>

        {/* Export Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {exportRegions.map((region) => (
            <div key={region.id} className="flex flex-col items-center text-center">
              
              {/* Map Image Container */}
              <div className="h-40 md:h-48 w-full flex items-center justify-center mb-8">
                <img
                  src={region.image}
                  alt={`${region.title} Map`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Region Title with Flag */}
              <h3 className="text-lg md:text-xl font-extrabold text-[#2d2926] mb-4 flex items-center justify-center gap-2">
                <span>{region.flag}</span> {region.title}
              </h3>

              {/* Region Description */}
              <p className="text-sm md:text-[14px] text-[#6b6154] leading-relaxed font-medium px-2 md:px-4">
                {region.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Globe;