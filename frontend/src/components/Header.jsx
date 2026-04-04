"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    FiSearch,
    FiChevronDown,
    FiChevronRight,
    FiArrowRight,
    FiMenu,
    FiX,
} from "react-icons/fi";

import Categories from "@/data/Categories";
import SubCategories from "@/data/SubCategories";

const Header = () => {
    const [hoveredImage, setHoveredImage] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 w-full bg-[#FFFDF9] z-50 shadow-sm lg:shadow-none">
            
            {/* =========================================
                MOBILE HEADER VIEW (Hidden on Desktop)
            ========================================= */}
            <div className="flex lg:hidden items-center justify-between px-6 py-4 w-full">
                {/* Hamburger Button */}
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-2xl text-gray-800 focus:outline-none"
                    aria-label="Open Mobile Menu"
                >
                    <FiMenu />
                </button>

                {/* Mobile Logo */}
                <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
                    <img src="/images/logo/sirohiLogo.svg" alt="Sirohi Logo" className="h-10 sm:h-12" />
                </Link>

                {/* Empty div to balance flex spacing (keeps logo centered) */}
                <div className="w-6"></div>
            </div>

            {/* =========================================
                DESKTOP HEADER VIEW (Hidden on Mobile)
            ========================================= */}
            <div className="hidden lg:flex items-end text-gray-700 justify-between px-8 py-5 max-w-[1600px] mx-auto w-full gap-4 xl:gap-8">
                {/* SEARCH */}
                <div className="flex items-center border-b border-gray-300 pb-1 w-48 xl:w-64 group focus-within:border-[#615236] transition-colors shrink-0">
                    <FiSearch className=" text-lg mr-2 group-focus-within:text-[#615236]" />
                    <input
                        type="text"
                        placeholder="SEARCH"
                        className="bg-transparent w-full outline-none text-sm placeholder-gray-400 text-gray-800"
                    />
                </div>

                {/* PRODUCTS DROPDOWN */}
                <nav className="shrink-0">
                    <div className="relative group/main">
                        <button className="flex items-center gap-1 text-sm uppercase text-gray-700 tracking-wide hover:text-[#615236]">
                            PRODUCTS <FiChevronDown />
                        </button>

                        {/* LEVEL 1 */}
                        <div className="absolute top-full left-0 pt-2 hidden group-hover/main:block w-56">
                            <div className="bg-[#FFFDF9] border shadow-md rounded-2xl p-2">
                                {Categories.map((category) => {
                                    const relatedSubCategories = SubCategories.filter(
                                        (sub) => sub.categoryId === category.id
                                    );

                                    return (
                                        <div key={category.id} className="relative group/sub">
                                            {/* CATEGORY */}
                                            <Link
                                                href={`/category/${category.slug}`}
                                                className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#615236] hover:text-white rounded-full"
                                            >
                                                {category.title}
                                                <FiChevronRight />
                                            </Link>

                                            {/* LEVEL 2 */}
                                            <div className="absolute top-0 left-full pl-2 hidden group-hover/sub:block w-80">
                                                <div className="bg-[#FFFDF9] border shadow-md rounded-2xl p-4 flex flex-col">
                                                    {relatedSubCategories.map((sub) => (
                                                        <Link
                                                            key={sub._id}
                                                            href={`/category/${category.slug}?sub=${sub.slug}`}
                                                            onMouseEnter={() => setHoveredImage(sub.image)}
                                                            className="group/link flex items-center justify-between text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#1F1951] py-3 border-b border-gray-50 last:border-0 transition-all uppercase"
                                                        >
                                                            <span>{sub.name}</span>
                                                            <div className="w-0 group-hover/link:w-4 h-[1px] bg-[#1F1951] transition-all duration-300"></div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* OTHER LINKS */}
                <Link href="/about" className="text-sm uppercase hover:text-[#615236]">ABOUT US</Link>

                <Link href="/" className="flex-shrink-0">
                    <img src="/images/logo/sirohiLogo.svg" alt="Sirohi Logo" className="h-14" />
                </Link>

                <Link href="/story" className="text-sm uppercase hover:text-[#615236]">OUR STORY</Link>
                <Link href="/clients" className="text-sm uppercase hover:text-[#615236]">HAPPY CLIENTS</Link>
                <Link href="/contact" className="text-sm uppercase hover:text-[#615236]">CONTACT US</Link>

                <Link
                    href="/request"
                    className="flex items-center gap-1 text-sm font-bold border-b-2 border-gray-800"
                >
                    REQUEST A QUOTE <FiArrowRight />
                </Link>
            </div>

            {/* =========================================
                MOBILE FULL SCREEN SLIDE-OUT MENU
            ========================================= */}
            {/* Dark Overlay Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={closeMobileMenu}
            />

            {/* Side Drawer */}
            <div 
                className={`fixed top-0 left-0 w-[85vw] sm:w-[350px] h-full bg-[#FFFDF9] shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <img src="/images/logo/sirohiLogo.svg" alt="Sirohi Logo" className="h-10" />
                    <button 
                        onClick={closeMobileMenu}
                        className="text-2xl text-gray-800 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Drawer Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                    
                    {/* Mobile Search */}
                    <div className="flex items-center border-b border-gray-300 pb-2 mb-2 focus-within:border-[#615236] transition-colors">
                        <FiSearch className="text-xl mr-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent w-full outline-none text-base placeholder-gray-400 text-gray-800"
                        />
                    </div>

                    {/* Mobile Links */}
                    <nav className="flex flex-col gap-5 text-base font-medium text-gray-800 uppercase tracking-wide">
                        <Link href="/" onClick={closeMobileMenu}>Home</Link>
                        
                        {/* Mobile Products Accordion */}
                        <div className="flex flex-col">
                            <button 
                                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                                className="flex items-center justify-between w-full uppercase tracking-wide"
                            >
                                PRODUCTS 
                                <FiChevronDown className={`transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Categories Dropdown */}
                            {mobileProductsOpen && (
                                <div className="flex flex-col mt-4 pl-4 border-l-2 border-[#e0dacd] gap-4">
                                    {Categories.map(category => {
                                        const relatedSubCategories = SubCategories.filter(sub => sub.categoryId === category.id);
                                        const isCatExpanded = expandedCategory === category.id;

                                        return (
                                            <div key={category.id} className="flex flex-col">
                                                <div className="flex items-center justify-between">
                                                    <Link 
                                                        href={`/category/${category.slug}`} 
                                                        className="text-[13px] text-gray-600 font-bold"
                                                        onClick={closeMobileMenu}
                                                    >
                                                        {category.title}
                                                    </Link>
                                                    <button 
                                                        onClick={() => setExpandedCategory(isCatExpanded ? null : category.id)}
                                                        className="p-1 text-gray-500"
                                                    >
                                                        <FiChevronDown className={`transition-transform duration-300 ${isCatExpanded ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </div>

                                                {/* Subcategories Dropdown */}
                                                {isCatExpanded && (
                                                    <div className="flex flex-col mt-3 pl-4 gap-3">
                                                        {relatedSubCategories.map(sub => (
                                                            <Link
                                                                key={sub._id}
                                                                href={`/category/${category.slug}?sub=${sub.slug}`}
                                                                className="text-[11px] text-gray-500 hover:text-[#615236]"
                                                                onClick={closeMobileMenu}
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        <Link href="/about" onClick={closeMobileMenu}>ABOUT US</Link>
                        <Link href="/story" onClick={closeMobileMenu}>OUR STORY</Link>
                        <Link href="/clients" onClick={closeMobileMenu}>HAPPY CLIENTS</Link>
                        <Link href="/contact" onClick={closeMobileMenu}>CONTACT US</Link>
                    </nav>
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-gray-200">
                    <Link
                        href="/request"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center gap-2 w-full bg-[#645643] text-white py-3.5 rounded-full text-xs font-bold tracking-widest hover:bg-[#4d4233] transition-colors"
                    >
                        REQUEST A QUOTE <FiArrowRight size={16} strokeWidth={2.5} />
                    </Link>
                </div>
            </div>

        </header>
    );
};

export default Header;