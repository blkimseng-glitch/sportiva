import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Sportiva - Sports News & Latest Events",
    template: "%s | Sportiva",
  },
  description: "The ultimate platform for sports news, live events, and highlights in Cambodia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Script នេះដំណើរការលឿនបំផុតមុនពេល Render វ៉េបសាយ ដើម្បីកំណត់ Dark Mode ទុកជាស្រេច មិនឱ្យលោតពណ៌ស */}
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
      <body className="bg-white dark:bg-[#1b2735] text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased min-h-screen flex flex-col">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}