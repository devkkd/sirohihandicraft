"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { Package, Tag, Layers, MessageSquare, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const statusColors = {
  new: "bg-blue-50 text-blue-600",
  "in-progress": "bg-yellow-50 text-yellow-600",
  resolved: "bg-green-50 text-green-600",
};

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, categories: 0, subcategories: 0, inquiries: 0, customerInquiries: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentCustomerInquiries, setRecentCustomerInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, c, s, inq, cinq] = await Promise.all([
          apiClient("/api/products?limit=1").then((r) => r?.json()),
          apiClient("/api/categories").then((r) => r?.json()),
          apiClient("/api/subcategories").then((r) => r?.json()),
          apiClient("/api/inquiries?limit=5").then((r) => r?.json()),
          apiClient("/api/customer-inquiries?limit=5").then((r) => r?.json()),
        ]);
        setStats({
          products: p?.pagination?.total ?? 0,
          categories: c?.count ?? 0,
          subcategories: s?.count ?? 0,
          inquiries: inq?.pagination?.total ?? 0,
          customerInquiries: cinq?.pagination?.total ?? 0,
        });
        setRecentInquiries(inq?.data || []);
        setRecentCustomerInquiries(cinq?.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "bg-[#645643]", href: "/admin/dashboard/products" },
    { label: "Categories", value: stats.categories, icon: Tag, color: "bg-[#3b2f1e]", href: "/admin/dashboard/categories" },
    { label: "Sub Categories", value: stats.subcategories, icon: Layers, color: "bg-[#9e8f7e]", href: "/admin/dashboard/subcategories" },
    { label: "Product Inquiries", value: stats.inquiries, icon: MessageSquare, color: "bg-[#645643]", href: "/admin/dashboard/inquiries" },
    { label: "Customer Inquiries", value: stats.customerInquiries, icon: Users, color: "bg-[#3b2f1e]", href: "/admin/dashboard/customer-inquiries" },
  ];

  return (
    <div style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-[#3b2f1e] tracking-wide">Dashboard</h1>
        <p className="text-xs text-[#9e8f7e] tracking-widest uppercase mt-1">Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {statCards.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href} className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl p-5 flex items-center gap-3 hover:border-[#645643] transition-colors">
            <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon size={16} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xl font-bold text-[#3b2f1e]">{loading ? "—" : value}</p>
              <p className="text-[9px] tracking-widest text-[#9e8f7e] uppercase leading-tight mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Product Inquiries */}
        <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e0d5]">
            <h2 className="text-sm font-semibold text-[#3b2f1e]">Recent Product Inquiries</h2>
            <Link href="/admin/dashboard/inquiries" className="text-[10px] text-[#645643] tracking-widest uppercase flex items-center gap-1 hover:underline">
              View All <ArrowRight size={11} />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" /></div>
          ) : recentInquiries.length === 0 ? (
            <p className="text-center text-[#9e8f7e] text-xs py-8">No inquiries yet</p>
          ) : (
            <div className="divide-y divide-[#f0ebe3]">
              {recentInquiries.map((inq) => (
                <div key={inq._id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#3b2f1e] truncate">{inq.name}</p>
                    <p className="text-[11px] text-[#9e8f7e] truncate">{inq.email} · {inq.products?.length || 0} product{inq.products?.length !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full ${statusColors[inq.status]}`}>
                      {inq.status}
                    </span>
                    <p className="text-[10px] text-[#c4b9ac] hidden sm:block">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customer Inquiries */}
        <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e0d5]">
            <h2 className="text-sm font-semibold text-[#3b2f1e]">Recent Customer Inquiries</h2>
            <Link href="/admin/dashboard/customer-inquiries" className="text-[10px] text-[#645643] tracking-widest uppercase flex items-center gap-1 hover:underline">
              View All <ArrowRight size={11} />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" /></div>
          ) : recentCustomerInquiries.length === 0 ? (
            <p className="text-center text-[#9e8f7e] text-xs py-8">No inquiries yet</p>
          ) : (
            <div className="divide-y divide-[#f0ebe3]">
              {recentCustomerInquiries.map((inq) => (
                <div key={inq._id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#3b2f1e] truncate">{inq.fullName}</p>
                    <p className="text-[11px] text-[#9e8f7e] truncate">{inq.email} · {inq.productCategory}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full ${statusColors[inq.status]}`}>
                      {inq.status}
                    </span>
                    <p className="text-[10px] text-[#c4b9ac] hidden sm:block">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
