import type { Metadata } from "next";

import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Sportiva",
  description:
    "Sportiva is a digital sports news and events platform in Cambodia that offers an experience in Khmer.",
};

export default function AboutRoute() {
  return <AboutPage />;
}