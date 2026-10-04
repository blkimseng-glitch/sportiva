import SportsDetailComponent from "@/components/sports/SportsDertailComponent";
import { getSportByUuid } from "@/services/sportService"; 
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

// ទាញយកទិន្នន័យ Detail របស់ Sport
async function fetchSportData(uuid: string) {
  try {
    const sport = await getSportByUuid(uuid);
    return sport;
  } catch (error) {
    console.error("Failed to fetch sport details:", error);
    return null;
  }
}

// 1. Generate Dynamic Metadata សម្រាប់ SEO និង Social Share Preview
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uuid } = await params;
  const sport = await fetchSportData(uuid);

  // រៀបចំ Title & Description
  const title = sport?.name ? `${sport.name} | Sportiva` : "Sport Details | Sportiva";
  const description =
    sport?.description ||
    `Explore detailed information, training guides, and equipment for ${sport?.name || "sports"} at Sportiva.`;

  // កំណត់ Fallback Image URL
  const defaultImage = "https://sportiva-rho.vercel.app/image/sportiva-thurbmail.jpg";
  const rawImage = sport?.image || sport?.imageUrls?.[0] || defaultImage;

  // ធានាថា Image URL គឺជា Absolute URL (មាន https://)
  const imageUrl = rawImage.startsWith("http")
    ? rawImage
    : `https://sportiva-rho.vercel.app${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://sportiva-rho.vercel.app/sports/${uuid}`,
      siteName: "Sportiva",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: sport?.name || "Sport Detail Cover",
        },
      ],
      locale: "en_US",
      type: "article", // ប្រើ article ដើម្បីឱ្យ Telegram បង្ហាញ Card និងរូបភាពធំ
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// 2. Main Page Component
export default async function SportsDetailPage({ params }: PageProps) {
  const { uuid } = await params;

  return <SportsDetailComponent uuid={uuid} />;
}