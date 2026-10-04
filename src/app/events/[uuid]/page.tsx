import { Metadata } from "next";
import { Suspense } from "react";
import EventDetailComponent from "@/components/events/EventDetailComponent";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

// មុខងារសម្រាប់ Fetch ទិន្នន័យ Event ពី Public Backend API
async function fetchPublicEventData(uuid: string) {
  try {
    // សូមប្តូរ URL នេះទៅជា Direct Public API Endpoint របស់ Backend របស់អ្នក
    const res = await fetch(
      `https://YOUR_ACTUAL_BACKEND_DOMAIN.com/api/events/${uuid}`,
      {
        next: { revalidate: 60 }, // Cache 60 វិនាទី
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || data;
  } catch (error) {
    console.error("Failed to fetch public event metadata:", error);
    return null;
  }
}

// SEO & Social Share Metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uuid } = await params;
  const event = await fetchPublicEventData(uuid);

  // រៀបចំ Title, Description និង Image Dynamic
  const title = event?.title || event?.name ? `${event.title || event.name} | Sportiva` : `Event Details | Sportiva`;
  const description =
    event?.description ||
    `Explore detailed information, updates, and community comments for event ID: ${uuid} at Sportiva.`;

  // ទាញយករូបភាព Dynamic ប្រសិនបើគ្មាន ប្រើប្រាស់ Default Thumbnail
  let imageUrl = "https://sportiva-rho.vercel.app/image/sportiva-thurbmail.jpg";
  const apiImage = event?.image || event?.coverImage || event?.thumbnail || event?.imageUrls?.[0];

  if (apiImage) {
    imageUrl = apiImage.startsWith("http")
      ? apiImage
      : `https://YOUR_ACTUAL_BACKEND_DOMAIN.com${apiImage}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://sportiva-rho.vercel.app/events/${uuid}`,
      siteName: "Sportiva",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event?.title || event?.name || "Event Detail Cover",
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