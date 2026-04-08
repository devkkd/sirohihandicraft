"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tag, Layers, LogOut, MessageSquare, Users, Upload } from "lucide-react";
import { apiClient } from "@/lib/apiClient";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/dashboard/products", icon: Package },
  { label: "Bulk Upload", href: "/admin/dashboard/bulk-upload", icon: Upload },
  { label: "Categories", href: "/admin/dashboard/categories", icon: Tag },
  { label: "Sub Categories", href: "/admin/dashboard/subcategories", icon: Layers },
  { label: "Inquiries", href: "/admin/dashboard/inquiries", icon: MessageSquare },
  { label: "Customer Inquiries", href: "/admin/dashboard/customer-inquiries", icon: Users },
];

export default function AdminSidebar({ onClose }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await apiClient("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  return (
    <aside className="flex flex-col h-full bg-[#FFFDF9] border-r border-[#e8e0d5] w-64">
      {/* Logo */}
      <div className="h-16 px-6 border-b border-[#e8e0d5] flex items-center justify-center shrink-0">
        <Image
          src="/images/logo/sirohiLogo.svg"
          alt="Sirohi Handicraft"
          width={120}
          height={36}
          priority
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        <p className="text-[9px] font-bold tracking-[0.2em] text-[#b5a898] uppercase px-3 mb-2">
          Menu
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? "bg-[#645643] text-white font-semibold"
                  : "text-[#615236] hover:bg-[#f0ebe3]"
              }`}
            >
              <Icon size={16} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-[#e8e0d5]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-[#9e8f7e] hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <LogOut size={16} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  );
}
