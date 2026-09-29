import CategoryPageClient from "./CategoryPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sirohihandicraft-backend.onrender.com";

// Server-side metadata generation
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const categorySlug = resolvedParams?.category;
    console.log("🔍 Fetching metadata for slug:", categorySlug);
    console.log("📡 API URL:", API_URL);
    
    // Force fresh fetch - no caching
    const res = await fetch(`${API_URL}/api/categories`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log("📊 Response status:", res.status);
    
    if (!res.ok) {
      console.error("❌ API Error:", res.statusText);
      throw new Error(`API returned ${res.status}`);
    }
    
    const data = await res.json();
    console.log("📦 Got categories:", data.data?.length, "categories");
    
    const categories = data.data || [];
    const category = categories.find((c) => c.slug === categorySlug);
    
    console.log("🔎 Looking for slug:", categorySlug);
    console.log("📋 Available slugs:", categories.map(c => c.slug));
    console.log("✅ Found category:", category ? "YES" : "NO");

    if (!category) {
      console.log("⚠️ Category not found for slug:", categorySlug);
      return {
        title: "Category Not Found | Sirohi Handicraft",
        description: "The category you are looking for does not exist.",
      };
    }

    console.log("✨ Returning metadata:", {
      title: category.metaTitle || `${category.title} | Sirohi Handicraft`,
      metaTitle: category.metaTitle,
      metaDescription: category.metaDescription,
    });

    return {
      title: category.metaTitle || `${category.title} | Sirohi Handicraft`,
      description: category.metaDescription || category.description || `Browse our ${category.title} collection at Sirohi Handicraft`,
      openGraph: {
        title: category.metaTitle || category.title,
        description: category.metaDescription || category.description,
        type: "website",
      },
    };
  } catch (error) {
    console.error("❌ Error in generateMetadata:", error.message);
    return {
      title: "Category | Sirohi Handicraft",
      description: "Browse our categories at Sirohi Handicraft",
    };
  }
}

export default function CategoryPage() {
  return <CategoryPageClient />;
}
