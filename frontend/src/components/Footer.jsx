"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#615236] text-[#e0dacd] pt-3 lg:pt-6 pb-3 lg:pb-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* ================= TOP CENTER: Logo & Tagline ================= */}
        <div className="flex flex-col items-center text-center mb-4">
          <Link href="/" className="mb-2">
            <img 
              src="/images/logo/sirohiWhite.svg" 
              alt="Sirohi Handicraft Logo" 
              className="h-16 md:h-20 w-auto"
            />
          </Link>
          <p className="text-[13px] md:text-[15px] leading-relaxed font-medium">
            Manufacturer and exporter of wooden and marble home décor and kitchenware. Crafted in Rajasthan, delivered to the world.
          </p>
        </div>

        {/* ================= MIDDLE CENTER: Links ================= */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-32 mb-5 lg:mb-5 w-full pt-5 border-t border-[#7a6b52] ">
          
          {/* Company Links */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h4 className="text-white font-extrabold tracking-widest uppercase text-xs mb-1">
              Company
            </h4>
            <Link href="/about" className="text-sm font-medium hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/story" className="text-sm font-medium hover:text-white transition-colors">
              Our Story
            </Link>
            <Link href="/clients" className="text-sm font-medium hover:text-white transition-colors">
              Happy Clients
            </Link>
            <Link href="/faqs" className="text-sm font-medium hover:text-white transition-colors">
              FAQ's
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h4 className="text-white font-extrabold tracking-widest uppercase text-xs mb-1">
              Social
            </h4>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-white transition-colors">
              YouTube
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-white transition-colors">
              Pinterest
            </a>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="w-full pt-5 border-t border-[#7a6b52] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© 2026 Sirohi Handicraft. All rights reserved.</p>
          <p>Crafted By : Kontent Kraft Digital</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;