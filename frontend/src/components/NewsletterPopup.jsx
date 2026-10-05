"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

// 👇 Apni banner image ka path yahan update karo
const BANNER_IMAGE = "/images/Sirohi.png";

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={dismiss}
    >
      {/* Image card */}
      <div
        className="relative rounded-xl overflow-hidden shadow-2xl"
        style={{ maxWidth: "520px", width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close banner"
          className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Banner image */}
        <Image
          src={BANNER_IMAGE}
          alt="Sirohi Handicraft Banner"
          width={520}
          height={680}
          className="w-full h-auto block"
          priority
        />
      </div>
    </div>
  );
}
