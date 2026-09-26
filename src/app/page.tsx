import { Metadata } from "next";
import { Suspense } from "react";
import HeroBanner from "@/components/layout/HeroBanner";
import HomeGrid from "@/components/layout/HomeGrid";
import { getSports } from "@/services/api";

export const metadata: Metadata = {
  title: 'Home | Sportiva',
  description: 'Welcome to Sportiva - Your ultimate platform for sports news, gear, training guides, and community events.',
  keywords: ['Sportiva', 'Sports Platform', 'Sports News', 'Gym & Training', 'Sports Equipment'],
  openGraph: {
    title: 'Home | Sportiva',
    description: 'Welcome to Sportiva - Your ultimate platform for sports news, gear, training guides, and community events.',
    url: 'https://yourdomain.com',
    siteName: 'Sportiva',
    images: [
      {
        url: 'https://yourdomain.com/images/home-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Sportiva Home Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function HomePage() {
  const posts = await getSports();

  return (
    <main className="min-h-screen bg-white dark:bg-[#121824] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Main Content Grid */}
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-20 text-center font-semibold">Loading data...</div>}>
          {posts && posts.length > 0 ? (
            <HomeGrid items={posts} />
          ) : (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              No data available to display yet...
            </div>
          )}
        </Suspense>
      </div>

      {/* 3. Bottom CTA Section */}
      <section id="gear" className="w-full border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-[#1b2735] py-16 transition-colors duration-300">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Have something worth covering?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
              Submit a news item or a piece of gear for editorial review — it takes less than a minute.
            </p>
            <a
              href="/admin/create"
              className="mt-6 inline-flex items-center justify-center rounded bg-black dark:bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 dark:hover:bg-blue-700"
            >
              Submit an entry
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}