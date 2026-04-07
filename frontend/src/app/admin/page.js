"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
     
      window.location.href = "/admin/dashboard";
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}
    >
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-1/3 bg-[#645643] flex-col items-center justify-center px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <Image
          src="/images/logo/sirohiLogo.svg"
          alt="Sirohi Handicraft"
          width={200}
          height={60}
          priority
          className="relative z-10 brightness-0 invert"
        />
        <p className="relative z-10 text-[#e8ddd0] text-xs tracking-[0.3em] uppercase mt-6 text-center">
          Crafted with tradition.<br />Managed with precision.
        </p>
      </div>

      {/* Right login panel */}
      <div className="w-full lg:w-2/3 bg-[#FFFDF9] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Image
              src="/images/logo/sirohiLogo.svg"
              alt="Sirohi Handicraft"
              width={150}
              height={44}
              priority
            />
          </div>

          <h1 className="text-[#3b2f1e] text-2xl font-semibold tracking-wide mb-1">
            Welcome back
          </h1>
          <p className="text-[#9e8f7e] text-xs tracking-widest uppercase mb-8">
            Sign in to admin portal
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@sirohihandicraft.com"
                required
                className="w-full border border-[#ddd5c8] rounded-xl px-4 py-3 text-sm text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full border border-[#ddd5c8] rounded-xl px-4 py-3 pr-16 text-sm text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-widest text-[#9e8f7e] hover:text-[#645643] uppercase transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-[#645643] hover:bg-[#4d4233] active:scale-[0.98] text-white text-xs font-bold tracking-widest uppercase py-4 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[#c4b9ac] text-[10px] tracking-widest uppercase mt-10">
            Sirohi Handicraft © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
