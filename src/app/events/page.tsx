import EventListComponent from "@/components/events/EventListComponent";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sport Events & Activities | Sportiva',
  description: 'Discover upcoming sports events, competitions, and community activities hosted by Sportiva.',
  keywords: ['Sportiva Events', 'Sports Competitions', 'Upcoming Tournaments', 'Sports Activities'],
  openGraph: {
    title: 'Sport Events & Activities | Sportiva',
    description: 'Discover upcoming sports events, competitions, and community activities hosted by Sportiva.',
    url: 'https://yourdomain.com/events',
    siteName: 'Sportiva',
    images: [
      {
        url: 'https://yourdomain.com/images/events-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Sportiva Events',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function EventsPage() {
  return (
    <main>
      <EventListComponent />
    </main>
  );
}