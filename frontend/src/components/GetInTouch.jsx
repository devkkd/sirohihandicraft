"use client";

import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const GetInTouch = () => {
  const [productCategory, setProductCategory] = useState("Wooden");

  return (
    <section className="w-full py-8 lg:py-16 bg-[#FFFDF9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: TEXT CONTENT ================= */}
          <div className="lg:col-span-4 flex flex-col pt-4">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#8c8273] uppercase mb-6 block">
              Get in Touch
            </span>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#4a4238] leading-[1.15] mb-8 tracking-tight">
              Let's Build Something<br className="hidden lg:block" /> Together
            </h2>
            
            <p className="text-sm md:text-[15px] text-gray-700 font-medium leading-relaxed mb-12 lg:max-w-sm">
              Whether You're Looking To Develop A New Product Line, Request
              Samples, Or Start A Long-term Supply Partnership We'd Be Glad To
              Hear From You.
            </p>

            <div className="flex flex-col gap-6 text-sm md:text-[15px] text-gray-800">
              <p>
                <span className="font-extrabold text-[#2d2926]">Location:</span> Jaipur, Rajasthan, India
              </p>
              <p>
                <span className="font-extrabold text-[#2d2926]">Email:</span> info@sirohihandicrafted.com
              </p>
              <p className="leading-relaxed">
                <span className="font-extrabold text-[#2d2926]">Export Markets:</span> USA · UK · Europe · UAE · Qatar · Kuwait · Australia · Canada
              </p>
              <p>
                <span className="font-extrabold text-[#2d2926]">Certifications:</span> Sedex Semeta · FSC Certified
              </p>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: FORM CARD ================= */}
          <div className="lg:col-span-8 bg-[#FBF3E6] rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-sm">
            <h3 className="text-2xl md:text-[28px] font-extrabold text-[#4a4238] mb-4">
              Request a Personalized Quote
            </h3>
            <p className="text-sm md:text-[15px] text-[#6b6154] font-medium mb-12">
              For Buyers, Brands, And Retailers Looking To Discuss Pricing, Samples, And Bulk Orders.
            </p>

            <form className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* --- Left Form Column --- */}
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter Full Name" 
                      className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400 placeholder:font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter Company Name" 
                      className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400 placeholder:font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Enter Email Address" 
                      className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400 placeholder:font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Country</label>
                    <input 
                      type="text" 
                      placeholder="Enter Country" 
                      className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400 placeholder:font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Phone / WhatsApp Number</label>
                    <input 
                      type="text" 
                      placeholder="Enter Phone / WhatsApp Number" 
                      className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400 placeholder:font-light"
                    />
                  </div>
                </div>

                {/* --- Right Form Column --- */}
                <div className="flex flex-col gap-10">
                  
                  {/* Category Toggle */}
                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-semibold text-[#4a4238]">Product Category</label>
                    <div className="flex gap-4">
                      <button 
                        type="button" 
                        onClick={() => setProductCategory("Wooden")}
                        className={`px-8 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
                          productCategory === "Wooden" 
                            ? "bg-[#645643] text-white" 
                            : "bg-[#bbaea0] text-white/90 hover:bg-[#a39789]"
                        }`}
                      >
                        Wooden
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setProductCategory("Marble")}
                        className={`px-8 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
                          productCategory === "Marble" 
                            ? "bg-[#645643] text-white" 
                            : "bg-[#bbaea0] text-white/90 hover:bg-[#a39789]"
                        }`}
                      >
                        Marble
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-1.5">
                    <label className="text-sm font-semibold text-[#4a4238]">Products / SKUs</label>
                    <input 
                      type="text" 
                      placeholder="Enter Products / SKUs" 
                      className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400 placeholder:font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Order Quantity</label>
                    <input 
                      type="text" 
                      placeholder="Enter Order Quantity" 
                      className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400 placeholder:font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Additional Requirements</label>
                    <input 
                      type="text" 
                      placeholder="Enter Additional Requirements" 
                      className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400 placeholder:font-light"
                    />
                  </div>
                </div>

              </div>

              {/* --- Footer & Submit --- */}
              <div className="mt-14">
                <p className="text-[13px] text-gray-800 font-medium mb-6">
                  'We respond within 24 - 48 business hours.'
                </p>
                <button 
                  type="submit"
                  className="bg-[#AFA99E] hover:bg-[#9a9489] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-colors w-max"
                >
                  REQUEST A QUOTE <FiArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GetInTouch;