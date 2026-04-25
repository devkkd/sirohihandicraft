"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";

const Footer = () => {
  const { categories, subCategories } = useShop();

  return (
    <footer className="w-full" style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>
      <div className="bg-[#615236] text-[#e0dacd]">

        {/* Logo + Tagline */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-8 flex flex-col items-center text-center border-b border-[#7a6b52]">
          <Link href="/">
            <img src="/images/logo/sirohiWhite.svg" alt="Sirohi Handicraft" className="h-16 w-auto mb-3" />
          </Link>
          <p className="text-xs text-[#c4b9ac] max-w-xl leading-relaxed">
            Manufacturer and exporter of wooden and marble home decor and kitchenware. Crafted in Rajasthan, delivered to the world.
          </p>
        </div>
   {/* Company + Legal + Social + Contact - with vertical dividers */}
        <div className="max-w-[1400px] mx-auto border-b border-[#7a6b52]">
          <div className="grid grid-cols-2 md:grid-cols-4">
 <div className="flex flex-col gap-2 px-8 py-8 items-center">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#FFFFFF] uppercase mb-2">Contact</p>
              <p className="text-xs text-[#e0dacd]">info@sirohihandicrafted.com</p>
              <p className="text-xs text-[#e0dacd]">+91-9352606586</p>
              <p className="text-xs text-[#e0dacd]">Jaipur, Rajasthan, India</p>
            </div>
            <div className="flex flex-col gap-2 px-8 py-8 items-center">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#FFFFFF] uppercase mb-2">Company</p>
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Story", href: "/story" },
                { label: "Happy Clients", href: "/clients" },
                { label: "Certificates", href: "/certificates" },
                { label: "FAQ's", href: "/faqs" },
                { label: "Contact Us", href: "/contact" },
              ].map(({ label, href }) => (
                <Link key={href} href={href} className="text-xs text-[#e0dacd] hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 px-8 py-8 items-center">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#FFFFFF] uppercase mb-2">Legal</p>
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map(({ label, href }) => (
                <Link key={href} href={href} className="text-xs text-[#e0dacd] hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 px-8 py-8 items-center">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#FFFFFF] uppercase mb-2">Social</p>
              {[
                { label: "Facebook", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "YouTube", href: "#" },
                { label: "Pinterest", href: "#" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#e0dacd] hover:text-white transition-colors">
                  {label}
                </a>
              ))}
            </div>

           

          </div>
        </div>
        {/* All categories - 4 columns with dividers */}
        <div className="max-w-[1400px] mx-auto border-b border-[#7a6b52]">
          <div className="grid grid-cols-2 md:grid-cols-2 divide-y divide-[#7a6b52]">
            {categories.map((cat, idx) => {
              const subs = subCategories.filter(
                (s) => (s.category?._id || s.category) === cat._id
              );
              const mid = Math.ceil(subs.length / 2);
              const col1 = subs.slice(0, mid);
              const col2 = subs.slice(mid);
              return (
                <div key={cat._id} className={`px-6 py-8 flex flex-col items-center ${idx % 2 === 0 ? "border-r border-[#7a6b52]" : ""}`}>
                  <Link href={`/category/${cat.slug}`}
                    className="text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-5 block text-center py-2 px-6 w-full transition-colors">
                    {cat.title}
                  </Link>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-center w-full">
                    <div className="flex flex-col gap-2">
                      {col1.map((sub) => (
                        <Link key={sub._id} href={`/category/${cat.slug}?sub=${sub.slug}`}
                          className="text-xs text-[#e0dacd] hover:text-white transition-colors uppercase tracking-wide">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      {col2.map((sub) => (
                        <Link key={sub._id} href={`/category/${cat.slug}?sub=${sub.slug}`}
                          className="text-xs text-[#e0dacd] hover:text-white transition-colors uppercase tracking-wide">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

     

        {/* Bottom bar */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#c4b9ac]">
          <p>© {new Date().getFullYear()} Sirohi Handicrafted. All rights reserved.</p>
          <p>Crafted and Powered by :<Link href="https://www.kontentkraftdigital.com" target="_blank"> Kontent Kraft Digital </Link></p>
        </div>
      </div>

      {/* Certification strip */}
      <div className="bg-white py-6 flex items-center justify-center gap-10 border-t border-gray-100">
        <img src="/images/certificate/Union.png" alt="FSC" className="h-12 w-auto object-contain" />
        <img src="/images/certificate/Group 138.png" alt="Sedex" className="h-8 w-auto object-contain" />
        <img src="/images/certificate/Group 137.png" alt="SMETA" className="h-9 w-auto object-contain" />
      </div>
    </footer>
  );
};

export default Footer;
