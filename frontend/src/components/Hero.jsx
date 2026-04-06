"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const cards = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <main className="relative bg-[#FFFDF9] overflow-hidden pt-40 lg:pt-64 pb-[150px] lg:pb-[250px]"
      style={{ perspective: "1000px" }}>

      {/* CENTER WRAPPER */}
      <div className="relative w-full flex items-center justify-center">

        {/* ROTATING RING */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {cards.map((num, i) => (
            <div
              key={num}
              className="absolute origin-center [transform-style:preserve-3d] [--radius:340px] lg:[--radius:500px]"
              style={{
                "--count": i,
                animation: mounted ? "rotY 8s linear infinite" : "none",
                animationDelay: `${0.3 * i}s`,
                transform: `translateZ(0)`,   // 👈 ADD THIS
                willChange: "transform"       // 👈 ADD THIS
              }}
            >
              <div className="relative w-[80px] h-[120px] lg:w-[160px] lg:h-[220px] [transform-style:preserve-3d]">

                {/* FRONT */}
                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[2rem] overflow-hidden shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)]"
                  style={{
                    transform: "rotateZ(calc(-30deg * var(--count)))"
                  }}
                >
                  <img
                    src={`/images/Hero/Hero${num}.png`}
                    alt={`Hero ${num}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[2rem] overflow-hidden shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] bg-[#615236] flex items-center justify-center"
                  style={{
                    transform: "rotateY(180deg) rotateZ(calc(-30deg * var(--count)))"
                  }}
                >
                  <img
                    src="/images/icons/SirohiIcon.svg"
                    alt="Logo"
                    className="w-12 h-12 opacity-50 filter invert"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CENTER CONTENT */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 py-12 bg-[#FFFDF9]/90 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none rounded-3xl">

          <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#8c8273] mb-6 uppercase">
            Est. 1998 • Rajasthan, India
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold text-[#5c4f3d] mb-6 leading-[1.1] tracking-tight">
            Crafted by Hand, <br className="hidden md:block" /> Built for the World
          </h1>

          <p className="text-sm md:text-[15px] text-[#6b6154] max-w-2xl mb-10 leading-relaxed font-medium">
            Manufacturer And Exporter Of Premium Wooden And Marble Home Décor And
            Kitchenware Made For Global Brands And Retailers Across The Usa, Europe, And The Gulf.
          </p>

          <button className="bg-[#645643] hover:bg-[#4d4233] text-white px-8 py-3.5 rounded-full text-xs md:text-sm font-bold tracking-widest flex items-center gap-3 transition-all duration-300 shadow-xl mb-14">
            REQUEST A QUOTE <FiArrowRight size={16} strokeWidth={2.5} />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-14 border-t border-[#e0dacd] pt-10 mb-10 w-full max-w-3xl">

            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-2xl md:text-4xl font-extrabold text-black mb-1">25+</span>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">
                Years of Craft
              </span>
            </div>

            <div className="hidden md:block w-px h-12 bg-[#e0dacd]" />

            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-2xl md:text-4xl font-extrabold text-black mb-1">200+</span>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">
                Global Clients
              </span>
            </div>

            <div className="hidden md:block w-px h-12 bg-[#e0dacd]" />

            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-2xl md:text-4xl font-extrabold text-black mb-1">10+</span>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">
                Export Markets
              </span>
            </div>

          </div>

          <div className="mt-4">
            <img
              src="/images/icons/SirohiIcon.svg"
              alt="Leaf Icon"
              className="w-16 md:w-20 h-auto opacity-90"
            />
          </div>

        </div>

      </div>
    </main>
  );
};

export default Hero;