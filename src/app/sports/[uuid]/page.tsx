import SportsDetailComponent from "@/components/sports/SportsDertailComponent";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function SportsDetailPage({ params }: PageProps) {
  const { uuid } = await params;

  return <SportsDetailComponent uuid={uuid} />;
}
