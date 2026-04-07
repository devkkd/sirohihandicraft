"use client";

import { useState, useRef } from "react";
import { X, ImageIcon } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data.url;
}

// Single image upload (thumbnail)
export function ThumbnailUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[#ddd5c8] group">
          <img src={value} alt="Thumbnail" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500 rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-all">
            <X size={13} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-[#ddd5c8] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#645643] hover:bg-[#faf7f3] transition-all disabled:opacity-60 cursor-pointer">
          {uploading ? (
            <div className="w-6 h-6 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <div className="w-10 h-10 bg-[#f0ebe3] rounded-full flex items-center justify-center">
                <ImageIcon size={18} className="text-[#9e8f7e]" />
              </div>
              <p className="text-xs text-[#9e8f7e]">Click to upload thumbnail</p>
              <p className="text-[10px] text-[#c4b9ac]">PNG, JPG up to 5MB</p>
            </>
          )}
        </button>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])} />
    </div>
  );
}

// Multiple gallery upload
export function GalleryUpload({ images, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setError("");
    setUploading(true);
    try {
      const uploaded = await Promise.all(Array.from(files).map(uploadFile));
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const remove = (idx) => onChange(images.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {images.map((url, idx) => (
          <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-[#e8e0d5]">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => remove(idx)}
              className="absolute top-1 right-1 bg-white/90 hover:bg-white text-red-500 rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-all">
              <X size={11} />
            </button>
          </div>
        ))}

        {/* Add more button */}
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="aspect-square border-2 border-dashed border-[#ddd5c8] rounded-xl flex flex-col items-center justify-center gap-1 hover:border-[#645643] hover:bg-[#faf7f3] transition-all disabled:opacity-60 cursor-pointer">
          {uploading ? (
            <div className="w-5 h-5 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ImageIcon size={16} className="text-[#c4b9ac]" />
              <span className="text-[9px] text-[#c4b9ac]">Add</span>
            </>
          )}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {/* multiple={true} allows selecting multiple files at once */}
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
}

// Default export for backward compat (subcategory page uses this)
export default function ImageUpload({ value, onChange }) {
  return <ThumbnailUpload value={value} onChange={onChange} />;
}
