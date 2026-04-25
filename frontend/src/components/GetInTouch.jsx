"use client";

import React, { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com";

const inputCls = "bg-transparent border-b border-[#d2c4b3] py-2 text-sm text-[#4a4238] focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-[#b5a898] placeholder:font-light";

const GetInTouch = () => {
  const [productCategory, setProductCategory] = useState("Wooden");
  const [form, setForm] = useState({ fullName: "", companyName: "", email: "", country: "", phone: "", productsSKUs: "", orderQuantity: "", additionalRequirements: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/customer-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productCategory }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full py-8 lg:py-16 bg-[#FFFDF9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">

          {/* LEFT */}
          <div className="lg:col-span-4 flex flex-col pt-4">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#8c8273] uppercase mb-6 block">
              Get in Touch
            </span>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#4a4238] leading-[1.15] mb-8 tracking-tight">
              Let's Build Something<br className="hidden lg:block" /> Together
            </h2>
            <p className="text-sm md:text-[15px] text-gray-700 font-medium leading-relaxed mb-12 lg:max-w-sm">
              Whether You're Looking To Develop A New Product Line, Request Samples, Or Start A Long-term Supply Partnership We'd Be Glad To Hear From You.
            </p>
            <div className="flex flex-col gap-6 text-sm md:text-[15px] text-gray-800">
              <p><span className="font-extrabold text-[#2d2926]">Location:</span> Jaipur, Rajasthan, India</p>
              <p><span className="font-extrabold text-[#2d2926]">Email:</span>  pankaj@sirohihandicraft.com</p>
              <p className="leading-relaxed"><span className="font-extrabold text-[#2d2926]">Export Markets:</span> USA · UK · Europe · UAE · Qatar · Kuwait · Australia · Canada</p>
              <p><span className="font-extrabold text-[#2d2926]">Certifications:</span> Sedex Semeta · FSC Certified</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8 bg-[#FBF3E6] rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FiCheck size={28} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#4a4238] mb-2">Thank You!</h3>
                  <p className="text-sm text-[#6b6154]">We've received your inquiry and will respond within 24–48 business hours.</p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl md:text-[28px] font-extrabold text-[#4a4238] mb-4">Request a Personalized Quote</h3>
                <p className="text-sm md:text-[15px] text-[#6b6154] font-medium mb-12">For Buyers, Brands, And Retailers Looking To Discuss Pricing, Samples, And Bulk Orders.</p>

                {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">

                    {/* Left col */}
                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#4a4238]">Full Name *</label>
                        <input type="text" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Enter Full Name" required className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#4a4238]">Company Name</label>
                        <input type="text" value={form.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Enter Company Name" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#4a4238]">Email Address *</label>
                        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="Enter Email Address" required className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#4a4238]">Country</label>
                        <input type="text" value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="Enter Country" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#4a4238]">Phone / WhatsApp Number *</label>
                        <input type="text" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Enter Phone / WhatsApp Number" required className={inputCls} />
                      </div>
                    </div>

                    {/* Right col */}
                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold text-[#4a4238]">Product Category</label>
                        <div className="flex flex-wrap gap-3">
                          {["Wooden", "Marble", "Terracotta", "Paper Mache"].map((cat) => (
                            <button key={cat} type="button" onClick={() => setProductCategory(cat)}
                              className={`px-8 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${productCategory === cat ? "bg-[#645643] text-white" : "bg-[#bbaea0] text-white/90 hover:bg-[#a39789]"}`}>
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-1.5">
                        <label className="text-sm font-semibold text-[#4a4238]">Products / SKUs</label>
                        <input type="text" value={form.productsSKUs} onChange={(e) => set("productsSKUs", e.target.value)} placeholder="Enter Products / SKUs" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#4a4238]">Order Quantity</label>
                        <input type="text" value={form.orderQuantity} onChange={(e) => set("orderQuantity", e.target.value)} placeholder="Enter Order Quantity" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#4a4238]">Additional Requirements</label>
                        <input type="text" value={form.additionalRequirements} onChange={(e) => set("additionalRequirements", e.target.value)} placeholder="Enter Additional Requirements" className={inputCls} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-14">
                    <p className="text-[13px] text-gray-800 font-medium mb-6">'We respond within 24 - 48 business hours.'</p>
                    <button type="submit" disabled={submitting}
                      className="bg-[#AFA99E] hover:bg-[#9a9489] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-colors w-max disabled:opacity-60">
                      {submitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>REQUEST A QUOTE <FiArrowRight size={16} strokeWidth={2.5} /></>}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
