"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";

const Footer = () => {
  const { categories, subCategories } = useShop();

  return (
    <footer className="w-full bg-[#645643] text-[#e0dacd]" style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>

      {/* Top: Logo + Tagline */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-12 pb-8 flex flex-col items-center text-center border-b border-[#7a6b52]">
        <Link href="/">
          <img src="/images/logo/sirohiWhite.svg" alt="Sirohi Handicraft" className="h-16 w-auto mb-4" />
        </Link>
        <p className="text-xs text-[#c4b9ac] max-w-xl leading-relaxed">
          Manufacturer and exporter of wooden and marble home decor and kitchenware. Crafted in Rajasthan, delivered to the world.
        </p>
      </div>

      {/* Middle: Dynamic subcategory columns + Company + Social */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 border-b border-[#7a6b52]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

          {/* Dynamic subcategory columns per category */}
          {categories.map((cat) => {
            const subs = subCategories.filter(
              (s) => (s.category?._id || s.category) === cat._id
            );
            return subs.map((sub) => (
              <div key={sub._id} className="flex flex-col gap-2">
                <Link
                  href={`/category/${cat.slug}?sub=${sub.slug}`}
                  className="text-[11px] font-bold text-white tracking-wide hover:text-[#e0dacd] transition-colors leading-tight"
                >
                  {sub.name}
                </Link>
              </div>
            ));
          })}

          {/* Company */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold text-white tracking-wide">Company</h4>
            {[
              { label: "About Us", href: "/about" },
              { label: "Our Story", href: "/story" },
              { label: "Happy Clients", href: "/clients" },
              { label: "FAQ's", href: "/faqs" },
              { label: "Contact Us", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-xs text-[#c4b9ac] hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold text-white tracking-wide">Social</h4>
            {[
              { label: "Facebook", href: "#" },
              { label: "Instagram", href: "#" },
              { label: "YouTube", href: "#" },
              { label: "Pinterest", href: "#" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-xs text-[#c4b9ac] hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#c4b9ac]">
        <p>© {new Date().getFullYear()} Sirohi Handicrafted. All rights reserved.</p>
        <p>Crafted By : Kontent Kraft Digital</p>
      </div>

    </footer>
  );
};

export default Footer;
