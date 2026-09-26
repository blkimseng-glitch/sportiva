"use client";

import React from "react";
import { SportsCardGrid } from "@/components/contact/SportsCardGrid";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { SPORTS_IMAGE_CARDS } from "@/lib/utils";

export const ContactUs: React.FC = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F4F7FB] text-[#09274C] dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[#F8FAFC] dark:bg-slate-900/50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#09274C] via-[#09274C] to-[#E1131B]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Title Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#09274C] sm:text-4xl dark:text-white">
            Contact Us
          </h1>
          <div className="mt-2.5 h-1 w-12 rounded-full bg-[#E1131B]" />
        </div>

        <SportsCardGrid cards={SPORTS_IMAGE_CARDS} />

        <ContactFormSection />
      </div>
    </main>
  );
};

export default ContactUs;