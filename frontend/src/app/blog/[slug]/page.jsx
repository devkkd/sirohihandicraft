import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://sirohihandicraft-backend.onrender.com";

/* =========================================================
   HELPERS
========================================================= */

function getImageUrl(image) {
  if (!image) return "";

  if (typeof image === "string") {
    return image;
  }

  return image?.url || "";
}

function getImageAlt(
  image,
  fallback = "Sirohi Handicraft"
) {
  if (!image) return fallback;

  if (typeof image === "string") {
    return fallback;
  }

  return image?.alt || fallback;
}

function formatDate(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

/* =========================================================
   GET SINGLE BLOG
========================================================= */

async function getBlogBySlug(slug) {
  try {
    const res = await fetch(
      `${API_URL}/api/blogs/slug/${encodeURIComponent(
        slug
      )}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(
        `Failed to fetch blog: ${res.status}`
      );
    }

    const json = await res.json();

    return json?.data || null;
  } catch (error) {
    console.error(
      "getBlogBySlug error:",
      error
    );

    return null;
  }
}

/* =========================================================
   GET ALL BLOGS
========================================================= */

async function getBlogs() {
  try {
    const res = await fetch(
      `${API_URL}/api/blogs?limit=100`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch blogs: ${res.status}`
      );
    }

    const json = await res.json();

    return Array.isArray(json?.data)
      ? json.data
      : [];
  } catch (error) {
    console.error(
      "getBlogs error:",
      error
    );

    return [];
  }
}

