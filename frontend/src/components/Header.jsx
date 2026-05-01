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

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({ categories: [], subCategories: [], products: [] });
    const [searchLoading, setSearchLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = React.useRef(null);

    // Debounced search — categories & subcategories from context (client-side), products from API
    useEffect(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) { setSearchResults({ categories: [], subCategories: [], products: [] }); setShowResults(false); return; }

        // Instant client-side match for categories & subcategories
        const matchedCats = categories.filter(c => c.title?.toLowerCase().includes(q)).slice(0, 3);
        const matchedSubs = subCategories.filter(s => s.name?.toLowerCase().includes(q)).slice(0, 4);

        setSearchResults(prev => ({ ...prev, categories: matchedCats, subCategories: matchedSubs }));
        setShowResults(true);

        // Debounced API call for products (name + SKU)
        const timer = setTimeout(async () => {
            setSearchLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com"}/api/products?search=${encodeURIComponent(searchQuery.trim())}&limit=5`);
                const data = await res.json();
                setSearchResults(prev => ({ ...prev, products: data.data || [] }));
                setShowResults(true);
            } catch { setSearchResults(prev => ({ ...prev, products: [] })); }
            finally { setSearchLoading(false); }
        }, 350);
        return () => clearTimeout(timer);
    }, [searchQuery, categories, subCategories]);

    const hasResults = searchResults.categories.length > 0 || searchResults.subCategories.length > 0 || searchResults.products.length > 0;
    const totalCount = searchResults.categories.length + searchResults.subCategories.length + searchResults.products.length;

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

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

            <div className="hidden lg:flex items-end text-gray-700 justify-between px-6 py-5 max-w-[1600px] mx-auto w-full gap-2 xl:gap-4">
                
                {/* SEARCH */}
                <div ref={searchRef} className="relative flex items-center border-b border-gray-300 w-36 xl:w-44 group focus-within:border-[#615236] transition-colors shrink-0">
                    <FiSearch className="text-lg mr-2 group-focus-within:text-[#615236] shrink-0" />
                    <input
                        type="text"
                        placeholder="SEARCH"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => hasResults && setShowResults(true)}
                        className="bg-transparent w-full outline-none text-sm placeholder-gray-400 text-gray-800"
                    />

                    {/* Dropdown results */}
                    {showResults && (
                        <div className="absolute top-full left-0 mt-4 w-[420px] bg-[#FFFDF9] border border-[#e0dacd] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-50 overflow-hidden">
                            {!hasResults && !searchLoading ? (
                                <div className="flex flex-col items-center py-8 gap-2">
                                    <FiSearch className="text-2xl text-[#d2c4b3]" />
                                    <p className="text-xs text-[#9e8f7e] tracking-wide">No results found</p>
                                </div>
                            ) : (
                                <div className="flex flex-col max-h-[480px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                                    {/* Categories */}
                                    {searchResults.categories.length > 0 && (
                                        <div className="px-4 pt-4 pb-2">
                                            <p className="text-[9px] font-bold tracking-[0.2em] text-[#9e8f7e] uppercase mb-2">Category</p>
                                            {searchResults.categories.map((cat) => (
                                                <Link key={cat._id} href={`/category/${cat.slug}`}
                                                    onClick={() => { setShowResults(false); setSearchQuery(""); }}
                                                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#f5f0ea] transition-colors group">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#645643] shrink-0" />
                                                        <span className="text-sm font-medium text-[#2d2926]">{cat.title}</span>
                                                    </div>
                                                    <span className="text-[9px] bg-[#f0ebe3] text-[#615236] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase">Category</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    {/* Subcategories */}
                                    {searchResults.subCategories.length > 0 && (
                                        <div className={`px-4 pb-2 ${searchResults.categories.length > 0 ? "pt-1 border-t border-[#f0ebe3]" : "pt-4"}`}>
                                            <p className="text-[9px] font-bold tracking-[0.2em] text-[#9e8f7e] uppercase mb-2">Subcategory</p>
                                            {searchResults.subCategories.map((sub) => {
                                                const parentCat = categories.find(c => c._id === (sub.category?._id || sub.category));
                                                return (
                                                    <Link key={sub._id}
                                                        href={parentCat ? `/category/${parentCat.slug}?sub=${sub.slug}` : "#"}
                                                        onClick={() => { setShowResults(false); setSearchQuery(""); }}
                                                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#f5f0ea] transition-colors group">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#a39789] shrink-0" />
                                                            <span className="text-sm font-medium text-[#2d2926]">{sub.name}</span>
                                                        </div>
                                                        {parentCat && (
                                                            <span className="text-[9px] bg-[#f0ebe3] text-[#615236] px-2 py-0.5 rounded-full font-medium tracking-wide">
                                                                {parentCat.title}
                                                            </span>
                                                        )}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Products */}
                                    {(searchResults.products.length > 0 || searchLoading) && (
                                        <div className={`px-4 pb-3 ${(searchResults.categories.length > 0 || searchResults.subCategories.length > 0) ? "pt-1 border-t border-[#f0ebe3]" : "pt-4"}`}>
                                            <p className="text-[9px] font-bold tracking-[0.2em] text-[#9e8f7e] uppercase mb-2">Products</p>
                                            {searchLoading ? (
                                                <div className="flex items-center justify-center py-4">
                                                    <div className="w-4 h-4 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
                                                </div>
                                            ) : (
                                                searchResults.products.map((product) => (
                                                    <Link key={product._id} href={`/product/${product.slug}`}
                                                        onClick={() => { setShowResults(false); setSearchQuery(""); }}
                                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f5f0ea] transition-colors group">
                                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f0ebe3] shrink-0">
                                                            {product.thumbnail ? (
                                                                <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <FiSearch className="text-[#c4b9ac] text-xs" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-medium text-[#2d2926] truncate leading-tight">{product.name}</p>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-[10px] text-[#9e8f7e] font-mono">{product.sku}</span>
                                                                {product.subCategory?.name && (
                                                                    <span className="text-[9px] bg-[#f0ebe3] text-[#615236] px-2 py-0.5 rounded-full font-medium">
                                                                        {product.subCategory.name}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <FiArrowRight className="text-[#c4b9ac] text-sm shrink-0 group-hover:text-[#645643] transition-colors" />
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    )}

                                    {/* Footer count */}
                                    {hasResults && !searchLoading && (
                                        <div className="px-4 py-2.5 border-t border-[#f0ebe3] bg-[#faf7f3]">
                                            <p className="text-[9px] text-[#9e8f7e] tracking-wide text-center">
                                                {totalCount} result{totalCount !== 1 ? "s" : ""} for "{searchQuery}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* PRODUCTS DROPDOWN */}
                <nav className="shrink-0 flex h-full items-center">
                    <div className="relative group/main h-full">
                        {/* Dropdown Trigger */}
                        <button className="flex items-center gap-1 text-[12px] uppercase text-gray-700 tracking-wide hover:text-[#615236] whitespace-nowrap">
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
  <Link href="/collections" className="text-[12px] uppercase hover:text-[#615236] whitespace-nowrap">ALL COLLECTIONS</Link>
                {/* OTHER LINKS */}
                <Link href="/about" className="text-[12px] uppercase hover:text-[#615236] whitespace-nowrap">ABOUT US</Link>
                <Link href="/vintage" className="text-[12px] uppercase hover:text-[#615236] whitespace-nowrap">VINTAGE</Link>

                {/* LOGO */}
                <Link href="/" className="flex-shrink-0 px-2">
                    <img src="/images/logo/sirohiLogo.svg" alt="Sirohi Logo" className="h-12" />
                </Link>

                <Link href="/story" className="text-[12px] uppercase hover:text-[#615236] whitespace-nowrap">OUR STORY</Link>
                <Link href="/clients" className="text-[12px] uppercase hover:text-[#615236] whitespace-nowrap">HAPPY CLIENTS</Link>
              
                <Link href="/certificates" className="text-[12px] uppercase hover:text-[#615236] whitespace-nowrap">CERTIFICATES</Link>
                <Link href="/contact" className="text-[12px] uppercase hover:text-[#615236] whitespace-nowrap">CONTACT US</Link>
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
                        <Link href="/vintage" onClick={closeMobileMenu}>VINTAGE</Link>
                        <Link href="/story" onClick={closeMobileMenu}>OUR STORY</Link>
                        <Link href="/clients" onClick={closeMobileMenu}>HAPPY CLIENTS</Link>
                        <Link href="/collections" onClick={closeMobileMenu}>ALL COLLECTIONS</Link>
                        <Link href="/certificates" onClick={closeMobileMenu}>CERTIFICATES</Link>
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
