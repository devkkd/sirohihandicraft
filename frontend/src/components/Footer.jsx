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

      {/* Middle: Categories with subcategories + Company + Social */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 border-b border-[#7a6b52]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Dynamic: one column per category with its subcategories */}
          {categories.map((cat) => {
            const subs = subCategories.filter(
              (s) => (s.category?._id || s.category) === cat._id
            );
            return (
              <div key={cat._id} className="flex flex-col gap-3">
                <Link
                  href={`/category/${cat.slug}`}
                  className="text-[11px] font-bold text-white tracking-widest uppercase hover:text-[#e0dacd] transition-colors"
                >
                  {cat.title}
                </Link>
                <div className="flex flex-col gap-2">
                  {subs.map((sub) => (
                    <Link
                      key={sub._id}
                      href={`/category/${cat.slug}?sub=${sub.slug}`}
                      className="text-xs text-[#c4b9ac] hover:text-white transition-colors leading-relaxed"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-bold text-white tracking-widest uppercase">Company</h4>
            <div className="flex flex-col gap-2">
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
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-bold text-white tracking-widest uppercase">Social</h4>
            <div className="flex flex-col gap-2">
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
