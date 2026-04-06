"use client";

import React from "react";
import Link from "next/link";

// --- DATA: Exact content from the screenshots ---
const faqData = [
  {
    id: "orders-enquiries",
    category: "Orders & Enquiries",
    items: [
      {
        q: "What is the minimum order quantity (MOQ)?",
        a: "MOQs vary by product. Generally, wooden items start from 50 pieces and marble items from 25 pieces per design. Please use the Request a Quote form for specific product MOQs.",
      },
      {
        q: "How do I request a sample before placing a bulk order?",
        a: "You can request samples through our Request a Quote page. Sample orders are available for most products. Lead time for samples is typically 7-14 working days.",
      },
      {
        q: "Can I order products in a custom size or finish?",
        a: "Yes. We offer customisation on size, finish, wood species, and marble type for most products. Share your specifications via our enquiry form and we will advise on feasibility and pricing.",
      },
    ],
  },
  {
    id: "production-quality",
    category: "Production & Quality",
    items: [
      {
        q: "Are your wooden products FSC certified?",
        a: "Yes. We use FSC-certified wood across our wooden product range. Our FSC certification ensures responsible sourcing from sustainably managed forests.",
      },
      {
        q: "What certifications does Sirohi Handicraft hold?",
        a: "We hold Sedex Semeta certification for ethical trade and supply chain compliance, and FSC certification for responsible wood sourcing.",
      },
      {
        q: "How do you ensure quality consistency in bulk production?",
        a: "We have in-house quality control at every stage – from raw material selection through to final inspection before packing. Every batch is checked against agreed samples.",
      },
    ],
  },
  {
    id: "shipping-export",
    category: "Shipping & Export",
    items: [
      {
        q: "Which countries do you export to?",
        a: "We currently export to the USA, UK, Europe, UAE, Qatar, Kuwait, Australia, and Canada. We are open to working with buyers in other regions – please get in touch.",
      },
      {
        q: "What is the typical lead time for bulk orders?",
        a: "Standard lead time for bulk orders is 30-45 days from order confirmation and deposit, depending on product type and quantity.",
      },
      {
        q: "Do you handle export documentation and compliance?",
        a: "Yes. We manage all export documentation including packing lists, commercial invoices, certificates of origin, and any compliance documentation required by the destination country.",
      },
    ],
  },
  {
    id: "packaging-branding",
    category: "Packaging & Branding",
    items: [
      {
        q: "Can products be packed with custom branding or private label?",
        a: "Yes. We offer private label and custom branded packaging. This includes printed boxes, swing tags, and tissue wrapping. Please discuss your requirements when placing your enquiry.",
      },
      {
        q: "What standard packaging do products come in?",
        a: "Most wooden products come in individual brown kraft boxes. Marble pieces are wrapped in foam and packed in corrugated boxes. Custom packaging is available for orders meeting the minimum quantity.",
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-10 lg:pt-14 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center mb-20 lg:mb-28">
          <span className="text-[14px] md:text-[15px] font-bold text-[#4a4238] uppercase tracking-wide mb-4 block">
            FAQ's
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#645643] tracking-tight">
            Frequently Asked Questions
          </h1>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* --- LEFT: STICKY SIDEBAR NAVIGATION --- */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-32 flex flex-col">
            <nav className="flex flex-col">
              {faqData.map((section) => (
                <Link
                  key={`nav-${section.id}`}
                  href={`#${section.id}`}
                  className="py-5 border-b border-[#d2c4b3] text-[15px] md:text-[17px] font-extrabold text-[#4a4238] hover:text-[#645643] transition-colors"
                >
                  {section.category}
                </Link>
              ))}
            </nav>
          </div>

          {/* --- RIGHT: FAQ CONTENT --- */}
          <div className="w-full lg:w-3/4 flex flex-col gap-16 lg:gap-20">
            {faqData.map((section) => (
              <div key={section.id} id={section.id} className="flex flex-col scroll-mt-32">
                
                {/* Category Title */}
                <h2 className="text-xl md:text-[22px] font-extrabold text-[#645643] mb-8">
                  {section.category}
                </h2>

                {/* Questions & Answers */}
                <div className="flex flex-col">
                  {section.items.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col py-8 ${index === 0 ? "pt-0" : "border-t border-[#e0dacd]"}`}
                    >
                      <h3 className="text-[16px] md:text-[18px] font-extrabold text-[#111] mb-4 tracking-wide leading-snug">
                        {item.q}
                      </h3>
                      <p className="text-[14px] md:text-[15px] text-[#4a4238] font-medium leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
                
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}