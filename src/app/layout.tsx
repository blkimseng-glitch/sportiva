import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Sportiva - Sports News & Latest Events",
    template: "%s | Sportiva",
  },
  description: "The ultimate platform for sports news, live events, and highlights in Cambodia.",
  keywords: ["Sports News", "Sportiva", "Cambodia Sports", "Football", "Boxing", "Sports Updates"],
  authors: [{ name: "Sportiva Team" }],
  creator: "Sportiva",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sportiva.com",
    title: "Sportiva - Sports News & Latest Events",
    description: "The ultimate platform for sports news, live events, and highlights in Cambodia.",
    siteName: "Sportiva",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Sportiva Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sportiva - Sports News & Latest Events",
    description: "The ultimate platform for sports news, live events, and highlights in Cambodia.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#1b2735] text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}