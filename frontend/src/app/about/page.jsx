"use client";

import GetInTouch from "@/components/GetInTouch";
import Globe from "@/components/Globe";
import React from "react";

export default function AboutPage() {
    return (
        <main className="w-full bg-[#FFFDF9] min-h-screen pt-20 lg:pt-12 pb-24">

            {/* =========================================
          SECTION 1: HERO & ABOUT INFO
      ========================================= */}
            <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-24 lg:mb-16">

                {/* Header Content */}
                <div className="flex flex-col items-center text-center mb-14 lg:mb-20">
                    <span className="text-sm font-bold tracking-[0.15em] text-[#4a4238] uppercase mb-6">
                        About Us
                    </span>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#645643] tracking-tight mb-8">
                        SIROHI HANDICRAFTED
                    </h1>
                    <p className="text-sm md:text-[15px] text-gray-800 font-medium mb-8">
                        Manufacturer & Exporter · Est. 1998 · Rajasthan, India
                    </p>
                    <p className="text-sm md:text-[15px] text-gray-700 max-w-5xl leading-relaxed font-medium">
                        Sirohi Handicraft is a manufacturer and exporter of premium wooden and marble home décor and kitchenware — made for global brands, retailers, and buyers who care about quality.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left Column: Text Paragraphs */}
                    <div className="flex flex-col gap-8 text-[12px] lg:text-[15px] text-gray-800 leading-relaxed font-medium pr-0 lg:pr-8">
                        <p>
                            We Are Based In Jaipur Rajasthan A Region With A Long Tradition Of Skilled Artisan Work.
                        </p>
                        <p>
                            Since 1998, We Have Been Developing Products That Bring Together Natural Materials, Thoughtful Design, And The Kind Of Craftsmanship That Holds Up Under The Scrutiny Of International Buyers.
                        </p>
                        <p>
                            Our Work Sits At The Meeting Point Of Two Things That Are Difficult To Get Right At The Same Time: Consistent Quality And Genuine Craft.
                        </p>
                        <p>
                            We Have Spent Over Two Decades Getting That Balance Right, And It Shows In The Relationships We Have Built With Clients Across The Usa, Uk, Europe, And The Gulf Region.
                        </p>
                    </div>

                    {/* Right Column: Stats & Quote Card */}
                    <div className="bg-[#FBF3E6] rounded-[2rem] flex flex-col shadow-sm border border-[#f0ece1]">
                        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-between items-center px-8 lg:px-12 py-12 gap-y-8">
                            {/* Stats */}
                            <div className="flex flex-col items-center text-center w-full">
                                <span className="text-3xl lg:text-4xl font-extrabold text-black mb-2">25+</span>
                                <span className="text-[11px] lg:text-xs text-gray-700 font-medium">Years of Craft</span>
                            </div>
                            <div className="hidden sm:block w-px h-12 bg-[#e0dacd]"></div>

                            <div className="flex flex-col items-center text-center w-full">
                                <span className="text-3xl lg:text-4xl font-extrabold text-black mb-2">200+</span>
                                <span className="text-[11px] lg:text-xs text-gray-700 font-medium">Global Clients</span>
                            </div>
                            <div className="hidden sm:block w-px h-12 bg-[#e0dacd]"></div>

                            <div className="flex flex-col items-center text-center w-full">
                                <span className="text-3xl lg:text-4xl font-extrabold text-black mb-2">10+</span>
                                <span className="text-[11px] lg:text-xs text-gray-700 font-medium">Export Markets</span>
                            </div>
                            <div className="hidden sm:block w-px h-12 bg-[#e0dacd]"></div>

                            <div className="flex flex-col items-center text-center w-full">
                                <span className="text-3xl lg:text-4xl font-extrabold text-black mb-2">2</span>
                                <span className="text-[11px] lg:text-xs text-gray-700 font-medium">Generations</span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-[#e0dacd]"></div>

                        <div className="px-8 lg:px-16 py-14 text-center">
                            <h3 className="text-xl lg:text-[22px] font-bold text-[#111] leading-snug tracking-tight">
                                "We Don't Just Make Products, We Create Pieces That Add Value To Your Brand."
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
          SECTION 2: IMAGE MARQUEE
      ========================================= */}
            <section className="w-full mb-12 lg:mb-16 overflow-hidden">
              <div className="flex w-max animate-marquee">
                {/* Images duplicated for seamless loop */}
                {[
                  "/images/about/about1.jpg",
                  "/images/about/about2.jpg",
                  "/images/about/about3.jpg",
                  "/images/about/about1.jpg",
                  "/images/about/about2.jpg",
                  "/images/about/about3.jpg",
                ].map((src, i) => (
                  <div key={i} className="h-[250px] md:h-[380px] lg:h-[450px] w-[400px] md:w-[600px] lg:w-[750px] shrink-0 overflow-hidden">
                    <img src={src} alt={`Sirohi ${i}`} className="w-full h-full object-cover object-center" />
                  </div>
                ))}
              </div>
            </section>


            {/* =========================================
          SECTION 3: WHAT WE DO
      ========================================= */}
            <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12 lg:mb-16">
                {/* Changed to a 3-column grid on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 items-start">

                    {/* Left Text (Column 1) */}
                    <div className="flex flex-col md:col-span-2 lg:pr-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#5c4f3d] mb-8 lg:mb-10 tracking-tight">
                            What We Do
                        </h2>
                        <div className="flex flex-col gap-6 text-[13px] md:text-[15px] text-gray-800 leading-relaxed font-medium">
                            <p>
                                We manufacture and export two core material ranges wooden and marble
                                across a broad set of product categories including kitchenware, serveware,
                                home décor, bathroom accessories, and lifestyle pieces.
                            </p>
                            <p>
                                Every product we make is built for export.
                            </p>
                            <p>
                                That means consistent dimensions, reliable finishing, appropriate
                                packaging, and paperwork that clears customs without issues.
                            </p>
                            <p>
                                We work with brands who need their supplier to understand not just how to
                                make a product, but how to get it there in perfect condition.
                            </p>
                        </div>
                    </div>

                    {/* Wooden Range Card (Column 2) - Staggered down */}
                    <div className="bg-[#FBF3E6] rounded-[2rem] p-10 lg:p-12 w-full lg:mt-16 border border-[#f0ece1] shadow-sm">
                        <h3 className="text-2xl font-extrabold text-[#111] mb-6">Wooden Range</h3>
                        <p className="text-[13px] md:text-[14px] text-gray-800 leading-relaxed font-medium">
                            FSC-certified Acacia And Mango Wood. Chopping Boards, Serving Pieces, Trays,
                            Frames, Organizers, Furniture, And More Finished To Food-safe And Export Standards.
                        </p>
                    </div>

                    {/* Marble Range Card (Column 3) - Staggered further down */}
                    <div className="bg-[#FBF3E6] rounded-[2rem] p-10 lg:p-12 w-full lg:mt-40 border border-[#f0ece1] shadow-sm">
                        <h3 className="text-2xl font-extrabold text-[#111] mb-6">Marble Range</h3>
                        <p className="text-[13px] md:text-[14px] text-gray-800 leading-relaxed font-medium">
                            Natural White, Grey, And Green Marble. Bathroom Accessories, Kitchen Pieces,
                            Home Décor, And Gift Sets Polished And Packed For International Retail.
                        </p>
                    </div>

                </div>
            </section>


            {/* =========================================
          SECTION 4: OUR STRENGTHS
      ========================================= */}
            <section className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#5c4f3d] mb-6 tracking-tight">
                        Our Strengths
                    </h2>
                    <p className="text-sm md:text-[15px] text-gray-700 max-w-3xl font-medium">
                        Buyers Come To Us Because We Deliver On Three Things That Are Harder To Find Than They Should Be:
                    </p>
                </div>

                {/* Strengths Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1 */}
                    <div className="bg-transparent border border-[#d2c4b3] rounded-[2rem] p-8 md:p-10 flex flex-col hover:bg-[#FBF3E6] transition-colors duration-300">
                        <h3 className="text-xl font-bold text-[#111] mb-6">Craftsmanship</h3>
                        <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                            Every piece is made by skilled artisans with hands-on experience in wood and
                            stone. We don't outsource quality control to a checklist. Our team knows what a
                            good product looks and feels like.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-transparent border border-[#d2c4b3] rounded-[2rem] p-8 md:p-10 flex flex-col hover:bg-[#FBF3E6] transition-colors duration-300">
                        <h3 className="text-xl font-bold text-[#111] mb-6">Customisation</h3>
                        <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                            We work with buyers to develop products that suit their brand, not just pick from a
                            fixed catalogue. Size, finish, material variant, packaging all of it is open for
                            discussion.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-transparent border border-[#d2c4b3] rounded-[2rem] p-8 md:p-10 flex flex-col hover:bg-[#FBF3E6] transition-colors duration-300">
                        <h3 className="text-xl font-bold text-[#111] mb-6">Reliability</h3>
                        <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                            We know that late shipments and inconsistent quality are the two things
                            that end supplier relationships. We focus on getting lead times right and keeping
                            quality consistent across batches.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-transparent border border-[#d2c4b3] rounded-[2rem] p-8 md:p-10 flex flex-col hover:bg-[#FBF3E6] transition-colors duration-300">
                        <h3 className="text-xl font-bold text-[#111] mb-6">Export Knowledge</h3>
                        <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                            We understand what buyers in different markets need. From FSC documentation
                            for European retailers to specific finish requirements for US brands, we have
                            seen these requirements before and know how to meet them.
                        </p>
                    </div>

                </div>
            </section>
            <Globe/>
            <GetInTouch/>

        </main>
    );
}