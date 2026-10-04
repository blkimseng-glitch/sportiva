import SportsDetailComponent from "@/components/sports/SportsDertailComponent";
import { getSportByUuid} from "@/services/sportService"; 
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

// pull data Detail form Sport
async function fetchSportData(uuid: string) {
  try {
    // fetch ឬ API call 
    const sport = await getSportByUuid(uuid);
    return sport;
  } catch (error) {
    console.error("Failed to fetch sport details:", error);
    return null;
  }
}

// 1. Generate Dynamic Metadata form API
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uuid } = await params;
  const sport = await fetchSportData(uuid);

  const title = sport?.name ? `${sport.name} | Sportiva` : "Sport Details | Sportiva";
  const description =
    sport?.description ||
    `Explore detailed information, training guides, and equipment for sport ID: ${uuid} at Sportiva.`;
  const imageUrl =
    sport?.image ||
    sport?.imageUrls?.[0] ||
    "https://sportiva-rho.vercel.app/image/sportiva-thurbmail.jpg";

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
      type: "website",
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