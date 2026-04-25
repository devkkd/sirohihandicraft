"use client";

import GetInTouch from "@/components/GetInTouch";
import React from "react";

// --- DATA: Exact content from the screenshot ---
const termsData = [
    {
        id: 1,
        title: "1. Use of This Website",
        content: "By accessing the Sirohi Handicraft website, you agree to these terms. The content on this site is for general information and trade enquiry purposes only. All product images and descriptions are indicative — actual products may vary slightly due to the handcrafted nature of our work.",
    },
    {
        id: 2,
        title: "2. Enquiries and Orders",
        content: "Submitting an enquiry or requesting a quote does not constitute a confirmed order. Orders are confirmed only upon receipt of a signed order confirmation and agreed deposit.",
    },
    {
        id: 3,
        title: "3. Pricing",
        content: "All prices are provided in quotations and are subject to change. Quoted prices are valid for 30 days from the date of quotation unless otherwise stated.",
    },
    {
        id: 4,
        title: "4. Intellectual Property",
        content: "All content on this website — including text, images, product designs, and branding — is the property of Sirohi Handicraft. You may not reproduce or use any content without prior written permission.",
    },
    {
        id: 5,
        title: "5. Product Descriptions",
        content: "All products are handcrafted from natural materials. Variations in colour, grain, and texture are inherent characteristics of wood and marble and are not considered defects. Product dimensions are approximate.",
    },
    {
        id: 6,
        title: "6. Limitation of Liability",
        content: "Sirohi Handicraft shall not be liable for any indirect or consequential loss arising from the use of this website or reliance on information contained herein.",
    },
    {
        id: 7,
        title: "7. Governing Law",
        content: "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of Rajasthan, India.",
    },
    {
        id: 8,
        title: "8. Changes to These Terms",
        content: "We reserve the right to update these terms at any time. Continued use of the website constitutes acceptance of any updated terms.",
    },
    {
        id: 9,
        title: "9. Contact",
        content: "For any questions about these Terms of Service, please contact us via our Request a Quote page or email us directly.",
    },
];

export default function TermsPage() {
    return (
        <>
            <main className="w-full bg-[#FFFDF9] pt-10 lg:pt-14 ">
                {/* Narrower max-width (1350px) for better reading experience on text pages */}
                <div className="max-w-[1350px] mx-auto px-6 lg:px-12">

                    {/* ================= HEADER SECTION ================= */}
                    <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
                        <span className="text-[15px] font-bold text-[#4a4238] mb-4 block">
                            Terms of Service
                        </span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#5c4f3d] tracking-tight">
                            Terms of Service
                        </h1>
                    </div>

                    {/* ================= CONTENT SECTION ================= */}
                    <div className="flex flex-col">

                        <h3 className="text-[15px] md:text-base font-extrabold text-[#111] mb-10">
                            Last updated: 2025
                        </h3>

                        {/* Mapping through the terms data */}
                        <div className="flex flex-col gap-8 lg:gap-10">
                            {termsData.map((section) => (
                                <div key={section.id} className="flex flex-col">
                                    <h2 className="text-[16px] md:text-[17px] font-extrabold text-[#111] mb-2 tracking-wide">
                                        {section.title}
                                    </h2>
                                    <p className="text-[14px] md:text-[15px] text-[#4a4238] font-medium leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </main>
            <GetInTouch/>
        </>
    );
}