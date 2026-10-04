import { Metadata } from "next";
import { Suspense } from "react";
import EventDetailComponent from "@/components/events/EventDetailComponent";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

const BACKEND_API_URL = process.env.BACKEND_API_URL;
const MEDIA_DOMAIN = BACKEND_API_URL ? BACKEND_API_URL.replace(/\/api\/v1\/?$/, "") : "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sportiva-rho.vercel.app";

async function fetchDirectEvent(uuid: string) {
  if (!BACKEND_API_URL) {
    console.error("Missing BACKEND_API_URL in environment variables!");
    return null;
  }

  try {
    const res = await fetch(`${BACKEND_API_URL}/events/${uuid}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || json;
  } catch (err) {
    console.error("OG Event fetch error:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uuid } = await params;
  const event = await fetchDirectEvent(uuid);

  // ចាប់យក Title, Description និង Image ឱ្យគ្រប់ Field ដែល Backend អាចបោះមក
  const title = event?.title || event?.name 
    ? `${event.title || event.name} | Sportiva` 
    : "Event Details | Sportiva";

  const description = event?.description || event?.content || event?.summary
    ? (event.description || event.content || event.summary).slice(0, 160) 
    : "Explore detailed information, updates, and community comments at Sportiva.";

  const rawImage = event?.image || event?.thumbnail || event?.coverImage || event?.cover_image || event?.imageUrls?.[0];

  let imageUrl = `${SITE_URL}/image/sportiva-thurbmail.jpg`;
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
      url: `${SITE_URL}/events/${uuid}`,
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

function EventDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6 animate-pulse">
      <div className="h-64 bg-slate-800/50 rounded-xl w-full" />
      <div className="h-8 bg-slate-800/50 rounded-lg w-1/3" />
      <div className="h-20 bg-slate-800/50 rounded-lg w-full" />
    </div>
  );
}

export default async function EventDetailPage({ params }: PageProps) {
  const { uuid } = await params;

  return (
    <main className="min-h-screen bg-[#0b1322] text-slate-200">
      <Suspense fallback={<EventDetailSkeleton />}>
        <EventDetailComponent uuid={uuid} />
      </Suspense>
    </main>
  );
}