"use client";

import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com";
const LIMIT = 10;

export default function CollectionsPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchImages = async (p = 1, append = false) => {
    append ? setLoadingMore(true) : setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/catalog?page=${p}&limit=${LIMIT}`);
      const data = await res.json();
      setImages((prev) => append ? [...prev, ...(data.data || [])] : data.data || []);
      setHasMore(p < (data.pagination?.pages || 1));
      setTotal(data.pagination?.total || 0);
    } finally {
      append ? setLoadingMore(false) : setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage, true);
  };

  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-12 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#8c8273] uppercase mb-4">
            All Collections
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#4a4238] tracking-tight mb-6">
            Our All Collection of Products
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Explore our complete range of handcrafted products. Thoughtfully designed for buyers with many tastes and styles.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {images.map((img) => (
                <div key={img._id} className="flex flex-col gap-2">
                  <div className="w-full aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.sku || img.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex flex-col items-center gap-3 mt-16">
             
                <button onClick={loadMore} disabled={loadingMore}
                  className="flex items-center gap-2 bg-[#645643] hover:bg-[#4d4233] text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-60">
                  {loadingMore
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><FiArrowRight size={14} /> LOAD MORE</>}
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}
