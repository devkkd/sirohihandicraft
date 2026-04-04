"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
    FiSearch,
    FiChevronDown,
    FiChevronRight,
    FiArrowRight,
} from "react-icons/fi";

import Categories from "@/data/Categories";
import SubCategories from "@/data/SubCategories";

const Header = () => {
    const [hoveredImage, setHoveredImage] = useState(null);

    return (
        <header className="sticky top-0 w-full bg-[#FFFDF9] z-50">
            <div className="flex items-end text-gray-700 justify-between px-8 py-5 max-w-[1600px] mx-auto w-full gap-4 xl:gap-8">

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
                <Link href="/about-us" className="text-sm uppercase  hover:text-[#615236] ">ABOUT US</Link>

                <Link href="/" className="flex-shrink-0">
                    <img src="/images/logo/sirohiLogo.svg" className="h-14" />
                </Link>

                <Link href="/our-story" className="text-sm uppercase  hover:text-[#615236]">OUR STORY</Link>
                <Link href="/happy-clients" className="text-sm uppercase  hover:text-[#615236]">HAPPY CLIENTS</Link>
                <Link href="/contact-us" className="text-sm uppercase  hover:text-[#615236]">CONTACT US</Link>

                <Link
                    href="/request-quote"
                    className="flex items-center gap-1 text-sm font-bold border-b-2 border-gray-800"
                >
                    REQUEST A QUOTE <FiArrowRight />
                </Link>

            </div>
        </header>
    );
};

export default Header;