"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Search,
  ImageIcon,
  BookOpen,
  Star,
} from "lucide-react";

import BlogEditor from "@/components/admin/BlogEditor";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://sirohihandicraft-backend.onrender.com";

const categories = [
  "Craftsmanship",
  "Materials",
  "Interiors",
  "Sustainability",
  "Behind the Craft",
  "Export Insights",
];

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  category: "Craftsmanship",

  imageAlt: "",

  author: "Sirohi Handicraft",
  readTime: "5 min read",
  publishedAt: "",

  status: "draft",
  featured: false,

  metaTitle: "",
  metaDescription: "",

  schemaMarkup: "",

  content: "",
};

const toSlug = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Field = ({ label, children, required = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold tracking-widest text-[#615236] uppercase">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>

    {children}
  </div>
);

const inputCls =
  "border border-[#ddd5c8] rounded-xl px-4 py-2.5 text-sm text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all bg-white";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [contentMode, setContentMode] = useState("editor");

  const fileInputRef = useRef(null);

  // Ref for the Quill editor so we can extract final semantic HTML
  const editorRef = useRef(null);

  const set = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // --------------------------------------------------
  // FETCH BLOGS
  // --------------------------------------------------

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.set("limit", "100");

      if (search.trim()) {
        params.set("search", search.trim());
      }

      const { data } = await api.get(
        `/api/blogs/admin/all?${params.toString()}`
      );

      let result = data.data || [];

      if (statusFilter) {
        result = result.filter(
          (blog) => blog.status === statusFilter
        );
      }

      setBlogs(result);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // --------------------------------------------------
  // IMAGE
  // --------------------------------------------------

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --------------------------------------------------
  // ADD
  // --------------------------------------------------

  const openAdd = () => {
    setForm({
      ...emptyForm,
    });

    setEditId(null);

    setImageFile(null);
    setImagePreview("");

    setError("");

    setShowForm(true);
  };

  // --------------------------------------------------
  // EDIT
  // --------------------------------------------------

  const openEdit = async (blog) => {
    try {
      setError("");

      const { data } = await api.get(
        `/api/blogs/id/${blog._id}`
      );

      const b = data.data;

      let formattedPublishedAt = "";

      if (b.publishedAt) {
        const date = new Date(b.publishedAt);

        const local = new Date(
          date.getTime() -
            date.getTimezoneOffset() * 60000
        );

        formattedPublishedAt = local
          .toISOString()
          .slice(0, 16);
      }

      setForm({
        title: b.title || "",
        slug: b.slug || "",
        description: b.description || "",
        category: b.category || "Craftsmanship",

        imageAlt: b.image?.alt || "",

        author:
          b.author || "Sirohi Handicraft",

        readTime:
          b.readTime || "5 min read",

        publishedAt:
          formattedPublishedAt,

        status:
          b.status || "draft",

        featured:
          Boolean(b.featured),

        metaTitle:
          b.metaTitle || "",

        metaDescription:
          b.metaDescription || "",

        schemaMarkup: b.schemaMarkup
          ? JSON.stringify(
              b.schemaMarkup,
              null,
              2
            )
          : "",

        content: b.content || "",
      });

      setEditId(b._id);

      setImageFile(null);

      setImagePreview(
        b.image?.url || ""
      );

      setShowForm(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load blog"
      );
    }
  };

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------

  const handleSubmit = async (e, submitStatus = form.status) => {
    e?.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      if (!form.title.trim()) {
        throw new Error("Blog title is required.");
      }

      if (!form.description.trim()) {
        throw new Error(
          "Blog description is required."
        );
      }

      // Get content from correct mode
      let finalContent = "";

      if (contentMode === "html") {
        // HTML mode: use directly from textarea
        finalContent = form.content || "";
      } else {
        // Editor mode: get from Quill editor
        finalContent =
          editorRef.current?.getHTML?.() ||
          form.content ||
          "";
      }

      const plainContent = finalContent
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, "")
        .trim();

      if (!plainContent) {
        throw new Error(
          "Blog content is required."
        );
      }

      // Validate Schema JSON before sending
      if (form.schemaMarkup.trim()) {
        try {
          JSON.parse(form.schemaMarkup);
        } catch {
          throw new Error(
            "Schema Markup must contain valid JSON."
          );
        }
      }

      const formData = new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "slug",
        form.slug || toSlug(form.title)
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "imageAlt",
        form.imageAlt
      );

      formData.append(
        "author",
        form.author
      );

      formData.append(
        "readTime",
        form.readTime
      );

      if (form.publishedAt) {
        formData.append(
          "publishedAt",
          new Date(
            form.publishedAt
          ).toISOString()
        );
      }

      formData.append(
        "status",
        submitStatus
      );

      if (submitStatus === "published" && !form.publishedAt) {
        formData.append("publishedAt", new Date().toISOString());
      }

      formData.append(
        "featured",
        String(form.featured)
      );

      formData.append(
        "metaTitle",
        form.metaTitle
      );

      formData.append(
        "metaDescription",
        form.metaDescription
      );

      formData.append(
        "schemaMarkup",
        form.schemaMarkup
      );

      formData.append(
        "content",
        finalContent
      );

      /*
       * Only append image if a new image was selected.
       *
       * Backend:
       * upload.single("image")
       */
      if (imageFile) {
        formData.append(
          "image",
          imageFile
        );
      }

      if (editId) {
        await api.put(
          `/api/blogs/${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await api.post(
          "/api/blogs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      await fetchBlogs();

      setShowForm(false);

      setForm({
        ...emptyForm,
      });

      setEditId(null);

      setImageFile(null);
      setImagePreview("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this blog? The featured image will also be removed from Cloudflare."
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/api/blogs/${id}`
      );

      await fetchBlogs();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div
      style={{
        fontFamily:
          "'MonaSans', Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#3b2f1e]">
            Blogs
          </h1>

          <p className="text-[10px] tracking-widest text-[#9e8f7e] uppercase mt-0.5">
            {blogs.length} blogs
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={14} />

          Add Blog
        </button>
      </div>

      {/* ERROR */}

      {error && !showForm && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
          {error}
        </div>
      )}

      {/* FILTER */}

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c4b9ac]"
          />

          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search blogs..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#ddd5c8] rounded-xl bg-white text-[#3b2f1e] placeholder-[#c4b9ac] outline-none focus:border-[#645643] focus:ring-2 focus:ring-[#64564320] transition-all"
          />
        </div>

        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="px-4 py-2.5 text-sm border border-[#ddd5c8] rounded-xl bg-white text-[#3b2f1e] outline-none focus:border-[#645643] transition-all"
        >
          <option value="">
            All Status
          </option>

          <option value="published">
            Published
          </option>

          <option value="draft">
            Draft
          </option>
        </select>
      </div>

      {/* TABLE */}

      <div className="bg-[#FFFDF9] border border-[#e8e0d5] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full bg-[#f0ebe3] flex items-center justify-center mb-3">
              <BookOpen
                size={20}
                className="text-[#9e8f7e]"
              />
            </div>

            <p className="text-sm text-[#9e8f7e]">
              No blogs found
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e0d5] bg-[#f5f0ea]">
                <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase">
                  Blog
                </th>

                <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden md:table-cell">
                  Category
                </th>

                <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden lg:table-cell">
                  Status
                </th>

                <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-[#9e8f7e] uppercase hidden lg:table-cell">
                  Published
                </th>

                <th className="px-6 py-3" />
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b border-[#f0ebe3] last:border-0 hover:bg-[#faf7f3] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {blog.image?.url ? (
                        <img
                          src={blog.image.url}
                          alt={
                            blog.image.alt ||
                            blog.title
                          }
                          className="w-12 h-12 rounded-lg object-cover border border-[#e8e0d5] shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-[#f0ebe3] flex items-center justify-center shrink-0">
                          <ImageIcon
                            size={15}
                            className="text-[#c4b9ac]"
                          />
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[#3b2f1e] leading-tight truncate max-w-[300px]">
                            {blog.title}
                          </p>

                          {blog.featured && (
                            <Star
                              size={12}
                              className="text-[#a1845b] fill-[#a1845b] shrink-0"
                            />
                          )}
                        </div>

                        <p className="text-[10px] text-[#9e8f7e] mt-0.5 font-mono truncate max-w-[300px]">
                          /blog/{blog.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-[#f0ebe3] text-[#615236] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                      {blog.category || "—"}
                    </span>
                  </td>

                  <td className="px-6 py-4 hidden lg:table-cell">
                    {blog.status === "published" ? (
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-[#f5f0ea] text-[#9e8f7e] border border-[#e8e0d5] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9e8f7e]" />
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-[#9e8f7e] text-xs hidden lg:table-cell">
                    {blog.publishedAt
                      ? new Date(
                          blog.publishedAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          openEdit(blog)
                        }
                        className="p-2 rounded-lg hover:bg-[#f0ebe3] text-[#615236] transition-colors"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            blog._id
                          )
                        }
                        className="p-2 rounded-lg hover:bg-red-50 text-[#9e8f7e] hover:text-red-500 transition-colors"
                      >
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

      {/* ==================================================
          BLOG FORM MODAL
      ================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="bg-[#FFFDF9] rounded-2xl shadow-xl w-full max-w-5xl max-h-[94vh] flex flex-col">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e0d5] shrink-0">
              <div>
                <h2 className="text-base font-semibold text-[#3b2f1e]">
                  {editId
                    ? "Edit Blog"
                    : "Add Blog"}
                </h2>

                <p className="text-[10px] tracking-widest uppercase text-[#9e8f7e] mt-0.5">
                  Blog & SEO Management
                </p>
              </div>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="text-[#9e8f7e] hover:text-[#3b2f1e] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto flex-1 px-6 py-6"
            >
              {error && (
                <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-6">
                {/* BASIC INFORMATION */}

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-[#f0ebe3] flex items-center justify-center">
                      <BookOpen
                        size={13}
                        className="text-[#645643]"
                      />
                    </div>

                    <h3 className="text-xs font-bold tracking-widest uppercase text-[#615236]">
                      Blog Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <Field
                      label="Blog Title"
                      required
                    >
                      <input
                        value={form.title}
                        onChange={(e) => {
                          const value =
                            e.target.value;

                          set("title", value);

                          if (!editId) {
                            set(
                              "slug",
                              toSlug(value)
                            );
                          }

                          if (
                            !form.metaTitle
                          ) {
                            set(
                              "metaTitle",
                              value
                            );
                          }
                        }}
                        placeholder="e.g. The Art of Traditional Indian Handicrafts"
                        required
                        className={inputCls}
                      />

                      {form.title && (
                        <p className="text-[10px] text-[#9e8f7e]">
                          Slug:{" "}
                          <span className="font-mono text-[#615236]">
                            {form.slug ||
                              toSlug(
                                form.title
                              )}
                          </span>
                        </p>
                      )}
                    </Field>

                    <Field
                      label="Slug"
                      required
                    >
                      <input
                        value={form.slug}
                        onChange={(e) =>
                          set(
                            "slug",
                            toSlug(
                              e.target.value
                            )
                          )
                        }
                        placeholder="traditional-indian-handicrafts"
                        required
                        className={`${inputCls} font-mono`}
                      />
                    </Field>

                    <Field
                      label="Short Description"
                      required
                    >
                      <textarea
                        value={
                          form.description
                        }
                        onChange={(e) =>
                          set(
                            "description",
                            e.target.value
                          )
                        }
                        rows={4}
                        placeholder="Write a short description for the blog..."
                        required
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Field label="Category">
                        <select
                          value={
                            form.category
                          }
                          onChange={(e) =>
                            set(
                              "category",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        >
                          {categories.map(
                            (category) => (
                              <option
                                key={
                                  category
                                }
                                value={
                                  category
                                }
                              >
                                {category}
                              </option>
                            )
                          )}
                        </select>
                      </Field>

                      <Field label="Author">
                        <input
                          value={form.author}
                          onChange={(e) =>
                            set(
                              "author",
                              e.target.value
                            )
                          }
                          className={inputCls}
                        />
                      </Field>

                      <Field label="Read Time">
                        <input
                          value={
                            form.readTime
                          }
                          onChange={(e) =>
                            set(
                              "readTime",
                              e.target.value
                            )
                          }
                          placeholder="5 min read"
                          className={inputCls}
                        />
                      </Field>
                    </div>
                  </div>
                </div>

                {/* IMAGE */}

                <div className="border-t border-[#e8e0d5] pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-[#f0ebe3] flex items-center justify-center">
                      <ImageIcon
                        size={13}
                        className="text-[#645643]"
                      />
                    </div>

                    <h3 className="text-xs font-bold tracking-widest uppercase text-[#615236]">
                      Featured Image(size of image 1254 x 584 px )
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    {imagePreview ? (
                      <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[#ddd5c8] group">
                        <img
                          src={imagePreview}
                          alt={
                            form.imageAlt ||
                            "Blog preview"
                          }
                          className="w-full h-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={
                            removeImage
                          }
                          className="absolute top-3 right-3 bg-white/95 hover:bg-white text-red-500 rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={14} />
                        </button>

                        {imageFile && (
                          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] px-3 py-1.5 rounded-lg">
                            New image selected
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="w-full h-56 border-2 border-dashed border-[#ddd5c8] rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#645643] hover:bg-[#faf7f3] transition-all"
                      >
                        <div className="w-12 h-12 bg-[#f0ebe3] rounded-full flex items-center justify-center">
                          <ImageIcon
                            size={20}
                            className="text-[#9e8f7e]"
                          />
                        </div>

                        <div className="text-center">
                          <p className="text-xs font-semibold text-[#615236]">
                            Click to upload
                            featured image
                          </p>

                          <p className="text-[10px] text-[#c4b9ac] mt-1">
                            PNG, JPG, WEBP ·
                            Maximum 5MB
                          </p>
                        </div>
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      className="hidden"
                      onChange={
                        handleImageChange
                      }
                    />

                    {!imagePreview && (
                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="self-start text-xs font-semibold text-[#645643] hover:text-[#4d4233]"
                      >
                        + Select image
                      </button>
                    )}

                    <Field label="Image Alt Text">
                      <input
                        value={
                          form.imageAlt
                        }
                        onChange={(e) =>
                          set(
                            "imageAlt",
                            e.target.value
                          )
                        }
                        placeholder="Traditional Indian wooden handicraft"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </div>

                {/* PUBLISHING */}

                <div className="border-t border-[#e8e0d5] pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Status">
                      <select
                        value={form.status}
                        onChange={(e) =>
                          set(
                            "status",
                            e.target.value
                          )
                        }
                        className={inputCls}
                      >
                        <option value="draft">
                          Draft
                        </option>

                        <option value="published">
                          Published
                        </option>
                      </select>
                    </Field>

                    <Field label="Published Date">
                      <input
                        type="datetime-local"
                        value={
                          form.publishedAt
                        }
                        onChange={(e) =>
                          set(
                            "publishedAt",
                            e.target.value
                          )
                        }
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Featured Blog">
                      <button
                        type="button"
                        onClick={() =>
                          set(
                            "featured",
                            !form.featured
                          )
                        }
                        className={`h-[42px] rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                          form.featured
                            ? "bg-[#f0ebe3] border-[#645643] text-[#615236]"
                            : "bg-white border-[#ddd5c8] text-[#9e8f7e]"
                        }`}
                      >
                        <Star
                          size={14}
                          className={
                            form.featured
                              ? "fill-[#a1845b] text-[#a1845b]"
                              : ""
                          }
                        />

                        {form.featured
                          ? "Featured"
                          : "Not Featured"}
                      </button>
                    </Field>
                  </div>
                </div>

                {/* SEO */}

                <div className="border-t border-[#e8e0d5] pt-6">
                  <div className="mb-4">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-[#615236]">
                      SEO Settings
                    </h3>

                    <p className="text-[10px] text-[#9e8f7e] mt-1">
                      These values will be used
                      for the public blog page
                      metadata.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Field label="Meta Title">
                      <input
                        value={
                          form.metaTitle
                        }
                        onChange={(e) =>
                          set(
                            "metaTitle",
                            e.target.value
                          )
                        }
                        placeholder="Traditional Indian Handicrafts | Sirohi Handicraft"
                        className={inputCls}
                      />

                      <p className="text-[10px] text-[#9e8f7e] text-right">
                        {
                          form.metaTitle
                            .length
                        }{" "}
                        characters
                      </p>
                    </Field>

                    <Field label="Meta Description">
                      <textarea
                        value={
                          form.metaDescription
                        }
                        onChange={(e) =>
                          set(
                            "metaDescription",
                            e.target.value
                          )
                        }
                        rows={3}
                        placeholder="Discover traditional Indian handicrafts..."
                        className={`${inputCls} resize-none`}
                      />

                      <p className="text-[10px] text-[#9e8f7e] text-right">
                        {
                          form
                            .metaDescription
                            .length
                        }{" "}
                        characters
                      </p>
                    </Field>

                    <Field label="Schema Markup (JSON)">
                      <textarea
                        value={
                          form.schemaMarkup
                        }
                        onChange={(e) =>
                          set(
                            "schemaMarkup",
                            e.target.value
                          )
                        }
                        rows={12}
                        spellCheck={false}
                        placeholder={`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Blog Title"
}`}
                        className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
                      />

                      <p className="text-[10px] text-[#9e8f7e]">
                        Enter valid JSON. It will
                        be rendered as JSON-LD on
                        the public blog page.
                      </p>
                    </Field>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="border-t border-[#e8e0d5] pt-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-[#f0ebe3] flex items-center justify-center">
                        <BookOpen
                          size={13}
                          className="text-[#645643]"
                        />
                      </div>
                      <h3 className="text-xs font-bold tracking-widest uppercase text-[#615236]">
                        Blog Content
                      </h3>
                    </div>

                    <p className="text-[10px] text-[#9e8f7e]">
                      Choose: Visual Editor or paste HTML (tables, links, bold, italic)
                    </p>
                  </div>

                  {/* MODE TOGGLE */}
                  <div className="flex gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setContentMode("editor")}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        contentMode === "editor"
                          ? "bg-[#645643] text-white"
                          : "bg-[#f0ebe3] text-[#615236] hover:bg-[#e8e0d5]"
                      }`}
                    >
                      Visual Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentMode("html")}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        contentMode === "html"
                          ? "bg-[#645643] text-white"
                          : "bg-[#f0ebe3] text-[#615236] hover:bg-[#e8e0d5]"
                      }`}
                    >
                      HTML Code
                    </button>
                  </div>

                  {/* EDITOR MODE */}
                  {contentMode === "editor" && (
                    <Field
                      label="Content"
                      required
                    >
                      <BlogEditor
                        ref={editorRef}
                        value={form.content}
                        onChange={(value) =>
                          set(
                            "content",
                            value
                          )
                        }
                      />
                    </Field>
                  )}

                  {/* HTML MODE */}
                  {contentMode === "html" && (
                    <Field
                      label="HTML Code"
                      required
                    >
                      <textarea
                        value={form.content}
                        onChange={(e) =>
                          set(
                            "content",
                            e.target.value
                          )
                        }
                        placeholder={`<p>Paste HTML here (tables, links, formatting):</p>
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
<p>Add links: <a href="https://example.com">Click here</a></p>
<p><strong>Bold</strong> and <em>italic</em></p>`}
                        rows={12}
                        className={`${inputCls} resize-none font-mono text-xs`}
                      />
                      <p className="text-[10px] text-[#9e8f7e] mt-2">
                        ✅ Supports: Tables, Links, Bold, Italic, Lists, Headings
                      </p>
                    </Field>
                  )}
                </div>
              </div>
            </form>

            {/* FOOTER */}

            <div className="flex gap-3 px-6 py-4 border-t border-[#e8e0d5] shrink-0 bg-[#FFFDF9]">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={submitting}
                className="flex-1 border border-[#ddd5c8] text-[#9e8f7e] text-xs font-bold tracking-widest uppercase py-3 rounded-xl hover:bg-[#f5f0ea] transition-colors disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(null, "draft")}
                disabled={submitting}
                className="flex-1 border border-[#645643] text-[#645643] text-xs font-bold tracking-widest uppercase py-3 rounded-xl hover:bg-[#f5f0ea] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-[#645643] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Check size={14} />
                    Save Draft
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(null, "published")}
                disabled={submitting}
                className="flex-1 bg-[#645643] hover:bg-[#4d4233] text-white text-xs font-bold tracking-widest uppercase py-3 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Check size={14} />
                    Publish Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITOR STYLES */}

      <style jsx global>{`
        .blog-editor-wrapper .ql-toolbar {
          border: 1px solid #ddd5c8;
          border-radius: 12px 12px 0 0;
          background: #f8f4ef;
          padding: 10px;
        }

        .blog-editor-wrapper .ql-container {
          border: 1px solid #ddd5c8;
          border-top: 0;
          border-radius: 0 0 12px 12px;
          background: #ffffff;
          min-height: 350px;
          font-family: "MonaSans", Arial, sans-serif;
          font-size: 14px;
          color: #3b2f1e;
        }

        .blog-editor-wrapper .ql-editor {
          min-height: 350px;
          padding: 18px;
          line-height: 1.8;
        }

        .blog-editor-wrapper .ql-editor.ql-blank::before {
          color: #c4b9ac;
          font-style: normal;
        }

        .blog-editor-wrapper .ql-snow .ql-picker {
          color: #615236;
        }

        .blog-editor-wrapper .ql-snow .ql-stroke {
          stroke: #615236;
        }

        .blog-editor-wrapper .ql-snow .ql-fill {
          fill: #615236;
        }
      `}</style>
    </div>
  );
}