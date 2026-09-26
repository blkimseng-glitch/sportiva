import { Metadata } from "next";
import { Suspense } from "react";
import EventDetailComponent from "@/components/events/EventDetailComponent";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

// SEO & Social Share Metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uuid } = await params;
  return {
    title: `Event Details - ${uuid} | Sportiva`,
    description: `Explore detailed information, updates, and community comments for event ID: ${uuid} at Sportiva.`,
    openGraph: {
      title: `Event Details - ${uuid} | Sportiva`,
      description: `Explore detailed information, updates, and community comments for event ID: ${uuid} at Sportiva.`,
      url: `https://yourdomain.com/events/${uuid}`,
      siteName: "Sportiva",
      images: [
        {
          url: "https://yourdomain.com/images/events-cover.jpg",
          width: 1200,
          height: 630,
          alt: "Event Detail Cover",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

// Loading Skeleton UI
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
