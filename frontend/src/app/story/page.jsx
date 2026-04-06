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

export default function StoryPage() {
  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-10 lg:pt-14">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center mb-24 lg:mb-32">
          <span className="text-sm font-bold tracking-[0.15em] text-[#4a4238] uppercase mb-6">
            OUR STORY
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#5c4f3d] tracking-tight mb-10">
            Built Slowly, Built to Last
          </h1>
          <div className="flex flex-col gap-6 text-sm md:text-[15px] text-gray-800 font-medium max-w-4xl leading-relaxed">
            <p>
              Our Story Is Not A Dramatic One. There Was No Single Breakthrough Moment No Overnight Success. It's A Story Of Learning, Building Slowly, And Making Sure That Every Step Was On Solid Ground.
            </p>
            <p>
              That Approach Has Served Us Well. Twenty-five Years In, We Have A Business Built On Real Craft, Real Relationships, And A Reputation That Took Time To Earn And Care To Keep.
            </p>
          </div>
        </div>


        {/* ================= WHERE IT STARTED ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 lg:mb-40">
          
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#5c4f3d] mb-10 tracking-tight">
              Where It Started
            </h2>
            <div className="flex flex-col gap-8 text-[14px] md:text-[15px] text-gray-800 leading-relaxed font-medium">
              <p>
                Sirohi Handicraft was founded in 1998 in Jaipur, Rajasthan a part of India
                where working with natural materials is not a marketing story, it's simply
                what people do.
              </p>
              <p>
                The region has a long history of stone and craft work, and that environment
                shaped how we approached the business from the beginning.
                We started small.
              </p>
              <p>
                The first years were focused entirely on wooden work learning the material,
                understanding what quality looked like, and building the foundations of a
                production process that could be trusted. It was slow, deliberate work. We
                weren't trying to grow fast. We were trying to get it right.
              </p>
            </div>
          </div>

          <div className="bg-[#FBF3E6] rounded-[2rem] p-10 md:p-14 lg:p-20 flex items-center justify-center text-center shadow-sm h-full">
            <h3 className="text-xl md:text-[22px] font-bold text-[#111] leading-snug tracking-tight">
              "In Those Early Years, We Didn't Have Clients In Ten Countries. We Had The Chance To Learn, And We Made Sure We Didn't Waste It."
            </h3>
          </div>

        </div>


        {/* ================= LEARNING THE EXPORT WORLD ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 lg:mb-40">
          
          {/* Image Placeholder (Left) */}
          <div className="w-full aspect-[4/3] lg:aspect-square bg-[#595246] rounded-md order-2 lg:order-1 h-[250px] lg:h-[500px]"></div>

          {/* Text (Right - Right Aligned on Desktop) */}
          <div className="flex flex-col lg:text-right order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#5c4f3d] mb-10 tracking-tight">
              Learning the Export World
            </h2>
            <div className="flex flex-col gap-8 text-[14px] md:text-[15px] text-gray-800 leading-relaxed font-medium">
              <p>
                Before we became an exporter ourselves, we worked as suppliers to exporters. That period working inside the supply chain rather than at the front of it taught us more than any business course could have.
              </p>
              <p>
                We saw first-hand what international buyers needed. We learned what 'export quality' actually meant in practice not just the finishing on the product itself, but the consistency across a batch, the packaging that survives a long container journey, the documentation that moves through customs without being flagged.
              </p>
              <p>
                We also learned what went wrong. Missed shipments. Inconsistent finishing. Communication that broke down between order and delivery. We watched those problems damage relationships that had taken years to build, and we stored that knowledge carefully. By the time we decided to start our own export operations, we weren't guessing at what buyers needed. We knew.
              </p>
            </div>
          </div>

        </div>


        {/* ================= BUILDING OUR OWN EXPORT OPERATIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 lg:mb-40">
          
          {/* Text (Left) */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#5c4f3d] mb-10 tracking-tight leading-[1.1]">
              Building Our Own Export Operations
            </h2>
            <div className="flex flex-col gap-8 text-[14px] md:text-[15px] text-gray-800 leading-relaxed font-medium">
              <p>
                Moving from supplier to exporter was the most important step in our history. It meant taking on more responsibility, more risk, and more of the relationship with the buyer. We approached it the same way we'd approached everything else carefully.
              </p>
              <p>
                We started with the markets and product types we understood best, kept our commitments modest until we had the process right, and only grew when we were confident we could maintain the quality.
              </p>
              <p>
                The early export years were not without problems.
              </p>
              <p>
                There were shipments that didn't go as planned, development rounds that took longer than expected, and moments when we had to be honest with a buyer about a delay rather than pretend everything was fine. Those moments, handled with transparency, are what built the trust that our business rests on today.
              </p>
            </div>
          </div>

          {/* Image Placeholder (Right) */}
          <div className="w-full aspect-[4/3] lg:aspect-[4/5] h-[250px] lg:h-[500px] bg-[#595246] rounded-md"></div>

        </div>


        {/* ================= CENTER QUOTE BANNER ================= */}
        <div className="w-full bg-[#FBF3E6] rounded-[2rem] p-10 md:p-16 lg:p-20 flex items-center justify-center text-center shadow-sm mb-24 lg:mb-40">
          <h3 className="text-lg md:text-xl lg:text-[22px] font-bold text-[#111] leading-snug tracking-tight max-w-4xl">
            "We have never promised something we couldn't deliver. That sounds simple. In practice, it's the hardest discipline to maintain when business is growing and the temptation is to say yes to everything."
          </h3>
        </div>


        {/* ================= TWO GENERATIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 lg:mb-48">
          
          {/* Image Placeholder (Left) */}
          <div className="w-full aspect-[4/3] lg:aspect-square bg-[#595246] rounded-md order-2 lg:order-1 h-[250px] lg:h-[500px]"></div>

          {/* Text (Right - Right Aligned on Desktop) */}
          <div className="flex flex-col lg:text-right order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#5c4f3d] mb-10 tracking-tight">
              Two Generations
            </h2>
            <div className="flex flex-col gap-8 text-[14px] md:text-[15px] text-gray-800 leading-relaxed font-medium">
              <p>
                The most significant development in our recent history has been the involvement of the second generation in the business. That transition brought something valuable: a combination of craft knowledge that only comes from growing up around this work, and a direct understanding of modern international markets.
              </p>
              <p>
                The first generation built the craft foundation the relationships with artisans, the understanding of materials, the discipline around quality. The second generation brought a sharper eye on product design, an understanding of how international buyers discover and evaluate suppliers, and the energy to push the business into new product categories.
              </p>
              <p>
                Between the two, we cover ground that most businesses of our size can't. We can talk about grain direction and finishing techniques with the same fluency that we talk about lead times and export compliance.
              </p>
            </div>
          </div>

        </div>


        {/* ================= OUR JOURNEY TIMELINE ================= */}
        <div className="border-t border-[#e0dacd] pt-20 lg:pt-32">
          
          <div className="mb-16 lg:mb-24">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#8c8273] uppercase mb-4 block">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#5c4f3d] tracking-tight">
              Built Over Two Generations of Honest Craft
            </h2>
          </div>

          <div className="relative max-w-6xl">
            {/* Continuous Vertical Line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-[#d2c4b3]"></div>

            {/* Timeline Items */}
            <div className="flex flex-col gap-16 lg:gap-20">
              {journeyData.map((item, index) => (
                <div key={index} className="relative flex flex-col md:flex-row pl-14 md:pl-20">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#645643] z-10 border-[4px] border-[#FFFDF9]"></div>

                  {/* Title Column */}
                  <h3 className="w-full md:w-5/12 text-xl md:text-[22px] font-bold text-[#111] mb-3 md:mb-0 pr-0 md:pr-10 pt-0.5 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description Column */}
                  <p className="w-full md:w-7/12 text-[14px] md:text-[15px] text-[#4a4238] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                  
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}