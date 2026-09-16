"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import api from "@/lib/axios";



const normalizeCategory = (category) =>
  category.toLowerCase().replace(/\s+/g, " ").trim();


export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get("/api/blogs");

        const result = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];

        if (mounted) {
          setBlogs(result);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);

        if (mounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load articles."
          );
          setBlogs([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  const normalizeBlog = (blog) => {
    const image =
      typeof blog.image === "string"
        ? blog.image
        : blog.image?.url || "";

    const publishedDate = blog.publishedAt
      ? new Date(blog.publishedAt)
      : blog.createdAt
        ? new Date(blog.createdAt)
        : null;

    return {
      ...blog,
      id: blog._id || blog.id,
      image,
      imageAlt:
        typeof blog.image === "object"
          ? blog.image?.alt || ""
          : blog.imageAlt || "",
      date:
        publishedDate && !Number.isNaN(publishedDate.getTime())
          ? publishedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "",
    };
  };

  const normalizedBlogs = useMemo(
    () => blogs.map(normalizeBlog),
    [blogs]
  );
  const categories = useMemo(() => {
  const uniqueCategories = [
    ...new Set(
      normalizedBlogs
        .map((blog) => blog.category?.trim())
        .filter(Boolean)
    ),
  ];

  return ["All", ...uniqueCategories];
}, [normalizedBlogs]);

  const filteredBlogs = useMemo(() => {
    return normalizedBlogs.filter((blog) => {
      const categoryMatch =
        activeCategory === "All" ||
        normalizeCategory(blog.category || "") ===
          normalizeCategory(activeCategory);

      const searchValue = search.toLowerCase().trim();

      const searchMatch =
        !searchValue ||
        (blog.title || "").toLowerCase().includes(searchValue) ||
        (blog.description || "").toLowerCase().includes(searchValue) ||
        (blog.category || "").toLowerCase().includes(searchValue);

      return categoryMatch && searchMatch;
    });
  }, [normalizedBlogs, activeCategory, search]);

  const featuredBlog =
    normalizedBlogs.find((blog) => blog.featured) ||
    normalizedBlogs[0] ||
    null;

const gridBlogs =
  activeCategory === "All" && !search.trim()
    ? filteredBlogs.filter(
        (blog) => blog.id !== featuredBlog?.id
      )
    : filteredBlogs;

  return (
    <main
      className="w-full bg-[#FFFDF9] min-h-screen"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* =====================================================
          HERO / JOURNAL HEADER
      ====================================================== */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 md:pt-20 lg:pt-20">
        <div className="flex flex-col items-center text-center">

          {/* OUR JOURNAL */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-12 md:w-16 h-px bg-[#D2C4B3]" />

            <span
              className="text-[10px] md:text-[11px] font-medium tracking-[0.25em] text-[#6B5A4A] uppercase"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              OUR JOURNAL
            </span>

            <span className="w-12 md:w-16 h-px bg-[#D2C4B3]" />
          </div>

          {/* MAIN HEADING */}
          <h1
            className="text-[32px] sm:text-[38px] md:text-[48px] lg:text-[54px] leading-[0.98] tracking-[-0.035em] text-[#5c4f3d] max-w-[850px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
            }}
          >
            Stories That Celebrate
            <br />
            Craftsmanship
          </h1>

          {/* DESCRIPTION */}
          <p
            className="mt-6 md:mt-7 max-w-[650px] text-[13px] md:text-[14px] lg:text-[15px] leading-[1.7] text-[#5E554D]"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Insights, inspirations and behind-the-scenes stories from the
            world of handicrafts, design and sustainable living.
          </p>
        </div>
      </section>

      {/* =====================================================
          CATEGORY + SEARCH
      ====================================================== */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-10 md:mt-14 lg:mt-16">
        <div className="border-t border-[#E0DACD] border-b border-[#E0DACD] py-5">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* CATEGORY NAVIGATION */}
            <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar pb-1">

              {categories.map((category) => {
                const isActive =
                  activeCategory.toLowerCase() === category.toLowerCase();

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`
                      shrink-0
                      px-4
                      md:px-5
                      py-2.5
                      rounded-xl
                      text-[11px]
                      md:text-[12px]
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-[#F1E8DC] text-[#4A4238]"
                          : "text-[#4A4238] hover:bg-[#F7F2EC]"
                      }
                    `}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-[200px] shrink-0">

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="
                  w-full
                  h-10
                  rounded-xl
                  border
                  border-[#D2C4B3]
                  bg-transparent
                  pl-4
                  pr-10
                  text-[11px]
                  md:text-[12px]
                  text-[#4A4238]
                  placeholder:text-[#8B8177]
                  focus:outline-none
                  focus:border-[#645643]
                  transition-colors
                "
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              />

              <FiSearch
                size={16}
                strokeWidth={1.5}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A4238]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED ARTICLE
      ====================================================== */}
      {featuredBlog && activeCategory === "All" && !search.trim() && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-8 md:mt-10 lg:mt-12">

          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="
              group
              grid
              grid-cols-1
              lg:grid-cols-[1.55fr_0.95fr]
              gap-7
              lg:gap-10
              items-center
            "
          >

            {/* FEATURED IMAGE */}
            <div className="w-full aspect-[1.55/1] lg:aspect-[1.7/1] overflow-hidden rounded-[16px] bg-[#F2EEE8]">
              {featuredBlog.image ? (
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.imageAlt || featuredBlog.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.025]
                  "
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#8B8177] text-sm">
                  Sirohi Handicraft
                </div>
              )}
            </div>

            {/* FEATURED CONTENT */}
            <div className="flex flex-col lg:pr-8">

              {/* META */}
              <div className="flex items-center gap-3 mb-5">

                <span
                  className="text-[9px] md:text-[10px] tracking-[0.2em] font-medium text-[#5C4634]"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {featuredBlog.category}
                </span>

                <span className="w-px h-3 bg-[#D2C4B3]" />

                <span
                  className="text-[9px] md:text-[10px] tracking-[0.14em] text-[#6B7280]"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {featuredBlog.date}
                </span>

              </div>

              {/* TITLE */}
              <h2
                className="
                  text-[32px]
                  md:text-[36px]
                  lg:text-[38px]
                  xl:text-[42px]
                  leading-[1.03]
                  tracking-[-0.025em]
                  text-[#171513]
                  group-hover:text-[#5C4F3D]
                  transition-colors
                  duration-300
                "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                }}
              >
                {featuredBlog.title}
              </h2>

              {/* DESCRIPTION */}
              <p
                className="mt-5 max-w-[500px] text-[13px] md:text-[14px] leading-[1.7] text-[#5E554D]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {featuredBlog.description}
              </p>

              {/* READ MORE */}
              <div
                className="mt-6 flex items-center gap-2 text-[13px] md:text-[14px] text-[#5C4634]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span className="border-b border-[#8C7560] pb-0.5">
                  Read More
                </span>

                <FiArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </div>

            </div>
          </Link>
        </section>
      )}

      {/* =====================================================
          BLOG GRID
      ====================================================== */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-10 md:mt-14 lg:mt-16 pb-24 lg:pb-32">

        {loading ? (
          <div className="py-24 text-center">
            <p
              className="text-2xl text-[#5C4F3D]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Loading articles...
            </p>
          </div>
        ) : error ? (
          <div className="py-24 text-center">
            <p
              className="text-2xl text-[#5C4F3D]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Unable to load articles
            </p>
            <p
              className="mt-3 text-[13px] text-[#5E554D]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {error}
            </p>
          </div>
        ) : gridBlogs.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 lg:gap-x-8 gap-y-12 lg:gap-y-14">

            {gridBlogs.map((blog) => (

              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group block"
              >

                {/* IMAGE */}
                <div className="w-full aspect-[1.55/1] overflow-hidden rounded-[14px] bg-[#F2EEE8]">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.imageAlt || blog.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.025]
                      "
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8B8177] text-sm">
                      Sirohi Handicraft
                    </div>
                  )}
                </div>

                {/* META */}
                <div className="flex items-center gap-3 mt-4 mb-3.5">

                  <span
                    className="text-[9px] md:text-[10px] tracking-[0.18em] font-medium text-[#4A4238]"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {blog.category}
                  </span>

                  <span className="w-px h-3 bg-[#D2C4B3]" />

                  <span
                    className="text-[9px] md:text-[10px] tracking-[0.12em] text-[#6B7280]"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {blog.date}
                  </span>

                </div>

                {/* BLOG TITLE */}
                <h2
                  className="
                    text-[22px]
                    md:text-[23px]
                    lg:text-[24px]
                    leading-[1.08]
                    tracking-[-0.015em]
                    text-[#171513]
                    group-hover:text-[#5C4F3D]
                    transition-colors
                    duration-300
                  "
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                  }}
                >
                  {blog.title}
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="mt-3 text-[13px] md:text-[14px] leading-[1.7] text-[#5E554D]"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {blog.description}
                </p>

                {/* READ MORE */}
                <div
                  className="mt-5 flex items-center gap-2 text-[13px] md:text-[14px] text-[#5C4634]"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >

                  <span className="border-b border-[#8C7560] pb-0.5">
                    Read More
                  </span>

                  <FiArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </div>

              </Link>

            ))}

          </div>

        ) : (

          /* =================================================
             NO RESULTS
          ================================================== */
          <div className="py-24 text-center">

            <p
              className="text-2xl text-[#5C4F3D]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              No articles found
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 text-[13px] border-b border-[#8C7560] text-[#5C4634]"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Clear filters
            </button>

          </div>

        )}

      </section>
    </main>
  );
}