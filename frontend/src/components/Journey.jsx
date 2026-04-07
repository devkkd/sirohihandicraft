"use client";

import React from "react";

const journeyData = [
  {
    title: "1998 - The Beginning",
    desc: "Established With A Focus On Small-scale Wooden Work. Those Early Years Were About Learning Craftsmanship And Building A Strong Foundation In Quality.",
  },
  {
    title: "Early Years - Building Knowledge",
    desc: "We Worked Closely With Exporters, Supplying Products And Gaining A Deep Understanding Of International Standards, Finishing, And Buyer Expectations. That Experience Became The Backbone Of Everything We Do.",
  },
  {
    title: "Growth - Own Export Operations",
    desc: "With Time And Confidence, We Took The Next Step And Launched Our Own Export Operations - Serving Clients In The Usa, Europe, And The Gulf As A Direct Manufacturer And Exporter.",
  },
  {
    title: "Two Generations - Tradition Meets Market",
    desc: "Our Business Is Driven By Two Generations, Combining Traditional Skills With Modern Market Knowledge. This Balance Keeps Us Consistent In Quality While Staying Open To New Designs And Trends.",
  },
  {
    title: "Today - Trust, Experience, Partnerships",
    desc: "Our Growth Has Been Gradual But Strong - Built On Trust, Experience, And Long-term Relationships. We Believe In Delivering The Right Product, With The Right Quality, At The Right Time.",
  },
];

const Journey = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-[#FBF3E6]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-16 lg:mb-24">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#8c8273] uppercase mb-4 block">
            Our Journey
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#4a4238] tracking-tight">
            Built Over Two Generations of Honest Craft
          </h2>
        </div>

        {/* Timeline Section */}
        <div className="relative max-w-6xl">
          
          {/* Continuous Vertical Line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-[#d2c4b3]"></div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-16 lg:gap-20">
            {journeyData.map((item, index) => (
              <div key={index} className="relative flex flex-col md:flex-row pl-14 md:pl-20">
                
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#645643] z-10 border-[4px] border-[#FBF3E6]"></div>

                {/* Title Column */}
                <h3 className="w-full md:w-5/12 text-xl md:text-2xl font-bold text-[#2d2926] mb-3 md:mb-0 pr-0 md:pr-10 pt-0.5 leading-snug">
                  {item.title}
                </h3>

                {/* Description Column */}
                <p className="w-full md:w-7/12 text-sm md:text-[15px] text-[#4a4238] leading-relaxed font-medium">
                  {item.desc}
                </p>
                
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Journey;