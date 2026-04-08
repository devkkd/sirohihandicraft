"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { FiTrash2, FiArrowRight, FiShoppingBag, FiCheck } from "react-icons/fi";
import { ImageIcon } from "lucide-react";

const inputCls = "w-full border border-[#ddd5c8] rounded-xl px-4 py-3 text-sm text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all bg-white";

export default function CartPage() {
  const { items, removeFromCart, clearCart, totalItems, mounted } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          products: items.map((i) => ({
            productId: i._id,
            name: i.name,
            sku: i.sku,
            moq: i.moq,
            thumbnail: i.thumbnail,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send");
      setSubmitted(true);
      clearCart();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (submitted) {
    return (
      <main className="w-full bg-[#FFFDF9] min-h-screen flex items-center justify-center px-6"
        style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>
        <div className="text-center flex flex-col items-center gap-6 max-w-md">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <FiCheck size={28} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#3b2f1e] mb-2">Enquiry Sent!</h1>
            <p className="text-sm text-[#9e8f7e] leading-relaxed">
              Thank you. Our team will get back to you within 24 hours.
            </p>
          </div>
          <Link href="/" className="bg-[#645643] hover:bg-[#4d4233] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest transition-colors">
            CONTINUE BROWSING
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="w-full bg-[#FFFDF9] min-h-screen flex items-center justify-center px-6"
        style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>
        <div className="text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-[#f0ebe3] rounded-full flex items-center justify-center">
            <FiShoppingBag size={32} className="text-[#9e8f7e]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#3b2f1e] mb-2">Your enquiry list is empty</h1>
            <p className="text-sm text-[#9e8f7e]">Browse our products and add items to enquire</p>
          </div>
          <Link href="/" className="bg-[#645643] hover:bg-[#4d4233] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest transition-colors">
            EXPLORE PRODUCTS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-12 pb-24 px-6"
      style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>
      <div className="max-w-[1100px] mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#3b2f1e] tracking-tight">Enquiry List</h1>
          <p className="text-xs text-[#9e8f7e] tracking-widest uppercase mt-1">
            {totalItems} product{totalItems !== 1 ? "s" : ""} selected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT: Products */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold tracking-widest text-[#615236] uppercase">Selected Products</p>
              <button onClick={clearCart} className="text-[10px] text-[#c4b9ac] hover:text-red-500 tracking-widest uppercase transition-colors">
                Clear All
              </button>
            </div>

            <div className="bg-white border border-[#e8e0d5] rounded-2xl overflow-hidden">
              {items.map((item, i) => (
                <div key={item._id}
                  className={`flex items-center gap-4 px-5 py-4 ${i !== items.length - 1 ? "border-b border-[#f0ebe3]" : ""}`}>
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f5f0ea] shrink-0">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={16} className="text-[#c4b9ac]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.slug}`}
                      className="font-semibold text-[#3b2f1e] hover:text-[#645643] text-sm truncate block transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-[10px] font-mono text-[#9e8f7e] mt-0.5">{item.sku}</p>
                    <p className="text-[10px] text-[#9e8f7e]">MOQ: {item.moq}</p>
                  </div>
                  <button onClick={() => removeFromCart(item._id)}
                    className="text-[#c4b9ac] hover:text-red-500 transition-colors p-1 shrink-0">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6">
            <h2 className="text-xs font-bold text-[#3b2f1e] tracking-widest uppercase mb-6">Your Details</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">Full Name *</label>
                <input value={form.name} onChange={(e) => set("name", e.target.value)}
                  placeholder="John Smith" required className={inputCls} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">Email *</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                  placeholder="john@company.com" required className={inputCls} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">Phone *</label>
                <input value={form.phone} onChange={(e) => set("phone", e.target.value)}
                  placeholder="+1 234 567 8900" required className={inputCls} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">Company</label>
                <input value={form.company} onChange={(e) => set("company", e.target.value)}
                  placeholder="Company Name" className={inputCls} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">Message</label>
                <textarea value={form.message} onChange={(e) => set("message", e.target.value)}
                  placeholder="Any specific requirements or questions..." rows={3}
                  className={`${inputCls} resize-none`} />
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase py-4 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                {submitting
                  ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><FiArrowRight size={14} /> SEND ENQUIRY</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
