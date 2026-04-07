"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { Package, Tag, Layers } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, categories: 0, subcategories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, c, s] = await Promise.all([
          apiClient("/api/products?limit=1").then((r) => r?.json()),
          apiClient("/api/categories").then((r) => r?.json()),
          apiClient("/api/subcategories").then((r) => r?.json()),
        ]);
        setStats({
          products: p?.pagination?.total ?? 0,
          categories: c?.count ?? 0,
          subcategories: s?.count ?? 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "bg-[#645643]" },
    { label: "Categories", value: stats.categories, icon: Tag, color: "bg-[#3b2f1e]" },
    { label: "Sub Categories", value: stats.subcategories, icon: Layers, color: "bg-[#9e8f7e]" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-[#3b2f1e] tracking-wide">Dashboard</h1>
        <p className="text-xs text-[#9e8f7e] tracking-widest uppercase mt-1">Overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl p-6 flex items-center gap-4">
            <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon size={20} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3b2f1e]">
                {loading ? "—" : value}
              </p>
              <p className="text-[10px] tracking-widest text-[#9e8f7e] uppercase mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
