const siteUrl = "https://www.sirohihandicraft.com";

const mainPages = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/story", changeFrequency: "monthly", priority: 0.8 },
  { path: "/clients", changeFrequency: "monthly", priority: 0.7 },
  { path: "/certificates", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/collections", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vintage", changeFrequency: "monthly", priority: 0.7 },
];

const categoryPages = [
  { path: "/category/wooden", changeFrequency: "weekly", priority: 0.9 },
  { path: "/category/marble", changeFrequency: "weekly", priority: 0.9 },
];

export default function sitemap() {
  return [...mainPages, ...categoryPages].map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}