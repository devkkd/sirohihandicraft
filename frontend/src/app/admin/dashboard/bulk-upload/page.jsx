"use client";

import { useState, useRef } from "react";
import api from "@/lib/axios";
import { Upload, Download, CheckCircle, XCircle, AlertCircle, FileSpreadsheet, ImageIcon, Copy, Check, FolderOpen } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com";

export default function BulkUploadPage() {
  // Excel upload state
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef();

  // Image upload state
  const [images, setImages] = useState([]);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgResult, setImgResult] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const imgRef = useRef();

  const handleDownloadTemplate = async () => {
    const res = await fetch(`${API_URL}/api/bulk-upload/template`, { credentials: "include" });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "product-template.xlsx"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcelUpload = async () => {
    if (!file) return;
    setUploading(true); setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/api/bulk-upload/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(data);
    } catch (err) {
      setResult({ success: false, message: err.response?.data?.message || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!images.length) return;
    setImgUploading(true); setImgResult(null);
    try {
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img));
      const { data } = await api.post("/api/bulk-upload/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImgResult(data);
      setImages([]);
    } catch (err) {
      setImgResult({ success: false, message: err.response?.data?.message || "Upload failed", uploaded: [], failed: [] });
    } finally {
      setImgUploading(false);
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const copyAll = () => {
    const all = imgResult?.uploaded?.map((u) => u.url).join("\n") || "";
    navigator.clipboard.writeText(all);
    setCopiedUrl("all");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div style={{ fontFamily: "'MonaSans', Arial, sans-serif" }} className="flex flex-col gap-8">

      <div>
        <h1 className="text-xl font-semibold text-[#3b2f1e]">Bulk Upload</h1>
        <p className="text-xs text-[#9e8f7e] tracking-widest uppercase mt-1">Upload images & products in bulk</p>
      </div>

      {/* ===== SECTION 1: IMAGE UPLOAD ===== */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-[#3b2f1e] tracking-wide uppercase">Step 1 — Upload Images to R2</h2>
        <p className="text-xs text-[#9e8f7e]">Select single images or an entire folder. Get public URLs to copy into Excel.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl p-6 flex flex-col gap-4">

          {/* Drop zone */}
          <div className="grid grid-cols-2 gap-3">
            {/* Single/Multiple images */}
            <button type="button" onClick={() => imgRef.current?.click()}
              className="h-28 border-2 border-dashed border-[#ddd5c8] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#645643] hover:bg-[#faf7f3] transition-all">
              <ImageIcon size={20} className="text-[#c4b9ac]" />
              <p className="text-xs text-[#9e8f7e] text-center px-2">Select Images</p>
              <p className="text-[10px] text-[#c4b9ac]">PNG, JPG, WEBP</p>
            </button>
            <input ref={imgRef} type="file" accept="image/*" multiple className="hidden"
              onChange={(e) => setImages((prev) => [...prev, ...Array.from(e.target.files || [])])} />

            {/* Folder upload */}
            <button type="button"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file"; input.multiple = true;
                input.webkitdirectory = true;
                input.onchange = (e) => setImages((prev) => [...prev, ...Array.from(e.target.files || [])]);
                input.click();
              }}
              className="h-28 border-2 border-dashed border-[#ddd5c8] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#645643] hover:bg-[#faf7f3] transition-all">
              <FolderOpen size={20} className="text-[#c4b9ac]" />
              <p className="text-xs text-[#9e8f7e] text-center px-2">Select Folder</p>
              <p className="text-[10px] text-[#c4b9ac]">All images inside</p>
            </button>
          </div>

          {images.length > 0 && (
            <div className="bg-[#f5f0ea] rounded-xl px-4 py-3 flex items-center justify-between">
              <p className="text-sm text-[#3b2f1e] font-semibold">{images.length} image{images.length !== 1 ? "s" : ""} selected</p>
              <button onClick={() => setImages([])} className="text-xs text-[#9e8f7e] hover:text-red-500 transition-colors">Clear</button>
            </div>
          )}

          <button onClick={handleImageUpload} disabled={!images.length || imgUploading}
            className="w-full bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {imgUploading
              ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Uploading...</>
              : <><Upload size={14} /> Upload to R2</>}
          </button>
        </div>

        {/* Image Results */}
        <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl p-6 flex flex-col gap-3">
          {!imgResult ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-center py-8">
              <ImageIcon size={28} className="text-[#e8e0d5]" />
              <p className="text-xs text-[#c4b9ac]">Uploaded image URLs will appear here</p>
              <p className="text-[10px] text-[#c4b9ac]">Copy & paste into Excel thumbnail/gallery columns</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#3b2f1e]">
                  {imgResult.uploaded?.length || 0} uploaded · {imgResult.failed?.length || 0} failed
                </p>
                {imgResult.uploaded?.length > 0 && (
                  <button onClick={copyAll}
                    className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#645643] uppercase hover:underline">
                    {copiedUrl === "all" ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy All URLs</>}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto">
                {imgResult.uploaded?.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#f5f0ea] rounded-lg px-3 py-2">
                    <p className="text-[10px] text-[#9e8f7e] truncate flex-1 font-mono">{item.name}</p>
                    <button onClick={() => copyUrl(item.url)}
                      className={`shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${
                        copiedUrl === item.url ? "bg-green-100 text-green-600" : "bg-white text-[#645643] hover:bg-[#e8ddd0]"
                      }`}>
                      {copiedUrl === item.url ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                    </button>
                  </div>
                ))}
                {imgResult.failed?.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2">
                    <XCircle size={12} className="text-red-400 shrink-0" />
                    <p className="text-[10px] text-red-500 truncate flex-1">{item.name}: {item.error}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ===== SECTION 2: EXCEL UPLOAD ===== */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-[#3b2f1e] tracking-wide uppercase">Step 2 — Upload Products via Excel</h2>
        <p className="text-xs text-[#9e8f7e]">Fill the template with product data. Thumbnail/gallery blank = auto-generated from SKU.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instructions */}
        <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            {[
              { step: "1", title: "Download Template", desc: "Get Excel with correct headers." },
              { step: "2", title: "Fill Data", desc: "name, sku, category, subcategory, material, finish, moq" },
              { step: "3", title: "Thumbnail (optional)", desc: "Blank → auto: BASE_URL/[SKU].png\nOr paste URL from Step 1." },
              { step: "4", title: "Gallery (optional)", desc: "Blank → auto-detects [SKU]-1.png, [SKU]-2.png...\nOr paste comma-separated URLs." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[#645643] text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                <div>
                  <p className="text-xs font-semibold text-[#3b2f1e]">{title}</p>
                  <p className="text-[10px] text-[#9e8f7e] mt-0.5 whitespace-pre-line">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleDownloadTemplate}
            className="flex items-center gap-2 border border-[#ddd5c8] text-[#615236] text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-xl hover:bg-[#f5f0ea] transition-colors w-max">
            <Download size={13} /> Download Template
          </button>
        </div>

        {/* Excel Upload + Result */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl p-6 flex flex-col gap-4">
            <button type="button" onClick={() => fileRef.current?.click()}
              className={`w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                file ? "border-[#645643] bg-[#faf7f3]" : "border-[#ddd5c8] hover:border-[#645643] hover:bg-[#faf7f3]"
              }`}>
              {file ? (
                <><FileSpreadsheet size={22} className="text-[#645643]" />
                  <p className="text-sm font-semibold text-[#3b2f1e]">{file.name}</p>
                  <p className="text-xs text-[#9e8f7e]">{(file.size / 1024).toFixed(1)} KB · Click to change</p></>
              ) : (
                <><Upload size={20} className="text-[#c4b9ac]" />
                  <p className="text-sm text-[#9e8f7e]">Select Excel file</p>
                  <p className="text-[10px] text-[#c4b9ac]">.xlsx or .xls</p></>
              )}
            </button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden"
              onChange={(e) => { setFile(e.target.files?.[0] || null); setResult(null); }} />

            <button onClick={handleExcelUpload} disabled={!file || uploading}
              className="w-full bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {uploading
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Uploading...</>
                : <><Upload size={14} /> Upload Products</>}
            </button>
          </div>

          {result && (
            <div className={`bg-[#FFFDF9] border rounded-2xl p-5 flex flex-col gap-4 ${result.success ? "border-green-200" : "border-red-200"}`}>
              <div className="flex items-center gap-2">
                {result.success ? <CheckCircle size={16} className="text-green-600 shrink-0" /> : <XCircle size={16} className="text-red-500 shrink-0" />}
                <p className="text-sm font-semibold text-[#3b2f1e]">{result.message}</p>
              </div>
              {result.results && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl px-4 py-3 text-center">
                    <p className="text-xl font-bold text-green-600">{result.results.success}</p>
                    <p className="text-[10px] text-green-500 uppercase tracking-widest">Uploaded</p>
                  </div>
                  <div className="bg-red-50 rounded-xl px-4 py-3 text-center">
                    <p className="text-xl font-bold text-red-500">{result.results.skipped}</p>
                    <p className="text-[10px] text-red-400 uppercase tracking-widest">Skipped</p>
                  </div>
                </div>
              )}
              {result.results?.errors?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase flex items-center gap-1">
                    <AlertCircle size={10} /> {result.results.errors.length} Warning{result.results.errors.length !== 1 ? "s" : ""}
                  </p>
                  <div className="max-h-48 overflow-y-auto flex flex-col gap-1.5 border border-[#f0ebe3] rounded-xl p-3">
                    {result.results.errors.map((e, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-[#c4b9ac] font-mono shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                        <span className={e.includes("not found - product saved") ? "text-yellow-600" : "text-red-500"}>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
