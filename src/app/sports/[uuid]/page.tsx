import SportsDetailComponent from "@/components/sports/SportsDertailComponent";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

// Generate dynamic metadata for SEO and social sharing based on the sport uuid
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uuid } = await params;
  return {
    title: `Sport Details | Sportiva`,
    description: `Explore detailed information, training guides, and equipment for sport ID: ${uuid} at Sportiva.`,
    openGraph: {
      title: `Sport Details | Sportiva`,
      description: `Explore detailed information, training guides, and equipment for sport ID: ${uuid} at Sportiva.`,
      url: `https://yourdomain.com/sports/${uuid}`,
      siteName: "Sportiva",
      images: [
        {
          url: "https://yourdomain.com/images/sports-cover.jpg", 
          width: 1200,
          height: 630,
          alt: "Sport Detail Cover",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function SportsDetailPage({ params }: PageProps) {
  const { uuid } = await params;

  return <SportsDetailComponent uuid={uuid} />;
}
