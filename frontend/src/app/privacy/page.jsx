"use client";

import GetInTouch from "@/components/GetInTouch";
import React from "react";

// --- DATA: Exact content from the screenshot ---
const privacyData = [
    {
        id: 1,
        title: "1. Information We Collect",
        content: "We collect information you provide when you fill in our enquiry form, request a quote, or contact us directly. This includes your name, company name, email address, phone number, country, and details of your enquiry.",
    },
    {
        id: 2,
        title: "2. How We Use Your Information",
        content: "We use the information you provide solely to respond to your enquiry, process your request for samples or quotes, and communicate with you about orders and products. We do not use your data for marketing without your consent.",
    },
    {
        id: 3,
        title: "3. Data Sharing",
        content: "We do not sell, rent, or share your personal data with third parties except where required to fulfil your order (for example, sharing a delivery address with a logistics partner) or where required by law.",
    },
    {
        id: 4,
        title: "4. Data Retention",
        content: "We retain your information for as long as necessary to maintain our business relationship and comply with legal obligations. You may request deletion of your data at any time by contacting us.",
    },
    {
        id: 5,
        title: "5. Cookies",
        content: "Our website may use basic cookies to improve your browsing experience. These do not collect personal data. You can disable cookies in your browser settings at any time.",
    },
    {
        id: 6,
        title: "6. Your Rights",
        content: "You have the right to access, correct, or request deletion of any personal data we hold about you. To exercise these rights, please contact us at the details provided on our Contact page.",
    },
    {
        id: 7,
        title: "7. Contact",
        content: "For any questions regarding this Privacy Policy, please contact us via the Request a Quote page or email us directly.",
    },
];

export default function PrivacyPage() {
    return (
        <>
            <main className="w-full bg-[#FFFDF9] min-h-screen pt-10 lg:pt-1">
                {/* Narrower max-width (1000px) for better reading experience on text pages */}
                <div className="max-w-[1350px] mx-auto px-6 lg:px-12">

                    {/* ================= HEADER SECTION ================= */}
                    <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
                        <span className="text-[15px] font-bold text-[#4a4238] mb-4 block">
                            Privacy Policy
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#5c4f3d] tracking-tight">
                            Privacy Policy
                        </h1>
                    </div>

                    {/* ================= CONTENT SECTION ================= */}
                    <div className="flex flex-col">

                        <h3 className="text-[15px] md:text-base font-extrabold text-[#111] mb-10">
                            Last updated: 2025
                        </h3>

                        {/* Mapping through the privacy data */}
                        <div className="flex flex-col gap-8 lg:gap-10">
                            {privacyData.map((section) => (
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