/* =========================================================
   STATIC PARAMS
========================================================= */

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs
    .filter((blog) => blog?.slug)
    .map((blog) => ({
      slug: blog.slug,
    }));
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}) {
  const { slug } = await params;

  const blog =
    await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog | Sirohi Handicraft",
      description:
        "Explore handicrafts, craftsmanship, natural materials and export insights from Sirohi Handicraft.",
    };
  }

  const title =
    blog.metaTitle ||
    `${blog.title} | Sirohi Handicraft`;

  const description =
    blog.metaDescription ||
    blog.description ||
    "";

  const imageUrl =
    getImageUrl(blog.image);

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "article",

      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: getImageAlt(
                blog.image,
                blog.title
              ),
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      images: imageUrl
        ? [imageUrl]
        : undefined,
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogDetailPage({
  params,
}) {
  const { slug } = await params;

  const blog =
    await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs =
    await getBlogs();

  const relatedBlogs =
    allBlogs
      .filter(
        (item) =>
          item?._id !== blog?._id &&
          item?.slug !== blog?.slug
      )
      .slice(0, 3);

  const imageUrl =
    getImageUrl(blog.image);

  const imageAlt =
    getImageAlt(
      blog.image,
      blog.title
    );

  const publishedDate =
    formatDate(
      blog.publishedAt ||
        blog.createdAt
    );

  /* =======================================================
     SAFE SCHEMA
  ======================================================= */

  const schemaMarkup =
    blog.schemaMarkup &&
    typeof blog.schemaMarkup ===
      "object"
      ? blog.schemaMarkup
      : null;

  const safeSchemaMarkup =
    schemaMarkup
      ? JSON.stringify(
          schemaMarkup
        )
          .replace(
            /</g,
            "\\u003c"
          )
          .replace(
            />/g,
            "\\u003e"
          )
          .replace(
            /&/g,
            "\\u0026"
          )
      : "";

  return (
    <main
      className="
        w-full
        min-h-screen
        bg-[#FFFDF9]
        text-[#4A4238]
      "
      style={{
        fontFamily:
          "'Poppins', sans-serif",
      }}
    >

      {/* =====================================================
          ARTICLE HERO
      ====================================================== */}

      <section
        className="
          max-w-[1100px]
          mx-auto
          px-5
          sm:px-6
          lg:px-10
          pt-14
          md:pt-20
          lg:pt-24
        "
      >

        {/* BACK */}

        <div className="mb-12 md:mb-14">
          <Link
            href="/blog"
            className="
              inline-flex
              items-center
              gap-2
              text-[12px]
              md:text-[13px]
              text-[#5C4634]
              hover:text-[#645643]
              transition-colors
            "
          >
            <FiArrowLeft
              size={15}
            />

            Back to Journal
          </Link>
        </div>

        {/* META */}

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            mb-6
          "
        >

          {blog.category && (
            <>
              <span
                className="
                  text-[9px]
                  md:text-[10px]
                  tracking-[0.2em]
                  font-semibold
                  text-[#5C4634]
                  uppercase
                "
              >
                {blog.category}
              </span>

              {publishedDate && (
                <span
                  className="
                    w-px
                    h-3
                    bg-[#D2C4B3]
                  "
                />
              )}
            </>
          )}

          {publishedDate && (
            <>
              <span
                className="
                  text-[9px]
                  md:text-[10px]
                  tracking-[0.15em]
                  text-[#6B7280]
                "
              >
                {publishedDate}
              </span>

              {blog.readTime && (
                <span
                  className="
                    w-px
                    h-3
                    bg-[#D2C4B3]
                  "
                />
              )}
            </>
          )}

          {blog.readTime && (
            <span
              className="
                text-[9px]
                md:text-[10px]
                tracking-[0.12em]
                text-[#6B7280]
              "
            >
              {blog.readTime}
            </span>
          )}

        </div>

        {/* H1 */}

        <h1
          className="
            text-center
            text-[40px]
            sm:text-[48px]
            md:text-[58px]
            lg:text-[64px]
            leading-[0.98]
            tracking-[-0.035em]
            text-[#5C4F3D]
            max-w-[950px]
            mx-auto
          "
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
            fontWeight: 500,
          }}
        >
          {blog.title}
        </h1>

        {/* DESCRIPTION */}

        {blog.description && (
          <p
            className="
              mt-7
              text-center
              text-[13px]
              md:text-[14px]
              lg:text-[15px]
              leading-[1.8]
              text-[#5E554D]
              max-w-[720px]
              mx-auto
            "
          >
            {blog.description}
          </p>
        )}

        {/* AUTHOR */}

        <div className="flex justify-center mt-7">
          <span
            className="
              text-[10px]
              tracking-[0.18em]
              uppercase
              text-[#8A7B6B]
            "
          >
            By{" "}
            {blog.author ||
              "Sirohi Handicraft"}
          </span>
        </div>

      </section>

      {/* =====================================================
          FEATURED IMAGE
      ====================================================== */}

      {imageUrl && (
        <section
          className="
            max-w-[1350px]
            mx-auto
            px-5
            sm:px-6
            lg:px-12
            mt-12
            md:mt-16
            lg:mt-20
          "
        >
          <div
            className="
              w-full
              aspect-[1.9/1]
              md:aspect-[2.15/1]
              overflow-hidden
              rounded-[16px]
              bg-[#F2EEE8]
            "
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className="
                w-full
                h-full
                object-cover
              "
              loading="eager"
            />
          </div>
        </section>
      )}

      {/* =====================================================
          BLOG CONTENT
      ====================================================== */}

      {blog.content && (
        <article
          className="
            max-w-[820px]
            mx-auto
            px-5
            sm:px-6
            lg:px-0
            py-14
            md:py-20
            lg:py-24
          "
        >
          <div
            className="
              blog-content
              text-[15px]
              md:text-[16px]
              lg:text-[17px]
              leading-[1.85]
              text-[#5E554D]
            "
            dangerouslySetInnerHTML={{
              __html:
                blog.content,
            }}
          />
        </article>
      )}

      {/* =====================================================
          ARTICLE FOOTER
      ====================================================== */}

      <section
        className="
          max-w-[820px]
          mx-auto
          px-5
          sm:px-6
          lg:px-0
          pb-20
        "
      >
        <div
          className="
            border-t
            border-[#E0DACD]
            pt-8
          "
        >
          <Link
            href="/blog"
            className="
              inline-flex
              items-center
              gap-2
              text-[13px]
              md:text-[14px]
              text-[#5C4634]
              hover:text-[#645643]
              transition-colors
            "
          >
            <FiArrowLeft
              size={15}
            />

            Back to Journal
          </Link>
        </div>
      </section>

      {/* =====================================================
          RELATED ARTICLES
      ====================================================== */}

      {relatedBlogs.length > 0 && (
        <section
          className="
            border-t
            border-[#E0DACD]
          "
        >
          <div
            className="
              max-w-[1400px]
              mx-auto
              px-5
              sm:px-6
              lg:px-12
              py-20
              md:py-24
              lg:py-28
            "
          >

            <div
              className="
                flex
                flex-col
                items-center
                text-center
                mb-12
                md:mb-16
              "
            >
              <span
                className="
                  text-[10px]
                  tracking-[0.2em]
                  font-semibold
                  text-[#6B5A4A]
                  uppercase
                  mb-4
                "
              >
                CONTINUE READING
              </span>

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  lg:text-5xl
                  leading-none
                  tracking-[-0.025em]
                  text-[#5C4F3D]
                "
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontWeight: 500,
                }}
              >
                More From Our Journal
              </h2>
            </div>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-8
              "
            >
              {relatedBlogs.map(
                (item) => {
                  const itemImage =
                    getImageUrl(
                      item.image
                    );

                  const itemAlt =
                    getImageAlt(
                      item.image,
                      item.title
                    );

                  return (
                    <Link
                      key={
                        item._id ||
                        item.slug
                      }
                      href={`/blog/${item.slug}`}
                      className="group block"
                    >
                      <div
                        className="
                          w-full
                          aspect-[1.55/1]
                          overflow-hidden
                          rounded-[14px]
                          bg-[#F2EEE8]
                        "
                      >
                        {itemImage ? (
                          <img
                            src={itemImage}
                            alt={itemAlt}
                            className="
                              w-full
                              h-full
                              object-cover
                              transition-transform
                              duration-700
                              ease-out
                              group-hover:scale-[1.025]
                            "
                          />
                        ) : (
                          <div
                            className="
                              w-full
                              h-full
                              flex
                              items-center
                              justify-center
                              text-[#8B8177]
                              text-sm
                            "
                          >
                            Sirohi Handicraft
                          </div>
                        )}
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mt-4
                          mb-3.5
                        "
                      >
                        {item.category && (
                          <>
                            <span
                              className="
                                text-[9px]
                                md:text-[10px]
                                tracking-[0.18em]
                                font-semibold
                                text-[#4A4238]
                              "
                            >
                              {item.category}
                            </span>

                            <span
                              className="
                                w-px
                                h-3
                                bg-[#D2C4B3]
                              "
                            />
                          </>
                        )}

                        <span
                          className="
                            text-[9px]
                            md:text-[10px]
                            tracking-[0.12em]
                            text-[#6B7280]
                          "
                        >
                          {formatDate(
                            item.publishedAt ||
                              item.createdAt
                          )}
                        </span>
                      </div>

                      <h3
                        className="
                          text-[22px]
                          md:text-[23px]
                          lg:text-[24px]
                          leading-[1.08]
                          tracking-[-0.015em]
                          text-[#111111]
                          group-hover:text-[#5C4F3D]
                          transition-colors
                          duration-300
                        "
                        style={{
                          fontFamily:
                            "'Cormorant Garamond', serif",
                          fontWeight: 500,
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-3
                          text-[13px]
                          md:text-[14px]
                          leading-[1.7]
                          text-[#5E554D]
                        "
                      >
                        {item.description}
                      </p>

                      <div
                        className="
                          mt-5
                          inline-flex
                          items-center
                          gap-2
                          text-[13px]
                          md:text-[14px]
                          text-[#5C4634]
                        "
                      >
                        <span
                          className="
                            border-b
                            border-[#8C7560]
                            pb-0.5
                          "
                        >
                          Read More
                        </span>

                        <FiArrowRight
                          size={15}
                          strokeWidth={1.5}
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          BLOG CONTENT CSS
      ====================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* =================================================
               BASE
            ================================================= */

            .blog-content {
              width: 100%;
              max-width: 100%;
              min-width: 0;

              color: #5E554D;

              font-family:
                "MonaSans",
                Arial,
                sans-serif;

              font-size: 17px;
              line-height: 1.85;

              /*
               * Keep complete words intact.
               * Only break when a very long string has
               * absolutely no natural break point.
               */
              overflow-wrap: break-word;
              word-break: normal;
              hyphens: none;
            }

            .blog-content > * {
              max-width: 100%;
            }

            /* =================================================
               PARAGRAPHS
            ================================================= */

            .blog-content p {
              margin: 0 0 26px;

              color: #5E554D;

              font-size: inherit;
              line-height: 1.85;

              overflow-wrap: break-word;
              word-break: normal;
              hyphens: none;
            }

            /* =================================================
               HEADINGS
            ================================================= */

            .blog-content h1,
            .blog-content h2,
            .blog-content h3,
            .blog-content h4,
            .blog-content h5,
            .blog-content h6 {
              font-family:
                "Cormorant Garamond",
                serif;

              color: #5C4F3D;

              font-weight: 500;

              letter-spacing:
                -0.02em;

              overflow-wrap: break-word;
              word-break: normal;
              hyphens: none;
            }

            .blog-content h1 {
              margin:
                54px 0 24px;

              font-size:
                42px;

              line-height:
                1.08;
            }

            .blog-content h2 {
              margin:
                50px 0 22px;

              font-size:
                38px;

              line-height:
                1.08;
            }

            .blog-content h3 {
              margin:
                42px 0 18px;

              font-size:
                30px;

              line-height:
                1.1;
            }

            .blog-content h4 {
              margin:
                34px 0 16px;

              font-size:
                25px;

              line-height:
                1.15;
            }

            .blog-content h5,
            .blog-content h6 {
              margin:
                30px 0 14px;

              font-size:
                22px;

              line-height:
                1.2;
            }

            /* =================================================
               BOLD
            ================================================= */

            .blog-content strong,
            .blog-content b {
              color:
                #111111;

              font-weight:
                700;
            }

            /* =================================================
               ITALIC
            ================================================= */

            .blog-content em,
            .blog-content i {
              font-style:
                italic;
            }

            /* =================================================
               LINK
            ================================================= */

            .blog-content a {
              color:
                #2563EB;

              font-weight:
                700;

              text-decoration:
                underline;

              text-decoration-color:
                #2563EB;

              text-underline-offset:
                4px;

              overflow-wrap:
                break-word;

              word-break:
                normal;

              hyphens:
                none;

              white-space:
                normal;

              transition:
                color 0.25s ease;
            }

            .blog-content a:hover {
              color:
                #1D4ED8;

              text-decoration-color:
                #1D4ED8;
            }

            /* =================================================
               UNORDERED LIST
            ================================================= */

            .blog-content ul {
              display:
                block;

              margin:
                0 0 28px;

              padding-left:
                30px;

              list-style-type:
                disc;

              list-style-position:
                outside;

              color:
                #5E554D;

              font-size:
                17px;

              line-height:
                1.85;
            }

            /* =================================================
               ORDERED LIST
            ================================================= */

            .blog-content ol {
              display:
                block;

              margin:
                0 0 28px;

              padding-left:
                32px;

              list-style-type:
                decimal;

              list-style-position:
                outside;

              color:
                #5E554D;

              font-size:
                17px;

              line-height:
                1.85;
            }

            /* =================================================
               LIST ITEMS
            ================================================= */

            .blog-content li {
              margin:
                0 0 9px;

              padding-left:
                4px;

              color:
                #5E554D;

              font-size:
                17px;

              line-height:
                1.85;

              overflow-wrap:
                break-word;

              word-break:
                normal;

              hyphens:
                none;
            }

            .blog-content li:last-child {
              margin-bottom:
                0;
            }

            .blog-content li > p {
              margin:
                0 0 8px;
            }

            /* =================================================
               NESTED LISTS
            ================================================= */

            .blog-content ul ul {
              list-style-type:
                circle;

              margin:
                8px 0 10px;
            }

            .blog-content ul ul ul {
              list-style-type:
                square;
            }

            .blog-content ol ol {
              list-style-type:
                lower-alpha;

              margin:
                8px 0 10px;
            }

            .blog-content ol ol ol {
              list-style-type:
                lower-roman;
            }

            /* =================================================
               BLOCKQUOTE
            ================================================= */

            .blog-content blockquote {
              margin:
                44px 0;

              padding:
                32px 36px;

              background:
                #FBF3E6;

              border-radius:
                18px;

              color:
                #4A4238;

              font-family:
                "Cormorant Garamond",
                serif;

              font-size:
                26px;

              line-height:
                1.45;

              font-style:
                italic;

              max-width:
                100%;

              overflow-wrap:
                break-word;

              word-break:
                normal;

              hyphens:
                none;
            }

            /* =================================================
               TABLE WRAPPER
            ================================================= */

            .blog-content .table-wrapper {
              display:
                block;

              width:
                100%;

              max-width:
                100%;

              margin:
                40px 0;

              overflow-x:
                auto;

              overflow-y:
                hidden;

              -webkit-overflow-scrolling:
                touch;

              scrollbar-width:
                thin;

              scrollbar-color:
                #CDBFAB
                #F5EEE8;
            }

            /*
             * Direct tables also get responsive
             * horizontal scrolling on small screens.
             */
            .blog-content {
              --blog-table-min-width:
                620px;
            }

            /* =================================================
               TABLE
            ================================================= */

            .blog-content table {
              width:
                100%;

              max-width:
                100%;

              min-width:
                620px;

              margin:
                40px 0;

              border-collapse:
                separate;

              border-spacing:
                0;

              table-layout:
                auto;

              background:
                #FFFDF9;

              border:
                1px solid #D2C4B3;

              border-radius:
                12px;

              overflow:
                hidden;

              font-family:
                "MonaSans",
                Arial,
                sans-serif;

              font-size:
                14px;

              line-height:
                1.55;

              color:
                #5E554D;
            }

            .blog-content .table-wrapper table {
              margin:
                0;
            }

            /* =================================================
               THEAD
            ================================================= */

            .blog-content table thead {
              background:
                #F5EEE5;
            }

            /* =================================================
               TABLE ROW
            ================================================= */

            .blog-content table tr {
              border:
                0;
            }

            /* =================================================
               TABLE HEADER
            ================================================= */

            .blog-content table th {
              padding:
                15px 17px;

              background:
                #F5EEE5;

              color:
                #111111;

              font-weight:
                700;

              text-align:
                left;

              vertical-align:
                middle;

              border-right:
                1px solid #D2C4B3;

              border-bottom:
                1px solid #D2C4B3;

              min-width:
                100px;

              max-width:
                100%;

              overflow-wrap:
                break-word;

              word-break:
                normal;

              word-spacing:
                normal;

              hyphens:
                none;

              white-space:
                normal;
            }

            .blog-content table th:last-child {
              border-right:
                0;
            }

            /* =================================================
               TABLE CELLS
            ================================================= */

            .blog-content table td {
              padding:
                14px 17px;

              color:
                #5E554D;

              background:
                #FFFDF9;

              font-weight:
                400;

              text-align:
                left;

              vertical-align:
                top;

              border-right:
                1px solid #E0DACD;

              border-bottom:
                1px solid #E0DACD;

              min-width:
                100px;

              max-width:
                100%;

              overflow-wrap:
                break-word;

              word-break:
                normal;

              word-spacing:
                normal;

              hyphens:
                none;

              white-space:
                normal;
            }

            .blog-content table td:last-child {
              border-right:
                0;
            }

            .blog-content
              table
              tbody
              tr:last-child
              td {
              border-bottom:
                0;
            }

            /* =================================================
               TABLE ALTERNATE ROWS
            ================================================= */

            .blog-content
              table
              tbody
              tr:nth-child(even)
              td {
              background:
                #FCF8F3;
            }

            /* =================================================
               TABLE HOVER
            ================================================= */

            .blog-content
              table
              tbody
              tr:hover
              td {
              background:
                #F8F1E8;
            }

            /* =================================================
               TABLE BOLD
            ================================================= */

            .blog-content
              table
              strong,

            .blog-content
              table
              b {
              color:
                #111111;

              font-weight:
                700;
            }

            /* =================================================
               TABLE LINKS
            ================================================= */

            .blog-content
              table
              a {
              color:
                #2563EB;

              font-weight:
                700;

              text-decoration:
                underline;
            }

            /* =================================================
               TABLE CAPTION
            ================================================= */

            .blog-content
              table
              caption {
              caption-side:
                top;

              padding:
                0 0 12px;

              color:
                #5C4F3D;

              font-family:
                "Cormorant Garamond",
                serif;

              font-size:
                24px;

              font-weight:
                500;

              text-align:
                left;
            }

            /* =================================================
               CONTENT IMAGES
            ================================================= */

            .blog-content img {
              display:
                block;

              width:
                auto;

              max-width:
                100%;

              height:
                auto;

              margin:
                38px auto;

              border-radius:
                14px;

              object-fit:
                contain;
            }

            /* =================================================
               FIGURE
            ================================================= */

            .blog-content figure {
              width:
                100%;

              max-width:
                100%;

              margin:
                38px 0;
            }

            .blog-content figure img {
              margin:
                0 auto;
            }

            .blog-content figcaption {
              margin-top:
                10px;

              color:
                #8A7B6B;

              font-size:
                12px;

              line-height:
                1.5;

              text-align:
                center;
            }

            /* =================================================
               HR
            ================================================= */

            .blog-content hr {
              margin:
                46px 0;

              border:
                0;

              border-top:
                1px solid #E0DACD;
            }

            /* =================================================
               PRE / CODE
            ================================================= */

            .blog-content pre {
              max-width:
                100%;

              margin:
                30px 0;

              padding:
                16px;

              background:
                #F5F0EA;

              border-radius:
                12px;

              white-space:
                pre-wrap;

              overflow-x:
                auto;

              overflow-wrap:
                break-word;
            }

            .blog-content code {
              max-width:
                100%;

              overflow-x:
                auto;
            }

            /* =================================================
               MOBILE
            ================================================= */

            @media (max-width: 768px) {

              .blog-content {
                font-size:
                  15px;

                line-height:
                  1.8;

                overflow-wrap:
                  break-word;

                word-break:
                  normal;

                hyphens:
                  none;
              }

              .blog-content p {
                font-size:
                  15px;

                line-height:
                  1.8;

                margin-bottom:
                  22px;
              }

              .blog-content h1 {
                margin:
                  42px 0 20px;

                font-size:
                  34px;

                line-height:
                  1.08;
              }

              .blog-content h2 {
                margin:
                  40px 0 20px;

                font-size:
                  31px;

                line-height:
                  1.08;
              }

              .blog-content h3 {
                margin:
                  34px 0 16px;

                font-size:
                  26px;

                line-height:
                  1.1;
              }

              .blog-content h4,
              .blog-content h5,
              .blog-content h6 {
                margin:
                  30px 0 14px;

                font-size:
                  22px;

                line-height:
                  1.2;
              }

              /* =============================================
                 MOBILE LIST
              ============================================= */

              .blog-content ul {
                margin-bottom:
                  24px;

                padding-left:
                  24px;

                font-size:
                  15px;

                line-height:
                  1.8;
              }

              .blog-content ol {
                margin-bottom:
                  24px;

                padding-left:
                  26px;

                font-size:
                  15px;

                line-height:
                  1.8;
              }

              .blog-content li {
                margin-bottom:
                  8px;

                padding-left:
                  4px;

                font-size:
                  15px;

                line-height:
                  1.8;

                overflow-wrap:
                  break-word;

                word-break:
                  normal;

                hyphens:
                  none;
              }

              /* =============================================
                 MOBILE BLOCKQUOTE
              ============================================= */

              .blog-content blockquote {
                margin:
                  34px 0;

                padding:
                  26px 22px;

                font-size:
                  22px;
              }

              /* =============================================
                 MOBILE TABLE
              ============================================= */

              .blog-content .table-wrapper {
                width:
                  100%;

                max-width:
                  100%;

                margin:
                  30px 0;

                overflow-x:
                  auto;

                overflow-y:
                  hidden;

                -webkit-overflow-scrolling:
                  touch;
              }

              .blog-content
                .table-wrapper
                table {
                min-width:
                  620px;

                width:
                  max-content;

                margin:
                  0;
              }

              /*
               * Direct table without wrapper.
               */
              .blog-content > table {
                display:
                  block;

                width:
                  100%;

                max-width:
                  100%;

                overflow-x:
                  auto;

                overflow-y:
                  hidden;

                margin:
                  30px 0;
              }

              .blog-content
                > table
                thead,

              .blog-content
                > table
                tbody {
                width:
                  100%;
              }

              .blog-content table {
                font-size:
                  13px;

                line-height:
                  1.55;
              }

              .blog-content table th {
                padding:
                  11px 13px;

                font-size:
                  13px;

                white-space:
                  normal;
              }

              .blog-content table td {
                padding:
                  11px 13px;

                font-size:
                  13px;

                white-space:
                  normal;
              }

              /* =============================================
                 MOBILE IMAGES
              ============================================= */

              .blog-content img {
                width:
                  auto;

                max-width:
                  100%;

                height:
                  auto;

                margin:
                  30px auto;

                border-radius:
                  12px;
              }

              .blog-content figure {
                margin:
                  30px 0;
              }

              .blog-content hr {
                margin:
                  36px 0;
              }
            }

            /* =================================================
               SMALL MOBILE
            ================================================= */

            @media (max-width: 480px) {

              .blog-content {
                font-size:
                  14px;

                line-height:
                  1.8;
              }

              .blog-content p {
                font-size:
                  14px;
              }

              .blog-content ul,
              .blog-content ol {
                font-size:
                  14px;

                line-height:
                  1.8;

                padding-left:
                  23px;
              }

              .blog-content li {
                font-size:
                  14px;

                line-height:
                  1.8;
              }

              .blog-content
                .table-wrapper
                table {
                min-width:
                  560px;
              }

              .blog-content
                > table {
                margin:
                  28px 0;
              }

              .blog-content
                table
                th,

              .blog-content
                table
                td {
                padding:
                  10px 11px;

                font-size:
                  12px;
              }

              .blog-content blockquote {
                padding:
                  22px 18px;

                font-size:
                  20px;
              }
            }
          `,
        }}
      />

      {/* =====================================================
          SAFE JSON-LD
      ====================================================== */}

      {safeSchemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              safeSchemaMarkup,
          }}
        />
      )}

    </main>
  );
}