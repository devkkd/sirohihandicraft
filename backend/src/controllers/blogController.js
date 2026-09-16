const Blog = require("../models/Blog");

const {
  uploadToCloudflare,
  deleteFromCloudflare,
} = require("../utils/cloudflare");

const sanitizeHtml = require("sanitize-html");

/* =========================================================
   SLUG
========================================================= */

const toSlug = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* =========================================================
   SANITIZE BLOG HTML
========================================================= */

const sanitizeBlogContent = (html = "") => {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",

      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",

      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",

      "ul",
      "ol",
      "li",

      "blockquote",

      "a",

      "img",

      "figure",
      "figcaption",

      "div",
      "span",

      "hr",

      /* =========================
         TABLE SUPPORT
      ========================= */

      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "caption",
    ],

    allowedAttributes: {
      /* =========================
         LINKS
      ========================= */

      a: [
        "href",
        "target",
        "rel",
        "title",
      ],

      /* =========================
         IMAGES
      ========================= */

      img: [
        "src",
        "alt",
        "title",
        "width",
        "height",
      ],

      /* =========================
         TABLE
      ========================= */

      table: [
        "class",
        "style",
      ],

      thead: [
        "class",
        "style",
      ],

      tbody: [
        "class",
        "style",
      ],

      tfoot: [
        "class",
        "style",
      ],

      tr: [
        "class",
        "style",
      ],

      th: [
        "class",
        "style",
        "colspan",
        "rowspan",
      ],

      td: [
        "class",
        "style",
        "colspan",
        "rowspan",
      ],

      caption: [
        "class",
        "style",
      ],

      "*": [
        "class",
      ],
    },

    allowedSchemes: [
      "http",
      "https",
      "mailto",
    ],

    transformTags: {
      a: sanitizeHtml.simpleTransform(
        "a",
        {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      ),
    },
  });
};

/* =========================================================
   UNIQUE SLUG
========================================================= */

