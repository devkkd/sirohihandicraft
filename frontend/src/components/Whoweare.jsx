"use client";

import React from "react";

const Whoweare = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFFDF9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ================= LEFT COLUMN: TEXT CONTENT ================= */}
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-[0.15em] text-gray-500 uppercase mb-4 block">
              Who We Are
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#5c4f3d] leading-[1.15] mb-8 tracking-tight">
              More Than Products We Craft Value For Your Brand
            </h2>
            
            <div className="flex flex-col gap-6 text-sm md:text-[15px] text-gray-700 font-medium leading-relaxed mb-10">
              <p>
                Sirohi Handicraft is a manufacturer and exporter of high-quality wooden and
                marble home décor and kitchenware, crafted for global markets. We specialize in
                developing products that combine natural materials with refined design.
              </p>
              <p>
                Our strength lies in craftsmanship and customization. With a skilled team of
                artisans and a deep understanding of export requirements, every product reflects
                precision, consistency, and attention to detail.
              </p>
              <p>
                Working across the USA, Europe and the Gulf region, we've built our approach
                around long-term partnerships, transparent communication, and on-time delivery.
              </p>
            </div>

            {/* Certification Pills */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-[#FBF3E6] text-gray-800 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide flex items-center gap-2">
                <span>✓</span> SEDEX SEMETA
              </div>
              <div className="bg-[#FBF3E6] text-gray-800 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide flex items-center gap-2">
                <span>✓</span> FSC CERTIFIED
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: IMAGE & FLOATING CARD ================= */}
          <div className="relative w-full mt-8 lg:mt-0">
            {/* Main Image */}
            <div className="w-full h-[200px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="/images/home/homeA1.png" 
                alt="Sirohi Handicraft Exhibition Stand" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 lg:-bottom-12 lg:-left-12 bg-[#FBF3E6] p-8 md:p-10 rounded-3xl shadow-xl flex flex-col justify-center min-w-[200px] md:min-w-[240px]">
              <span className="text-4xl md:text-5xl font-extrabold text-[#4a4238] mb-2">
                25+
              </span>
              <span className="text-sm md:text-base text-[#4a4238] font-medium leading-snug">
                Years of <br /> Craftsmanship
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Whoweare;