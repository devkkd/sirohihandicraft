"use client";

import GetInTouch from "@/components/GetInTouch";
import React from "react";

// --- DATA: Exact testimonials from the screenshot ---
const testimonialsData = [
    {
        id: 1,
        text: "“Working with Sirohi Handicraft has been a great experience. Their attention to detail and product finishing is always up to the mark.”",
        name: "Michael Anderson, USA",
    },
    {
        id: 2,
        text: "“They understand our design requirements very well and deliver exactly what we expect.”",
        name: "Sarah Williams, UK",
    },
    {
        id: 3,
        text: "“The combination of wood and marble products they offer is unique and fits perfectly with our collection.”",
        name: "Ahmed Al-Farsi, UAE",
    },
    {
        id: 4,
        text: "“Very reliable team when it comes to timelines and communication. Orders are always handled professionally.”",
        name: "Daniel Carter, USA",
    },
    {
        id: 5,
        text: "“Sampling process is smooth and quick. They are flexible with custom developments.”",
        name: "Emma Roberts, Australia",
    },
    {
        id: 6,
        text: "“Quality consistency in bulk production is something we truly appreciate.”",
        name: "James Walker, Canada",
    },
    {
        id: 7,
        text: "“Their team is responsive and easy to work with, which makes long-term business comfortable.”",
        name: "Fatima Khan, UAE",
    },
    {
        id: 8,
        text: "“They have a strong understanding of export standards and packaging requirements.”",
        name: "Robert Miller, USA",
    },
    {
        id: 9,
        text: "“We value their commitment towards maintaining quality across different product categories.”",
        name: "Olivia Brown, UK",
    },
    {
        id: 10,
        text: "“From small accessories to larger items, their craftsmanship is impressive.”",
        name: "Hassan Al-Mansoori, Qatar",
    },
    {
        id: 11,
        text: "“They always try to improve and bring better ideas during product development.”",
        name: "David Wilson, USA",
    },
    {
        id: 12,
        text: "“A trustworthy supplier with good control over production and finishing.”",
        name: "Chloe Martin, France",
    },
    {
        id: 13,
        text: "“Their wooden and marble collections add real value to our product line.”",
        name: "Mohammed Al-Sabah, Kuwait",
    },
    {
        id: 14,
        text: "“Clear communication and professional approach make them stand out.”",
        name: "Sophia Taylor, USA",
    },
    {
        id: 15,
        text: "“We look forward to continuing our partnership for the long term.”",
        name: "Liam Johnson, Australia",
    },
];

// --- REUSABLE STAR COMPONENT ---
const Stars = () => (
    <div className="flex gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-[#2d2926]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

// --- REUSABLE CARD COMPONENT ---
const TestimonialCard = ({ data }) => (
    <div className="bg-transparent border border-[#d2c4b3] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[280px] hover:shadow-md transition-shadow duration-300">
        <p className="text-[14px] lg:text-[15px] leading-relaxed text-[#2d2926] font-medium sm:mb-8">
            {data.text}
        </p>
        <div className="flex flex-col">
            <span className="text-sm font-bold text-[#111]">
                {data.name}
            </span>
            <Stars />
        </div>
    </div>
);

export default function ClientsPage() {
    return (
        <>
            <div className="bg-[#FFFDF9]">
                <main className="w-full  pt-12 lg:pt-14 max-w-[1450px] mx-auto">

                    {/* ================= HEADER SECTION ================= */}
                    <div className="flex flex-col items-center text-center mb-16 px-6 lg:px-12">
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#4a4238] uppercase mb-4 block">
                            HAPPY CLIENTS
                        </span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#5c4f3d] tracking-tight mb-6">
                            What Our Partners Say
                        </h1>
                        <p className="text-sm md:text-[15px] text-[#2d2926] font-medium max-w-2xl">
                            A Full Testimonials Page Showcasing Feedback From International Buyers And Long-term Partners.
                        </p>
                    </div>

                    {/* ================= EDGE-TO-EDGE IMAGE ROW ================= */}
                    <div className="w-full h-[200px] sm:h-[300px] lg:h-[400px] flex mb-20 lg:mb-32 overflow-hidden">
                        <div className="flex-1 overflow-hidden">
                            <img src="/images/clients/client1.jpg" alt="Sirohi Client 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <img src="/images/clients/client2.jpg" alt="Sirohi Client 2" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <img src="/images/clients/client3.jpg" alt="Sirohi Client 3" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <img src="/images/clients/client4.jpg" alt="Sirohi Client 4" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <img src="/images/clients/client5.jpg" alt="Sirohi Client 5" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* ================= TESTIMONIALS GRID ================= */}
                    <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {testimonialsData.map((testimonial) => (
                                <TestimonialCard key={testimonial.id} data={testimonial} />
                            ))}
                        </div>
                    </div>

                </main>
                <GetInTouch />
            </div>
        </>
    );
}