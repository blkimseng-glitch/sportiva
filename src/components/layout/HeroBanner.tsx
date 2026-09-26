"use client";

import { useState } from "react";

// put and change vdo using loop
const VIDEO_PLAYLIST = [
     "/welcome-sea-game.mp4",
    "/sea-game.mp4", 
     "/bg-vd.mp4"
    ];

export default function HeroBanner() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % VIDEO_PLAYLIST.length,
    );
  };

  return (
    <>
     

      <main>
        <section className="relative flex min-h-[600px] items-end overflow-hidden bg-gray-900 pt-32 sm:min-h-[650px]">
          {/* Background Video */}
          <video
            key={VIDEO_PLAYLIST[currentVideoIndex]}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={VIDEO_PLAYLIST[currentVideoIndex]} type="video/mp4" />
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 top-0 z-30 h-1 bg-red-600" />

          {/* Content */}
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 lg:px-10">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                Sports &amp; Headlines
              </p>
              <h1 className="max-w-xl text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                The world <br />
                of sport <br />
                never stops.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-300 sm:text-base">
                Discover the biggest stories, moments, athletes, and
                competitions from around the world.
              </p>
              <a
                href="#latest"
                className="mt-6 inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-900 shadow-md transition hover:bg-red-600 hover:text-white"
              >
                Read latest stories
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Breaking News Ticker */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex h-11 items-center overflow-hidden bg-black/90 text-xs text-white backdrop-blur-sm">
            <div className="relative z-10 shrink-0 bg-red-600 px-5 py-3 text-[11px] font-extrabold uppercase tracking-wider text-white">
              Breaking News
            </div>

            <div className="flex-1 overflow-hidden whitespace-nowrap">
              <div className="animate-marquee gap-8 text-[11px] font-medium uppercase tracking-wide text-gray-300">
                <span className="mx-4">
                  Championship finals set to begin tonight
                </span>
                <span className="text-red-500">•</span>
                <span className="mx-4">
                 Sea Game Cambodia
                </span>
                <span className="text-red-500">•</span>
                <span className="mx-4">
                  Transfer window opens after record-breaking season
                </span>
                <span className="text-red-500">•</span>
                <span className="mx-4">
                  New talent arrives ahead of the summer fixtures
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
