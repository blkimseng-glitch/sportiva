import { Suspense } from "react";
import HeroBanner from "@/components/layout/HeroBanner";
import HomeGrid from "@/components/layout/HomeGrid";
import { getSports } from "@/services/api";

export default async function HomePage() {
  const posts = await getSports();

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Main Content Grid */}
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-20 text-center font-semibold">កំពុងទាញយកទិន្នន័យ...</div>}>
          {posts && posts.length > 0 ? (
            <HomeGrid items={posts} />
          ) : (
            <div className="py-12 text-center text-gray-500">
              មិនទាន់មានទិន្នន័យបង្ហាញនៅឡើយទេ...
            </div>
          )}
        </Suspense>
      </div>

      {/* 3. Bottom CTA Section */}
      <section id="gear" className="w-full border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Have something worth covering?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              Submit a news item or a piece of gear for editorial review — it takes less than a minute.
            </p>
            <a
              href="/admin/create"
              className="mt-6 inline-flex items-center justify-center rounded bg-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
            >
              Submit an entry
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}