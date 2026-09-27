import SportListComponent from "@/components/sports/SportsListComponent";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sports News & Equipment | Sportiva',
  description: 'Explore the latest sports news, professional training guides, and high-quality sports equipment at Sportiva.',
  keywords: ['Sportiva Sports', 'Sports News', 'Gym Training', 'Running', 'Basketball', 'Soccer'],
  openGraph: {
    title: 'Sports News & Equipment | Sportiva',
    description: 'Explore the latest sports news, professional training guides, and high-quality sports equipment at Sportiva.',
    url: 'https://sportiva-rho.vercel.app/sports',
    siteName: 'Sportiva',
    images: [
      {
        url: 'https://sportiva-rho.vercel.app/image/sportiva-thurbmail.jpg', 
        width: 1200,
        height: 630,
        alt: 'Sportiva Sports',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function SportsPage() {
  return <SportListComponent />;
}