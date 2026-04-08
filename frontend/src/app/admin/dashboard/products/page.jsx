"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Plus, Pencil, Trash2, X, Check, ImageIcon, Search } from "lucide-react";
import { ThumbnailUpload, GalleryUpload } from "@/components/admin/ImageUpload";

const toSlug = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const emptyForm = {
  name: "", sku: "", description: "",
  category: "", subCategory: "",
  material: "", finish: "", moq: "100 pcs",
  thumbnail: "", gallery: [],
};

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">{label}</label>
    {children}
  </div>
);

const inputCls = "border border-[#ddd5c8] rounded-xl px-4 py-2.5 text-sm text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all bg-white";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [filterSubs, setFilterSubs] = useState([]); // subcategories for filter dropdown

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const fetchProducts = async (p = 1, s = search, cat = categoryFilter, sub = subCategoryFilter) => {
    try {
      const searchQ = s ? `&search=${s}` : "";
      const catQ = cat ? `&category=${cat}` : "";
      const subQ = sub ? `&subCategory=${sub}` : "";
      const { data } = await api.get(`/api/products?page=${p}&limit=10${searchQ}${catQ}${subQ}`);
      setProducts(data.data);
      setPagination(data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    Promise.all([api.get("/api/categories"), api.get("/api/subcategories")]).then(
      ([c, s]) => { setCategories(c.data.data); setSubCategories(s.data.data); }
    );
  }, []);

  useEffect(() => {
    setFilteredSubs(
      form.category
        ? subCategories.filter((s) => (s.category?._id || s.category) === form.category)
        : []
    );
  }, [form.category, subCategories]);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(""); setShowForm(true); };
  const openEdit = (p) => {
    setForm({
      name: p.name, sku: p.sku, description: p.description || "",
      category: p.category?._id || p.category || "",
      subCategory: p.subCategory?._id || p.subCategory || "",
      material: p.material || "", finish: p.finish || "",
      moq: p.moq || "100 pcs",
      thumbnail: p.thumbnail || "", gallery: p.gallery || [],
    });
    setEditId(p._id); setError(""); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError("");
    try {
      if (editId) await api.put(`/api/products/${editId}`, form);
      else await api.post("/api/products", form);
      await fetchProducts(page);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      await fetchProducts(page);
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#3b2f1e]">Products</h1>
          <p className="text-[10px] tracking-widest text-[#9e8f7e] uppercase mt-0.5">{pagination.total ?? 0} total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c4b9ac]" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); fetchProducts(1, e.target.value, categoryFilter, subCategoryFilter); }}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#ddd5c8] rounded-xl bg-white text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all" />
        </div>
        <select value={categoryFilter} onChange={(e) => {
          const val = e.target.value;
          setCategoryFilter(val);
          setSubCategoryFilter("");
          setFilterSubs(val ? subCategories.filter((s) => (s.category?._id || s.category) === val) : []);
          setPage(1);
          fetchProducts(1, search, val, "");
        }}
          className="px-4 py-2.5 text-sm border border-[#ddd5c8] rounded-xl bg-white text-[#3b2f1e] outline-none focus:border-[#645643] transition-all">
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
        </select>
        <select value={subCategoryFilter} onChange={(e) => {
          setSubCategoryFilter(e.target.value);
          setPage(1);
          fetchProducts(1, search, categoryFilter, e.target.value);
        }}
          disabled={!categoryFilter}
          className="px-4 py-2.5 text-sm border border-[#ddd5c8] rounded-xl bg-white text-[#3b2f1e] outline-none focus:border-[#645643] transition-all disabled:opacity-50">
          <option value="">All Sub Categories</option>
          {filterSubs.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-[#9e8f7e] text-sm py-16">No products found</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e0d5] bg-[#f5f0ea]">
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase">Product</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden md:table-cell">SKU</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden lg:table-cell">Category</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden lg:table-cell">MOQ</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-[#f0ebe3] last:border-0 hover:bg-[#faf7f3] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.thumbnail ? (
                          <img src={p.thumbnail} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-[#e8e0d5] shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[#f0ebe3] flex items-center justify-center shrink-0">
                            <ImageIcon size={14} className="text-[#c4b9ac]" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#3b2f1e] leading-tight">{p.name}</p>
                          <p className="text-[10px] text-[#9e8f7e] mt-0.5 font-mono">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#9e8f7e] font-mono text-xs hidden md:table-cell">{p.sku}</td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="bg-[#f0ebe3] text-[#615236] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                        {p.category?.title || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#9e8f7e] text-xs hidden lg:table-cell">{p.moq}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-[#f0ebe3] text-[#615236] transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg hover:bg-red-50 text-[#9e8f7e] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pagination.pages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#e8e0d5]">
                <p className="text-xs text-[#9e8f7e]">Page {pagination.page} of {pagination.pages}</p>
                <div className="flex gap-2">
                  <button disabled={page === 1} onClick={() => { setPage(page - 1); fetchProducts(page - 1); }}
                    className="px-3 py-1.5 text-xs border border-[#ddd5c8] rounded-lg disabled:opacity-40 hover:bg-[#f5f0ea] text-[#615236]">Prev</button>
                  <button disabled={page === pagination.pages} onClick={() => { setPage(page + 1); fetchProducts(page + 1); }}
                    className="px-3 py-1.5 text-xs border border-[#ddd5c8] rounded-lg disabled:opacity-40 hover:bg-[#f5f0ea] text-[#615236]">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="bg-[#FFFDF9] rounded-2xl shadow-xl w-full max-w-2xl max-h-[92vh] flex flex-col">

            {/* Sticky Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e0d5] shrink-0">
              <h2 className="text-base font-semibold text-[#3b2f1e]">{editId ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#9e8f7e] hover:text-[#3b2f1e] transition-colors"><X size={18} /></button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">
              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">{error}</div>
              )}

              {/* 1. Name */}
              <Field label="Product Name">
                <input value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Acacia Chopping Board" required className={inputCls} />
                {form.name && (
                  <p className="text-[10px] text-[#9e8f7e]">Slug: <span className="font-mono text-[#615236]">{toSlug(form.name)}</span></p>
                )}
              </Field>

              {/* 2. Description */}
              <Field label="Description">
                <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                  placeholder="Short product description..." rows={3}
                  className={`${inputCls} resize-none`} />
              </Field>

              {/* 3. Thumbnail */}
              <Field label="Thumbnail Image">
                <ThumbnailUpload value={form.thumbnail} onChange={(url) => set("thumbnail", url)} />
              </Field>

              {/* 4. Gallery */}
              <Field label={`Gallery Images (${form.gallery.length} added) — select multiple at once`}>
                <GalleryUpload images={form.gallery} onChange={(imgs) => set("gallery", imgs)} />
              </Field>

              {/* 5. Category + SubCategory */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select value={form.category} onChange={(e) => { set("category", e.target.value); set("subCategory", ""); }} required className={inputCls}>
                    <option value="">Select</option>
                    {categories.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
                  </select>
                </Field>
                <Field label="Sub Category">
                  <select value={form.subCategory} onChange={(e) => set("subCategory", e.target.value)} disabled={!form.category} className={`${inputCls} disabled:opacity-50`}>
                    <option value="">Select</option>
                    {filteredSubs.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </Field>
              </div>

              {/* 6. SKU + MOQ */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="SKU">
                  <input value={form.sku} onChange={(e) => set("sku", e.target.value)}
                    placeholder="e.g. SH-CBW-26-38" required className={`${inputCls} font-mono`} />
                </Field>
                <Field label="MOQ">
                  <input value={form.moq} onChange={(e) => set("moq", e.target.value)}
                    placeholder="e.g. 100 pcs" className={inputCls} />
                </Field>
              </div>

              {/* 7. Material + Finish */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Material">
                  <input value={form.material} onChange={(e) => set("material", e.target.value)}
                    placeholder="e.g. Acacia Wood" className={inputCls} />
                </Field>
                <Field label="Finish">
                  <input value={form.finish} onChange={(e) => set("finish", e.target.value)}
                    placeholder="e.g. Natural Oil" className={inputCls} />
                </Field>
              </div>
            </form>

            {/* Sticky Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-[#e8e0d5] shrink-0">
              <button type="button" onClick={() => setShowForm(false)}
                className="flex-1 border border-[#ddd5c8] text-[#9e8f7e] text-xs font-bold tracking-widest uppercase py-3 rounded-xl hover:bg-[#f5f0ea] transition-colors">
                Cancel
              </button>
              <button type="submit" form="product-form" disabled={submitting}
                onClick={handleSubmit}
                className="flex-1 bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase py-3 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {submitting
                  ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><Check size={14} /> {editId ? "Update" : "Create"}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
