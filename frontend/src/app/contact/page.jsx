"use client";

import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function ContactPage() {
  const [productCategory, setProductCategory] = useState("Wooden");

  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen pt-10 lg:pt-14 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#4a4238] uppercase mb-6 block">
            CONTACT US
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#5c4f3d] tracking-tight mb-8">
            We'd Be Glad To Hear From You
          </h1>
          <div className="text-sm md:text-[15px] text-gray-700 max-w-4xl leading-relaxed font-medium flex flex-col gap-6">
            <p>
              Whether You're A Buyer Looking To Place An Order, A Brand Exploring A New Product Range, Or A Retailer Wanting To Discuss Samples Our Team Is Ready To Help.
            </p>
            <p>
              We Work With Clients Across The Usa, Uk, Europe, The Gulf Region, Australia, And Canada. Every Enquiry Is Taken Seriously And Handled Personally Not By An Automated System.
            </p>
            <p>
              Use The Form Below, Or Reach Us Directly Through Any Of The Channels Listed. <br className="hidden md:block" />
              We Will Come Back To You With A Clear, Honest Response No Sales Pressure, No Unnecessary Follow-ups.
            </p>
          </div>
        </div>

        {/* ================= FORM & INFO GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-20 lg:mb-28">
          
          {/* --- LEFT: ENQUIRY FORM --- */}
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#4a4238] mb-4">
              Send an Enquiry
            </h2>
            <p className="text-sm md:text-[15px] text-[#6b6154] font-medium mb-12">
              Fill In The Form Below And We Will Come Back To You Within 24 - 48 Business Hours. <br className="hidden md:block" />
              The More Detail You Can Share About Your Requirements, The More Useful Our Response Will Be.
            </p>

            <form className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* Form Left Column */}
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Full Name</label>
                    <input type="text" placeholder="Enter Full Name" className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Company Name</label>
                    <input type="text" placeholder="Enter Company Name" className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Email Address</label>
                    <input type="email" placeholder="Enter Email Address" className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Country</label>
                    <input type="text" placeholder="Enter Country" className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Phone / WhatsApp Number</label>
                    <input type="text" placeholder="Enter Phone / WhatsApp Number" className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400" />
                  </div>
                </div>

                {/* Form Right Column */}
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-semibold text-[#4a4238]">Product Category</label>
                    <div className="flex gap-4">
                      <button 
                        type="button" 
                        onClick={() => setProductCategory("Wooden")}
                        className={`px-8 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${productCategory === "Wooden" ? "bg-[#645643] text-white" : "bg-[#bbaea0] text-white/90 hover:bg-[#a39789]"}`}
                      >
                        Wooden
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setProductCategory("Marble")}
                        className={`px-8 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${productCategory === "Marble" ? "bg-[#645643] text-white" : "bg-[#bbaea0] text-white/90 hover:bg-[#a39789]"}`}
                      >
                        Marble
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-1.5">
                    <label className="text-sm font-semibold text-[#4a4238]">Products / SKUs</label>
                    <input type="text" placeholder="SH-CBW-26-38" className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Order Quantity</label>
                    <input type="text" placeholder="Enter Order Quantity" className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#4a4238]">Additional Requirements</label>
                    <input type="text" placeholder="Enter Additional Requirements" className="bg-transparent border-b border-[#d2c4b3] py-2 text-sm focus:outline-none focus:border-[#4a4238] transition-colors placeholder:text-gray-400" />
                  </div>
                </div>

              </div>

              {/* Submit */}
              <div className="mt-14">
                <p className="text-[13px] text-gray-800 font-medium mb-6">
                  'We respond within 24 - 48 business hours.'
                </p>
                <button 
                  type="submit"
                  className="bg-[#AFA99E] hover:bg-[#9a9489] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-colors w-max"
                >
                  SEND ENQUIRY <FiArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </div>

          {/* --- RIGHT: DIRECT CONTACT CARD --- */}
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#4a4238] mb-8">
              Reach Us Directly
            </h2>
            
            <div className="bg-[#FBF3E6] rounded-[2rem] flex flex-col shadow-sm">
              
              <div className="p-8 lg:p-10 border-b border-[#e0dacd]">
                <h4 className="text-sm font-bold text-[#8c8273] mb-4">Email</h4>
                <a href="mailto:info@sirohihandicrafted.com" className="text-xl md:text-[22px] font-bold text-[#4a4238] hover:text-[#645643] transition-colors block mb-2">
                  info@sirohihandicrafted.com
                </a>
                <p className="text-sm text-gray-700 font-medium">Best for detailed enquiries, product lists, or sharing references</p>
              </div>

              <div className="p-8 lg:p-10 border-b border-[#e0dacd]">
                <h4 className="text-sm font-bold text-[#8c8273] mb-4">WhatsApp</h4>
                <a href="tel:+919352606586" className="text-xl md:text-[22px] font-bold text-[#4a4238] hover:text-[#645643] transition-colors block mb-2">
                  +91-9352606586
                </a>
                <p className="text-sm text-gray-700 font-medium">Best for quick questions, sample follow-ups, or photo sharing</p>
              </div>

              <div className="p-8 lg:p-10 border-b border-[#e0dacd]">
                <h4 className="text-sm font-bold text-[#8c8273] mb-4">Address - 1st</h4>
                <h3 className="text-[17px] font-bold text-[#4a4238] mb-2">Sirohi Handicraft</h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  Plot No-37, & 54, Near Canara Bank Near New Riico Ind. Jaipur - Rajasthan
                </p>
              </div>

              <div className="p-8 lg:p-10 border-b border-[#e0dacd]">
                <h4 className="text-sm font-bold text-[#8c8273] mb-4">Address - 2nd</h4>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  G188, RIICO Industrial Area EXT. II, Bagru Jaipur - 303007 Rajasthan
                </p>
              </div>

              <div className="p-8 lg:p-10 border-b border-[#e0dacd]">
                <h4 className="text-sm font-bold text-[#8c8273] mb-4">Business Hours</h4>
                <h3 className="text-[17px] font-bold text-[#4a4238] mb-2">Mon - Sat, 9:00 AM - 6:00 PM IST</h3>
                <p className="text-sm text-gray-700 font-medium">We are closed on Sundays and Indian public holidays.</p>
              </div>

              <div className="p-8 lg:p-10">
                <h4 className="text-sm font-bold text-[#8c8273] mb-4">Certifications</h4>
                <h3 className="text-[17px] font-bold text-[#4a4238] mb-2">Sedex Semeta · FSC Certified</h3>
                <p className="text-sm text-gray-700 font-medium">Documentation available on request for compliance purposes</p>
              </div>

            </div>
          </div>

        </div>

        {/* ================= SINGLE MAP SECTION ================= */}
        <div className="flex flex-col w-full">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#4a4238] mb-8">
            Visit our Store
          </h2>
          <div className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden bg-gray-200 border border-[#e0dacd] shadow-sm">
            {/* Replace the src below with your actual Google Maps embed URL for Sirohi Handicraft */}
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113946.0699052062!2d75.71960241009139!3d26.815259970929285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc900223ed3bb%3A0x6b6c0032e6f9fc53!2sJaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1714400000000!5m2!1sen!2sus"
              title="Sirohi Handicraft Location"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </main>
  );
}