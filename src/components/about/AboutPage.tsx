"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { teamSection } from "@/lib/data";

const AboutPage = () => {
  const teamCarouselRef = React.useRef<HTMLDivElement>(null);
  const teamMembers = [teamSection.mentor, ...teamSection.members];

  const scrollTeam = (direction: -1 | 1) => {
    teamCarouselRef.current?.scrollBy({
      left: direction * teamCarouselRef.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-sportivaAccent selection:text-white">
     

      <main>
        <section className="py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-sportivaAccent mb-3">ABOUT SPORTIVA</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-neutral-900 leading-tight mb-5 sm:mb-6">
                Where Sports Come Alive.
              </h1>
              <p className="text-base sm:text-lg font-semibold text-neutral-900 mb-4 leading-relaxed">
                “SPORTIVA is a modern sports news platform built for fans who want to stay informed, discover stories, and follow the sports they love.”
              </p>
              <p className="text-sm sm:text-base text-neutral-600 mb-6 leading-relaxed">
                “From major international competitions to local sporting events, we bring the latest stories, updates, and insights together in one place.”
              </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a href="#mission" className="w-full sm:w-auto text-center px-5 sm:px-7 py-3 rounded-full border-2 border-neutral-200 font-heading font-bold bg-blue-950 text-white text-sm hover:border-neutral-900 transition-all hover:-translate-y-0.5">
                 Explore latest News
                </a>
                <a href="#mission" className="w-full sm:w-auto text-center px-5 sm:px-7 py-3 rounded-full border-2 border-neutral-200 text-neutral-900 font-heading font-bold text-sm hover:border-neutral-900 transition-all hover:-translate-y-0.5">
                  Our Mission
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-105 w-full">
              <img src="/image/sportiva-thurbmail.jpg" alt="Athletes in action" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent lg:block hidden rounded-2xl pointer-events-none" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-sportivaBgLight border-y border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-10 lg:mb-14">
              <div className="lg:col-span-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-neutral-900 leading-tight">
                  Built for people who live and breathe sports.
                </h2>
              </div>
              <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-neutral-600 text-base sm:text-lg leading-relaxed">
                <p>“SPORTIVA was created to make sports news easier to discover, understand, and enjoy. We bring together stories from different sports, competitions, teams, athletes, and regions in one modern digital platform.”</p>
                <p>“Our goal is simple: make sports news fast, accessible, accurate, and exciting for everyone.”</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 text-center shadow-sm">
                <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-sportivaAccent mb-2">10+</h3>
                <p className="text-sm font-semibold text-neutral-600">Sports Covered</p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 text-center shadow-sm">
                <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-sportivaAccent mb-2">Global</h3>
                <p className="text-sm font-semibold text-neutral-600">Coverage</p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 text-center shadow-sm">
                <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-sportivaAccent mb-2">Daily</h3>
                <p className="text-sm font-semibold text-neutral-600">Updates</p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 text-center shadow-sm">
                <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-sportivaAccent mb-2">1 Community</h3>
                <p className="text-sm font-semibold text-neutral-600">One Sports Community</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-neutral-900 mb-3 sm:mb-4">What We Cover</h2>
              <p className="text-sm sm:text-base text-neutral-600">“From global competitions to local sporting stories, SPORTIVA keeps you connected to the sports that matter.”</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: '⚽', title: 'Football', description: 'Matches, transfers, leagues, clubs, and international competitions.' },
                { icon: '🏀', title: 'Basketball', description: 'Playoffs, league standings, player spotlights, and highlights.' },
                { icon: '🎾', title: 'Tennis', description: 'Grand Slams, ATP/WTA tours, rankings, and tournament updates.' },
                { icon: '🏎️', title: 'Motorsport', description: 'Formula 1, MotoGP, endurance racing, and championship telemetry.' },
                { icon: '🥊', title: 'Boxing & MMA', description: 'Title fights, weigh-ins, rankings, and behind-the-scenes combat coverage.' },
                { icon: '🏐', title: 'Volleyball', description: 'Indoor and beach volleyball leagues, tournaments, and international cups.' },
              ].map((sport) => (
                <div key={sport.title} className="bg-sportivaBgLight border border-neutral-200 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-900 hover:bg-white hover:shadow-xl flex flex-col justify-between group">
                  <div>
                    <div className="text-3xl mb-4">{sport.icon}</div>
                    <h3 className="text-xl font-bold font-heading mb-3 text-neutral-900">{sport.title}</h3>
                    <p className="text-sm text-neutral-600 mb-6 leading-relaxed">“{sport.description}”</p>
                  </div>
                  <a href="#" className="font-heading font-bold text-sm text-neutral-900 group-hover:text-sportivaAccent transition-colors">Explore →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

      

        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-neutral-900 mb-3 sm:mb-4">Journalism Built on Trust</h2>
              <p className="text-sm sm:text-base text-neutral-600">“We believe sports journalism should be accurate, fast, fair, and transparent.”</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                ['01', 'Accuracy', 'We work to provide reliable information and avoid publishing unverified claims.'],
                ['02', 'Speed', 'Sports move quickly, so we aim to deliver important updates as soon as possible.'],
                ['03', 'Fairness', 'We present sports stories objectively and clearly separate reporting from opinion and analysis.'],
                ['04', 'Transparency', 'When information is still developing or uncertain, we make that clear to our readers.'],
              ].map(([index, title, text]) => (
                <div key={title} className="bg-sportivaBgLight border border-neutral-200 p-5 sm:p-6 rounded-2xl hover:border-sportivaAccent transition-all">
                  <span className="block font-heading font-extrabold text-3xl sm:text-4xl text-sportivaAccent mb-4 opacity-90">{index}</span>
                  <h3 className="text-lg sm:text-xl font-bold font-heading mb-3 text-neutral-900">{title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">“{text}”</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-sportivaBgLight border-y border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-7 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-sportivaAccent">OUR TEAM</span>
                <h2 className="mb-3 text-2xl font-extrabold leading-tight text-neutral-900 sm:text-3xl lg:text-4xl">The people behind SPORTIVA</h2>
                <p className="text-sm text-neutral-600 sm:text-base">Meet the mentor and team building Sportiva.</p>
              </div>
              <div className="flex gap-2 sm:shrink-0 sm:pb-1">
                <button type="button" onClick={() => scrollTeam(-1)} aria-label="Previous team members" title="Previous team members" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sportivaAccent">
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => scrollTeam(1)} aria-label="Next team members" title="Next team members" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sportivaAccent">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div id="team-member-carousel" ref={teamCarouselRef} role="region" aria-roledescription="carousel" aria-label="Sportiva team members" tabIndex={0} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 sm:gap-5">
              {teamMembers.map((member) => (
                <article key={member.id} className="group relative isolate aspect-4/5 basis-[76%] shrink-0 snap-start overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-300 sm:basis-[43%] lg:basis-[28%]">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-800 to-red-950">
                      <span className="font-heading text-7xl font-extrabold text-white/70">{member.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                    </div>
                  )}
                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-neutral-950/35 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">{member.role}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="text-xl font-extrabold text-white sm:text-2xl">{member.name}</h3>
                    <p className="mt-1 text-sm text-white/75">{member.isPlaceholder ? "Profile coming soon" : member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-neutral-900 mb-3 sm:mb-4">Why SPORTIVA?</h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">“There is more sports information online than ever before. SPORTIVA brings the most important stories together in a cleaner, simpler, and easier-to-follow experience.”</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                ['Stay Updated', 'Follow important stories and breaking developments.'],
                ['Discover More', 'Explore different sports, competitions, teams, and athletes.'],
                ['Go Beyond the Score', 'Read stories, analysis, and insights that explain what is happening behind the game.'],
              ].map(([title, text]) => (
                <div key={title} className="bg-sportivaBgLight border-l-4 border-sportivaAccent p-5 sm:p-6 rounded-r-2xl">
                  <h3 className="text-lg sm:text-xl font-bold font-heading mb-3 text-neutral-900">{title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">“{text}”</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

     
    </div>
  );
};

export default AboutPage;