"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    FiSearch,
    FiChevronDown,
    FiArrowRight,
    FiMenu,
    FiX,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { FiShoppingBag } from "react-icons/fi";
import { useShop } from "@/context/ShopContext";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [activeDesktopCategory, setActiveDesktopCategory] = useState(null);

    const { categories, subCategories } = useShop();
    const { totalItems } = useCart();

    useEffect(() => {
        if (categories.length > 0 && !activeDesktopCategory) {
            setActiveDesktopCategory(categories[0]._id);
        }
    }, [categories]);


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
            
      
            <div className="flex lg:hidden items-center justify-between px-6 py-4 w-full">
           
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-2xl text-gray-800 focus:outline-none"
                    aria-label="Open Mobile Menu"
                >
                    <FiMenu />
                </button>

                <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
                    <img src="/images/logo/sirohiLogo.svg" alt="Sirohi Logo" className="h-10 sm:h-12" />
                </Link>

               
                <div className="w-6"></div>
            </div>

            <div className="hidden lg:flex items-end text-gray-700 justify-between px-8 py-5 max-w-[1600px] mx-auto w-full gap-4 xl:gap-8">
                
                {/* SEARCH */}
                <div className="flex items-center border-b border-gray-300 w-48 xl:w-64 group focus-within:border-[#615236] transition-colors shrink-0">
                    <FiSearch className=" text-lg mr-2 group-focus-within:text-[#615236]" />
                    <input
                        type="text"
                        placeholder="SEARCH"
                        className="bg-transparent w-full outline-none text-sm placeholder-gray-400 text-gray-800"
                    />
                </div>

                {/* PRODUCTS DROPDOWN */}
                <nav className="shrink-0 flex h-full items-center">
                    <div className="relative group/main h-full">
                        {/* Dropdown Trigger */}
                        <button className="flex items-center gap-1 text-[11px] uppercase text-gray-700 tracking-wide hover:text-[#615236]">
                            PRODUCTS <FiChevronDown />
                        </button>

                        {/* MEGA MENU PANEL (Styled like image_a85ee9.png) */}
                        <div className="absolute top-full left-[-20%] pt-6 hidden group-hover/main:block w-max z-50">
                            {/* Invisible bridge to keep hover state active while moving mouse down */}
                            <div className="absolute top-0 left-0 w-full h-6 bg-transparent"></div>
                            
                            <div className="bg-[#FFFDF9] border border-[#e0dacd] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] p-6 flex gap-4 min-h-[100px]">
                                
                                {/* LEFT COLUMN: Categories */}
                                <div className="flex flex-col w-54 pr-4 border-r border-[#e0dacd]/50 gap-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category._id}
                                            href={`/category/${category.slug}`}
                                            onMouseEnter={() => setActiveDesktopCategory(category._id)}
                                            className={`px-6 py-2 text-[12px] font-medium transition-colors rounded-full capitalize ${
                                                activeDesktopCategory === category._id
                                                    ? "bg-[#645643] text-white"
                                                    : "text-[#2d2926] hover:bg-[#FBF3E6]"
                                            }`}
                                        >
                                            {category.title.toLowerCase()} Range
                                        </Link>
                                    ))}
                                </div>

                                {/* RIGHT COLUMN: Subcategories based on active left item */}
                                <div className="flex flex-col w-64 gap-1 pl-2">
                                    {subCategories.filter(sub => (sub.category?._id || sub.category) === activeDesktopCategory).map((sub) => {
                                        const parentCat = categories.find(c => c._id === activeDesktopCategory);
                                        return (
                                            <Link
                                                key={sub._id}
                                                href={`/category/${parentCat?.slug}?sub=${sub.slug}`}
                                                className="px-6 py-2 text-[12px] font-medium text-[#2d2926] transition-colors rounded-full hover:bg-[#645643] hover:text-white"
                                            >
                                                {sub.name}
                                            </Link>
                                        );
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>

                {/* OTHER LINKS */}
                <Link href="/about" className="text-[11px] uppercase hover:text-[#615236]">ABOUT US</Link>

                {/* LOGO */}
                <Link href="/" className="flex-shrink-0 px-4">
                    <img src="/images/logo/sirohiLogo.svg" alt="Sirohi Logo" className="h-14" />
                </Link>

                <Link href="/story" className="text-sm uppercase hover:text-[#615236] pb-1">OUR STORY</Link>
                <Link href="/clients" className="text-sm uppercase hover:text-[#615236] pb-1">HAPPY CLIENTS</Link>
                <Link href="/contact" className="text-sm uppercase hover:text-[#615236] pb-1">CONTACT US</Link>
                {/* Cart Icon */}
                <Link href="/cart" className="relative shrink-0 pb-1">
                    <FiShoppingBag className="text-xl text-gray-700 hover:text-[#615236] transition-colors" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#645643] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>
                {/* <Link
                    href="/request"
                    className="flex items-center gap-1 text-[11px] font-bold border-b-2 border-gray-800"
                >
                    REQUEST A QUOTE <FiArrowRight />
                </Link> */}

                
            </div>

         
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
                                    {categories.map(category => {
                                        const relatedSubCategories = subCategories.filter(sub => (sub.category?._id || sub.category) === category._id);
                                        const isCatExpanded = expandedCategory === category._id;

                                        return (
                                            <div key={category._id} className="flex flex-col">
                                                <div className="flex items-center justify-between">
                                                    <Link 
                                                        href={`/category/${category.slug}`} 
                                                        className="text-[13px] text-gray-600 font-bold"
                                                        onClick={closeMobileMenu}
                                                    >
                                                        {category.title}
                                                    </Link>
                                                    <button 
                                                        onClick={() => setExpandedCategory(isCatExpanded ? null : category._id)}
                                                        className="p-1 text-gray-500"
                                                    >
                                                        <FiChevronDown className={`transition-transform duration-300 ${isCatExpanded ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </div>

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
                        className="flex items-center justify-center gap-2 w-full bg-[#645643] text-white py-3.5 rounded-full text-[11px] font-bold tracking-widest hover:bg-[#4d4233] transition-colors"
                    >
                        REQUEST A QUOTE <FiArrowRight size={16} strokeWidth={2.5} />
                    </Link>
                </div>
            </div>

        </header>
    );
};

export default Header;