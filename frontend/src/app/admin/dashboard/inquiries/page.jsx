"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Eye, Trash2, X, Search } from "lucide-react";

const statusColors = {
  new: "bg-blue-50 text-blue-600 border-blue-100",
  "in-progress": "bg-yellow-50 text-yellow-600 border-yellow-100",
  resolved: "bg-green-50 text-green-600 border-green-100",
};

const statusLabel = { new: "New", "in-progress": "In Progress", resolved: "Resolved" };

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchInquiries = async (p = 1, s = search, st = statusFilter) => {
    setLoading(true);
    try {
      const statusQ = st ? `&status=${st}` : "";
      const { data } = await api.get(`/api/inquiries?page=${p}&limit=20${statusQ}`);
      // client-side search filter
      const filtered = s
        ? data.data.filter((i) =>
            i.name.toLowerCase().includes(s.toLowerCase()) ||
            i.email.toLowerCase().includes(s.toLowerCase()) ||
            i.phone.includes(s)
          )
        : data.data;
      setInquiries(filtered);
      setPagination(data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleSearch = (val) => {
    setSearch(val);
    fetchInquiries(1, val, statusFilter);
  };

  const handleStatusFilter = (val) => {
    setStatusFilter(val);
    setPage(1);
    fetchInquiries(1, search, val);
  };

  const handleStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/api/inquiries/${id}/status`, { status });
      setInquiries((prev) => prev.map((i) => i._id === id ? { ...i, status: data.data.status } : i));
      setSelected(null);
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await api.delete(`/api/inquiries/${id}`);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch {}
  };

  return (
    <div style={{ fontFamily: "'MonaSans', Arial, sans-serif" }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#3b2f1e]">Inquiries</h1>
          <p className="text-[10px] tracking-widest text-[#9e8f7e] uppercase mt-0.5">{pagination.total ?? 0} total</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c4b9ac]" />
          <input value={search} onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#ddd5c8] rounded-xl bg-white text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all" />
        </div>
        <select value={statusFilter} onChange={(e) => handleStatusFilter(e.target.value)}
          className="px-4 py-2.5 text-sm border border-[#ddd5c8] rounded-xl bg-white text-[#3b2f1e] outline-none focus:border-[#645643] transition-all">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : inquiries.length === 0 ? (
          <p className="text-center text-[#9e8f7e] text-sm py-16">No inquiries found</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e0d5] bg-[#f5f0ea]">
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase">Contact</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden md:table-cell">Company</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden lg:table-cell">Products</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden lg:table-cell">Date</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="border-b border-[#f0ebe3] last:border-0 hover:bg-[#faf7f3] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#3b2f1e] text-sm">{inq.name}</p>
                      <p className="text-[11px] text-[#9e8f7e] mt-0.5">{inq.email}</p>
                      <p className="text-[11px] text-[#9e8f7e]">{inq.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-[#9e8f7e] text-xs hidden md:table-cell">{inq.company || "—"}</td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-xs text-[#615236] font-semibold">
                        {inq.products?.length || 0} item{inq.products?.length !== 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${statusColors[inq.status]}`}>
                        {statusLabel[inq.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#9e8f7e] text-xs hidden lg:table-cell">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelected(inq)} className="p-2 rounded-lg hover:bg-[#f0ebe3] text-[#615236] transition-colors">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => handleDelete(inq._id)} className="p-2 rounded-lg hover:bg-red-50 text-[#9e8f7e] hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pagination.pages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#e8e0d5]">
                <p className="text-xs text-[#9e8f7e]">Page {page} of {pagination.pages}</p>
                <div className="flex gap-2">
                  <button disabled={page === 1} onClick={() => { setPage(page - 1); fetchInquiries(page - 1); }}
                    className="px-3 py-1.5 text-xs border border-[#ddd5c8] rounded-lg disabled:opacity-40 hover:bg-[#f5f0ea] text-[#615236]">Prev</button>
                  <button disabled={page === pagination.pages} onClick={() => { setPage(page + 1); fetchInquiries(page + 1); }}
                    className="px-3 py-1.5 text-xs border border-[#ddd5c8] rounded-lg disabled:opacity-40 hover:bg-[#f5f0ea] text-[#615236]">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-[#FFFDF9] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e0d5] sticky top-0 bg-[#FFFDF9] z-10">
              <div>
                <h2 className="text-base font-semibold text-[#3b2f1e]">Inquiry Details</h2>
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${statusColors[selected.status]}`}>
                  {statusLabel[selected.status]}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#9e8f7e] hover:text-[#3b2f1e]">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-5">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Name", value: selected.name, full: true },
                  { label: "Email", value: selected.email, full: true },
                  { label: "Phone", value: selected.phone },
                  { label: "Company", value: selected.company || "—" },
                ].map(({ label, value, full }) => (
                  <div key={label} className={`bg-[#f5f0ea] rounded-xl px-4 py-3 ${full ? "col-span-2" : ""}`}>
                    <p className="text-[9px] font-bold tracking-widest text-[#9e8f7e] uppercase mb-1">{label}</p>
                    <p className="text-sm text-[#3b2f1e] font-medium">{value}</p>
                  </div>
                ))}
              </div>

              {selected.message && (
                <div className="bg-[#f5f0ea] rounded-xl px-4 py-3">
                  <p className="text-[9px] font-bold tracking-widest text-[#9e8f7e] uppercase mb-1">Message</p>
                  <p className="text-sm text-[#3b2f1e] leading-relaxed">{selected.message}</p>
                </div>
              )}

              {/* Products */}
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase mb-3">
                  Products ({selected.products?.length})
                </p>
                <div className="flex flex-col gap-2">
                  {selected.products?.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#f5f0ea] rounded-xl px-4 py-3">
                      {p.thumbnail ? (
                        <img src={p.thumbnail} alt={p.name} className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#e8e0d5]" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#e8ddd0] shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-[#3b2f1e]">{p.name}</p>
                        <p className="text-[10px] text-[#9e8f7e] font-mono">{p.sku} · MOQ: {p.moq}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update */}
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase mb-2">Update Status</p>
                <div className="flex gap-2">
                  {["new", "in-progress", "resolved"].map((s) => (
                    <button key={s} onClick={() => handleStatus(selected._id, s)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-colors ${
                        selected.status === s ? "bg-[#645643] text-white" : "bg-[#f0ebe3] text-[#615236] hover:bg-[#e8ddd0]"
                      }`}>
                      {statusLabel[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
