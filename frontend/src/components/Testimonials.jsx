"use client";
import React from 'react';

const testimonialsData = [
  {
    id: 1,
    text: "Working with Sirohi Handicraft has been a great experience. Their attention to detail and product finishing is always up to the mark.",
    name: "Michael Anderson",
    country: "USA",
  },
  {
    id: 2,
    text: "They understand our design requirements very well and deliver exactly what we expect. Reliable and professional at every step.",
    name: "Sarah Williams",
    country: "UK",
  },
  {
    id: 3,
    text: "The combination of wood and marble products they offer is unique and fits perfectly with our collection.",
    name: "Ahmed Al-Farsi",
    country: "UAE",
  },
  {
    id: 4,
    text: "Sampling process is smooth and quick. They are flexible with custom developments – exactly what a growing brand needs.",
    name: "Emma Roberts",
    country: "Australia",
  },
  {
    id: 5,
    text: "Quality consistency in bulk production is something we truly appreciate. Not every supplier can maintain that at scale.",
    name: "James Walker",
    country: "Canada",
  },
  {
    id: 6,
    text: "Their wooden and marble collections add real value to our product line. A trustworthy supplier with strong production control.",
    name: "Mohammed Al-Sabah",
    country: "Kuwait",
  },
  {
    id: 7,
    text: "Very reliable when it comes to timelines and communication. Orders are always handled professionally without back-and-forth.",
    name: "Daniel Carter",
    country: "USA",
  },
  {
    id: 8,
    text: "Clear communication and professional approach make them stand out. We look forward to continuing our long-term partnership.",
    name: "Sophia Taylor",
    country: "USA",
  },
];

const Testimonials = () => {
  
  // Reusable Star Rating Component (Black/Dark Gray to match design)
  const Stars = () => (
    <div className="flex gap-1 mt-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-[#2d2926]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  // Reusable Card Component
  const TestimonialCard = ({ data }) => (
    <div className="w-[320px] sm:w-[380px] flex-shrink-0 whitespace-normal bg-white border border-[#e0dacd] p-8 md:p-10 rounded-[2rem] flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default">
      <div>
        <span className="text-xl font-serif text-gray-800 leading-none">"</span>
        <p className="text-sm md:text-[15px] leading-relaxed text-gray-700 mt-2 mb-8 font-medium">
          {data.text}
        </p>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">{data.name}</span>
        <span className="text-xs text-gray-500 mb-2">{data.country}</span>
        <Stars />
      </div>
    </div>
  );

  return (
    <section className="w-full py-8 lg:py-12 bg-[#FFFDF9] overflow-hidden">
      
      {/* Header Area */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12 lg:mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#8c8273] uppercase mb-4 block">
            Client Words
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#4a4238] tracking-tight">
            What Our Partners Say
          </h2>
        </div>
        <p className="text-sm md:text-[15px] text-[#6b6154] font-medium lg:max-w-md pb-1">
          Long-term Relationships Built On Consistency, Transparency, And Craft.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 w-full relative">
        
        {/* Row 1: Scrolling Left */}
        <div className="flex whitespace-nowrap animate-marquee-left w-max pause-on-hover pb-2">
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-6 px-3">
              {testimonialsData.map((testimonial) => (
                <TestimonialCard key={`row1-${arrayIndex}-${testimonial.id}`} data={testimonial} />
              ))}
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex whitespace-nowrap animate-marquee-right w-max pause-on-hover pt-2">
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-6 px-3">
              {/* Reversing the data array so the rows don't look identical */}
              {[...testimonialsData].reverse().map((testimonial) => (
                <TestimonialCard key={`row2-${arrayIndex}-${testimonial.id}`} data={testimonial} />
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* Custom Keyframe Animations */}
      <style jsx>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        .animate-marquee-left {
          animation: marqueeLeft 50s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marqueeRight 50s linear infinite;
        }

        /* Hover pause logic */
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
      
    </section>
  );
};

export default Testimonials;