const generateUniqueSlug = async (
  title,
  existingId = null
) => {
  const baseSlug = toSlug(title);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = {
      slug,
    };

    if (existingId) {
      query._id = {
        $ne: existingId,
      };
    }

    const existing =
      await Blog.findOne(query)
        .select("_id")
        .lean();

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

/* =========================================================
   SCHEMA MARKUP
========================================================= */

const parseSchemaMarkup = (
  schemaMarkup
) => {
  if (!schemaMarkup) {
    return null;
  }

  if (
    typeof schemaMarkup ===
    "object"
  ) {
    return schemaMarkup;
  }

  try {
    return JSON.parse(schemaMarkup);
  } catch {
    const err = new Error(
      "Invalid Schema Markup JSON"
    );

    err.statusCode = 400;

    throw err;
  }
};

/* =========================================================
   PUBLIC BLOG LIST
 *
 * GET /api/blogs
========================================================= */

const getBlogs = async (
  req,
  res,
  next
) => {
  try {
    const page = Math.max(
      parseInt(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        parseInt(req.query.limit) || 10,
        1
      ),
      100
    );

    const skip =
      (page - 1) * limit;

    const filter = {
      status: "published",
    };

    if (req.query.category) {
      filter.category =
        req.query.category;
    }

    if (req.query.search) {
      filter.$or = [
        {
          title: {
            $regex:
              req.query.search,
            $options: "i",
          },
        },
        {
          description: {
            $regex:
              req.query.search,
            $options: "i",
          },
        },
      ];
    }

    const [
      blogs,
      total,
    ] = await Promise.all([
      Blog.find(filter)
        .select(
          "-content -schemaMarkup"
        )
        .sort({
          featured: -1,
          publishedAt: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Blog.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: blogs.length,

      pagination: {
        total,
        page,
        pages: Math.ceil(
          total / limit
        ),
        limit,
      },

      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   ADMIN BLOG LIST
 *
 * GET /api/blogs/admin/all
========================================================= */

const getAdminBlogs = async (
  req,
  res,
  next
) => {
  try {
    const page = Math.max(
      parseInt(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        parseInt(req.query.limit) || 10,
        1
      ),
      100
    );

    const skip =
      (page - 1) * limit;

    const filter = {};

    if (req.query.category) {
      filter.category =
        req.query.category;
    }

    if (req.query.status) {
      filter.status =
        req.query.status;
    }

    if (req.query.search) {
      filter.$or = [
        {
          title: {
            $regex:
              req.query.search,
            $options: "i",
          },
        },
        {
          description: {
            $regex:
              req.query.search,
            $options: "i",
          },
        },
      ];
    }

    const [
      blogs,
      total,
    ] = await Promise.all([
      Blog.find(filter)
        .sort({
          featured: -1,
          publishedAt: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Blog.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: blogs.length,

      pagination: {
        total,
        page,
        pages: Math.ceil(
          total / limit
        ),
        limit,
      },

      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   PUBLIC SINGLE BLOG
 *
 * GET /api/blogs/slug/:slug
========================================================= */

const getBlogBySlug = async (
  req,
  res,
  next
) => {
  try {
    const blog =
      await Blog.findOne({
        slug: req.params.slug,
        status: "published",
      }).lean();

    if (!blog) {
      const err = new Error(
        "Blog not found"
      );

      err.statusCode = 404;

      return next(err);
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   ADMIN SINGLE BLOG
 *
 * GET /api/blogs/id/:id
========================================================= */

const getBlogById = async (
  req,
  res,
  next
) => {
  try {
    const blog =
      await Blog.findById(
        req.params.id
      ).lean();

    if (!blog) {
      const err = new Error(
        "Blog not found"
      );

      err.statusCode = 404;

      return next(err);
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   CREATE BLOG
 *
 * POST /api/blogs
========================================================= */

const createBlog = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      slug: requestedSlug,
      description,
      category,
      content,
      author,
      readTime,
      publishedAt,
      status,
      metaTitle,
      metaDescription,
      schemaMarkup,
      featured,
    } = req.body;

    /* =========================
       VALIDATION
    ========================= */

    if (!title?.trim()) {
      const err = new Error(
        "Blog title is required"
      );

      err.statusCode = 400;

      return next(err);
    }

    if (!description?.trim()) {
      const err = new Error(
        "Blog description is required"
      );

      err.statusCode = 400;

      return next(err);
    }

    if (!content?.trim()) {
      const err = new Error(
        "Blog content is required"
      );

      err.statusCode = 400;

      return next(err);
    }

    /* =========================
       SLUG
    ========================= */

    const finalSlug =
      requestedSlug?.trim()
        ? await generateUniqueSlug(
            requestedSlug
          )
        : await generateUniqueSlug(
            title
          );

    /* =========================
       IMAGE
    ========================= */

    let imageUrl = "";

    if (req.file) {
      const uniqueFileName =
        `blog-${Date.now()}-${req.file.originalname}`;

      imageUrl =
        await uploadToCloudflare(
          req.file.buffer,
          req.file.mimetype,
          uniqueFileName
        );
    }

    /* =========================
       STATUS
    ========================= */

    const finalStatus =
      status === "published"
        ? "published"
        : "draft";

    /* =========================
       PUBLISHED DATE
    ========================= */

    let finalPublishedAt = null;

    if (
      finalStatus ===
      "published"
    ) {
      finalPublishedAt =
        publishedAt ||
        new Date();
    }

    /* =========================
       CREATE
    ========================= */

    const blog =
      await Blog.create({
        title: title.trim(),

        slug: finalSlug,

        description:
          description.trim(),

        category:
          category || "",

        image: {
          url: imageUrl,

          alt:
            req.body.imageAlt ||
            "",
        },

        content:
          sanitizeBlogContent(
            content
          ),

        author:
          author ||
          "Sirohi Handicraft",

        readTime:
          readTime ||
          "5 min read",

        publishedAt:
          finalPublishedAt,

        status:
          finalStatus,

        metaTitle:
          metaTitle ||
          title.trim(),

        metaDescription:
          metaDescription ||
          description.trim(),

        schemaMarkup:
          parseSchemaMarkup(
            schemaMarkup
          ),

        featured:
          featured === "true" ||
          featured === true,
      });

    res.status(201).json({
      success: true,

      message:
        "Blog created successfully",

      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   UPDATE BLOG
 *
 * PUT /api/blogs/:id
========================================================= */

const updateBlog = async (
  req,
  res,
  next
) => {
  try {
    const blog =
      await Blog.findById(
        req.params.id
      );

    if (!blog) {
      const err = new Error(
        "Blog not found"
      );

      err.statusCode = 404;

      return next(err);
    }

    const {
      title,
      slug,
      description,
      category,
      content,
      author,
      readTime,
      publishedAt,
      status,
      metaTitle,
      metaDescription,
      schemaMarkup,
      featured,
    } = req.body;

    /* =========================
       BASIC FIELDS
    ========================= */

    if (title !== undefined) {
      const trimmedTitle =
        title.trim();

      if (!trimmedTitle) {
        const err = new Error(
          "Blog title is required"
        );

        err.statusCode = 400;

        return next(err);
      }

      /*
       * Update slug automatically
       * when title changes and
       * custom slug is not supplied.
       */
      if (
        trimmedTitle !==
          blog.title &&
        slug === undefined
      ) {
        blog.slug =
          await generateUniqueSlug(
            trimmedTitle,
            blog._id
          );
      }

      blog.title =
        trimmedTitle;
    }

    if (
      description !==
      undefined
    ) {
      blog.description =
        description.trim();
    }

    if (
      category !==
      undefined
    ) {
      blog.category =
        category;
    }

    if (
      content !==
      undefined
    ) {
      blog.content =
        sanitizeBlogContent(
          content
        );
    }

    if (
      author !==
      undefined
    ) {
      blog.author =
        author;
    }

    if (
      readTime !==
      undefined
    ) {
      blog.readTime =
        readTime;
    }

    /* =========================
       CUSTOM SLUG
    ========================= */

    if (
      slug !== undefined &&
      slug.trim()
    ) {
      blog.slug =
        await generateUniqueSlug(
          slug,
          blog._id
        );
    }

    /* =========================
       SEO
    ========================= */

    if (
      metaTitle !==
      undefined
    ) {
      blog.metaTitle =
        metaTitle;
    }

    if (
      metaDescription !==
      undefined
    ) {
      blog.metaDescription =
        metaDescription;
    }

    if (
      schemaMarkup !==
      undefined
    ) {
      blog.schemaMarkup =
        parseSchemaMarkup(
          schemaMarkup
        );
    }

    /* =========================
       FEATURED
    ========================= */

    if (
      featured !==
      undefined
    ) {
      blog.featured =
        featured === "true" ||
        featured === true;
    }

    /* =========================
       STATUS
    ========================= */

    if (
      status !==
      undefined
    ) {
      const nextStatus =
        status ===
        "published"
          ? "published"
          : "draft";

      blog.status =
        nextStatus;

      if (
        nextStatus ===
        "published"
      ) {
        if (
          !blog.publishedAt
        ) {
          blog.publishedAt =
            publishedAt ||
            new Date();
        } else if (
          publishedAt
        ) {
          blog.publishedAt =
            publishedAt;
        }
      }

      if (
        nextStatus ===
        "draft"
      ) {
        blog.publishedAt =
          null;
      }
    } else if (
      publishedAt !==
      undefined
    ) {
      blog.publishedAt =
        publishedAt || null;
    }

    /* =========================
       IMAGE UPLOAD
    ========================= */

    if (req.file) {
      const uniqueFileName =
        `blog-${Date.now()}-${req.file.originalname}`;

      const newImageUrl =
        await uploadToCloudflare(
          req.file.buffer,
          req.file.mimetype,
          uniqueFileName
        );

      /* Delete old image */

      if (blog.image?.url) {
        try {
          await deleteFromCloudflare(
            blog.image.url
          );
        } catch (
          deleteError
        ) {
          console.error(
            "Old blog image deletion failed:",
            deleteError.message
          );
        }
      }

      blog.image.url =
        newImageUrl;
    }

    /* =========================
       IMAGE ALT
    ========================= */

    if (
      req.body.imageAlt !==
      undefined
    ) {
      blog.image.alt =
        req.body.imageAlt;
    }

    /* =========================
       SAVE
    ========================= */

    await blog.save();

    res.status(200).json({
      success: true,

      message:
        "Blog updated successfully",

      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   DELETE BLOG
 *
 * DELETE /api/blogs/:id
========================================================= */

const deleteBlog = async (
  req,
  res,
  next
) => {
  try {
    const blog =
      await Blog.findById(
        req.params.id
      );

    if (!blog) {
      const err = new Error(
        "Blog not found"
      );

      err.statusCode = 404;

      return next(err);
    }

    /* =========================
       DELETE R2 IMAGE
    ========================= */

    if (blog.image?.url) {
      try {
        await deleteFromCloudflare(
          blog.image.url
        );
      } catch (
        deleteError
      ) {
        console.error(
          "Cloudflare image deletion failed:",
          deleteError.message
        );
      }
    }

    /* =========================
       DELETE BLOG
    ========================= */

    await blog.deleteOne();

    res.status(200).json({
      success: true,

      message:
        "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  getBlogs,
  getAdminBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};