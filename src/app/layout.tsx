import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Sportiva - Sports News & Latest Events",
    template: "%s | Sportiva",
  },
  description: "The ultimate platform for sports news, live events, and highlights in Cambodia.",
  

icons: {
    icon: "/image/icon.png", 
    shortcut: "/image/icon.png",
    apple: "/image/icon.png",
  },

  openGraph: {
    title: "Sportiva - Sports News & Latest Events",
    description: "The ultimate platform for sports news, live events, and highlights in Cambodia.",
    url: "https://sportiva-rho.vercel.app",
    siteName: "Sportiva",
    images: [
      {
        url: "https://sportiva-rho.vercel.app/image/sportiva-thurbmail.jpg",
        width: 1200,
        height: 630,
        alt: "Sportiva Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sportiva - Sports News & Latest Events",
    description: "The ultimate platform for sports news, live events, and highlights in Cambodia.",
    images: ["https://sportiva-rho.vercel.app/image/sportiva-thurbmail.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* បន្ថែម Link Tags ផ្ទាល់ដើម្បីធានាថា Browser គ្រប់ប្រភេទចាប់យករូបនេះ */}
        <link rel="icon" href="/image/icon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/image/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/image/icon.png" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
    
      <body className="w-full min-h-screen bg-white dark:bg-[#1b2735] text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased flex flex-col m-0 p-0">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}