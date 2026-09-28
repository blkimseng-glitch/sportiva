
import type { Metadata } from "next";

import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Sportiva",
  description:
    "Sportiva is a digital sports news and events platform in Cambodia that offers an experience in Khmer.",
    openGraph: {
    title: 'Sports News & Equipment | Sportiva',
    description: 'Explore the latest sports news, professional training guides, and high-quality sports equipment at Sportiva.',
    url: 'https://sportiva-rho.vercel.app/about',
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

export default function AboutRoute() {
  return <AboutPage />;
}