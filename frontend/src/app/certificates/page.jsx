import GetInTouch from "@/components/GetInTouch";
import Globe from "@/components/Globe";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const certificates = [
  {
    id: "fsc",
    badge: (
      <img 
        src="/images/certificate/Union.png" 
        alt="FSC Logo" 
        className="w-12 h-12 object-contain"
      />
    ),
    title: "FSC Chain of Custody Certification",
    description:
      "Confirms that all materials used are responsibly sourced and traceable through certified supply chains. Ensures compliance with global sustainability and forest management standards.",
    link: "#",
    // Replace this URL with your actual FSC certificate image path
    certificateImage: "/images/certificate/image 18.png", 
    imageAlt: "FSC Certificate Document",
  },
  {
    id: "sedex",
    badge: (
      <img 
        src="/images/certificate/Union.png" 
        alt="FSC Logo" 
        className="w-12 h-12 object-contain"
      />
    ),
    id: "smeta",
    badge: (
      <div className="flex items-center gap-4">
        <img src="/images/certificate/Group 138.png" alt="Sedex Logo" className="w-24 h-24 object-contain" />
        <img src="/images/certificate/Group 137.png" alt="SMETA Logo" className="w-24 h-24 object-contain" />
      </div>
    ),
   
    title: "Sedex / SMETA Corrective Action Plan Report (CAPR)",
    description:
      "Evaluates workplace practices across labor, health & safety, environment, and business ethics. Highlights improvements and corrective actions to meet international ethical trade standards.",
    link: "#",
    // Replace this URL with your actual SMETA certificate image path
    certificateImage: "/images/certificate/image 19.png",
    imageAlt: "SMETA Report Document",
  },
];

export default function CertificatesPage() {
  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen py-16 md:py-24">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-sm font-bold tracking-[0.15em] text-[#4a4238] uppercase mb-4">
            CERTIFICATE
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#5c4f3d] tracking-tight mb-6">
            Our Certification
          </h1>
          <p className= "flex flex-col gap-6 text-sm md:text-[15px] text-gray-800 font-medium max-w-4xl leading-relaxed">
            Industry-recognized certification that validates your skills, knowledge, and professional expertise.
          </p>
        </div>

        {/* Certificates List */}
        <div className="flex flex-col gap-32">
          {certificates.map((cert, i) => (
            <div
              key={cert.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Content Area */}
              <div className="flex-1 space-y-6">
                <div className="mb-4 flex">{cert.badge}</div>
                
                <h2 className="text-2xl mb-3 md:text-4xl font-bold text-[#3E362E] leading-tight">
                  {cert.title}
                </h2>
                
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {cert.description}
                </p>

                <a
                  href={cert.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#3E362E] group transition-all"
                >
                  <span className="border-b-2 border-[#3E362E] pb-0.5 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
                    See Certificate
                  </span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Image Area */}
              <div className="flex-1 w-full">
                {cert.id === "smeta" ? (
                  <div className="flex items-center gap-4">
                    <img src={cert.certificateImage} alt={cert.imageAlt} className="w-full max-h-[550px] object-contain" />
                    {/* <img src="/images/certificate/image 19.png" alt="SMETA Document 2" className="w-1/2 max-h-72 object-contain" /> */}
                  </div>
                ) : (
                  <img src={cert.certificateImage} alt={cert.imageAlt} className="w-full max-h-[550px] object-contain" />
                )}
              </div>
            </div>
          ))}
        </div>

         {/* <Globe/> */}
         <GetInTouch/>
      </div>

    </main>
  );
}