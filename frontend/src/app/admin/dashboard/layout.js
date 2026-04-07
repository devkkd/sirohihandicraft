"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    apiClient("/api/auth/me")
      .then((res) => res?.json())
      .then((data) => {
        if (!data?.success) {
          router.replace("/admin");
        } else {
          setAdmin(data.admin);
          setChecking(false);
        }
      })
      .catch(() => router.replace("/admin"));
  }, [router]);

  if (checking) {
    return (
      <div
        className="min-h-screen bg-[#FFFDF9] flex items-center justify-center"
        style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs tracking-widest text-[#9e8f7e] uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen bg-[#f5f0ea] overflow-hidden"
      style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}
    >
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full z-50">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader adminName={admin?.name} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
