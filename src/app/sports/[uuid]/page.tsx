import SportsDetailComponent from "@/components/sports/SportsDertailComponent";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

// ទាញយក URL ចេញពី env
const BACKEND_API_URL = process.env.BACKEND_API_URL;
const MEDIA_DOMAIN = BACKEND_API_URL ? BACKEND_API_URL.replace(/\/api\/v1\/?$/, "") : "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sportiva-rho.vercel.app";

// Direct Public Fetch សម្រាប់ Server-side SEO / OpenGraph
async function fetchDirectSport(uuid: string) {
  if (!BACKEND_API_URL) {
    console.error("Missing BACKEND_API_URL environment variable!");
    return null;
  }

  try {
    const res = await fetch(`${BACKEND_API_URL}/sports/${uuid}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || json;
  } catch (err) {
    console.error("OG Metadata fetch error:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uuid } = await params;
  const sport = await fetchDirectSport(uuid);

  // ប្រសិនបើទាញបាន ចាប់យក title និង description ពិតប្រាកដ
  const title = sport?.name 
    ? `${sport.name} | Sportiva` 
    : "Sport Details | Sportiva";

  const description = sport?.description 
    ? sport.description.slice(0, 160) 
    : `Explore detailed information and guides for ${sport?.name || "sports"} at Sportiva.`;

  // ចាប់យករូបភាព Dynamic ផ្ទាល់
  const rawImage = sport?.image || sport?.coverImage || sport?.imageUrls?.[0];
  let imageUrl = `${SITE_URL}/image/sportiva-thurbmail.jpg`; // Fallback image ប្រសិនបើគ្មានរូបភាព
  if (rawImage) {
    imageUrl = rawImage.startsWith("http")
      ? rawImage
      : `${MEDIA_DOMAIN}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/sports/${uuid}`,
      siteName: "Sportiva",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SportsDetailPage({ params }: PageProps) {
  const { uuid } = await params;

  return <SportsDetailComponent uuid={uuid} />;
}