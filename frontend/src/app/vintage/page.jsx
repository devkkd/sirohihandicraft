import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function VintagePage() {
  return (
    <main
      className="w-full bg-[#FFFDF9] min-h-[85vh] flex flex-col items-center justify-center px-6 text-center"
      style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}
    >
      <span className="text-[10px] font-bold tracking-[0.25em] text-[#9e8f7e] uppercase mb-6 block">
        Coming Soon
      </span>

      <h1 className="text-3xl md:text-4xl font-extrabold text-[#5c4f3d] tracking-tight mb-6 leading-[1.05]">
        Sirohi Vintage
      </h1>

      <p className="text-sm md:text-[15px] text-[#6b6154] font-medium max-w-lg leading-relaxed mb-4">
        A new collection rooted in aged materials, heritage craft techniques, and old-world character. Sirohi Handicraft is currently working on distressed wood finishes, antique hardware pairings, and traditional Rajasthani carving motifs — built for global buyers who value provenance.
      </p>

      <p className="text-xs text-[#9e8f7e] mb-10 tracking-wide">
        Est. 1998 · Jaipur, Rajasthan
      </p>

      <div className="w-16 h-px bg-[#d2c4b3] mb-10" />

      <Link href="/contact">
        <button className="flex items-center gap-2 bg-[#645643] hover:bg-[#4d4233] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors">
          REGISTER INTEREST <FiArrowRight size={14} strokeWidth={2.5} />
        </button>
      </Link>
    </main>
  );
}
