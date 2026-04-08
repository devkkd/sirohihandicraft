"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Pencil, Trash2, Plus, X, Check, Search } from "lucide-react";

const toSlug = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const empty = { title: "", description: "" };

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/api/categories");
      setAllCategories(data.data);
      setCategories(data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (val) => {
    setSearch(val);
    setCategories(
      val ? allCategories.filter((c) => c.title.toLowerCase().includes(val.toLowerCase()) || c.slug.includes(val.toLowerCase())) : allCategories
    );
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setError(""); setShowForm(true); };
  const openEdit = (cat) => { setForm({ title: cat.title, description: cat.description || "" }); setEditId(cat._id); setError(""); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (editId) {
        await api.put(`/api/categories/${editId}`, form);
      } else {
        await api.post("/api/categories", form);
      }
      await fetchCategories();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await api.delete(`/api/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#3b2f1e]">Categories</h1>
          <p className="text-[10px] tracking-widest text-[#9e8f7e] uppercase mt-0.5">{allCategories.length} total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={14} /> Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c4b9ac]" />
        <input value={search} onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full sm:w-72 pl-9 pr-4 py-2.5 text-sm border border-[#ddd5c8] rounded-xl bg-white text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all" />
      </div>

      {/* Table */}
      <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-[#9e8f7e] text-sm py-16">No categories found</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e0d5] bg-[#f5f0ea]">
                <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase">Title</th>
                <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase">Slug</th>
                <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden md:table-cell">Description</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat._id} className={`border-b border-[#f0ebe3] last:border-0 hover:bg-[#faf7f3] transition-colors`}>
                  <td className="px-6 py-4 font-semibold text-[#3b2f1e]">{cat.title}</td>
                  <td className="px-6 py-4 text-[#9e8f7e] font-mono text-xs">{cat.slug}</td>
                  <td className="px-6 py-4 text-[#9e8f7e] hidden md:table-cell max-w-xs truncate">{cat.description || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(cat)} className="p-2 rounded-lg hover:bg-[#f0ebe3] text-[#615236] transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(cat._id)} className="p-2 rounded-lg hover:bg-red-50 text-[#9e8f7e] hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-[#FFFDF9] rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-[#3b2f1e]">
                {editId ? "Edit Category" : "Add Category"}
              </h2>
              <button onClick={closeForm} className="text-[#9e8f7e] hover:text-[#3b2f1e] transition-colors">
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. WOODEN"
                  required
                  className="border border-[#ddd5c8] rounded-xl px-4 py-2.5 text-sm text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all bg-white"
                />
                {form.title && (
                  <p className="text-[10px] text-[#9e8f7e]">
                    Slug: <span className="font-mono text-[#615236]">{toSlug(form.title)}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description..."
                  rows={3}
                  className="border border-[#ddd5c8] rounded-xl px-4 py-2.5 text-sm text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all bg-white resize-none"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={closeForm} className="flex-1 border border-[#ddd5c8] text-[#9e8f7e] text-xs font-bold tracking-widest uppercase py-3 rounded-xl hover:bg-[#f5f0ea] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="flex-1 bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase py-3 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {submitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Check size={14} /> {editId ? "Update" : "Create"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
