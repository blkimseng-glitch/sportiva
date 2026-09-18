import EventDetailComponent from "@/components/events/EventDetailComponent";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { uuid } = await params;

  return <EventDetailComponent uuid={uuid} />;
}