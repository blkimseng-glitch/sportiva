import ContactUs from '@/components/contact/ContactUs';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Sportiva',
  description: 'Get in touch with Sportiva for any questions, complaints, or help with choosing the right sports products.',
  keywords: ['Contact Sportiva', 'Sports Store Support', 'Customer Service', 'Sportiva Contact Number'],
   openGraph: {
    title: 'Sports News & Equipment | Sportiva',
    description: 'Explore the latest sports news, professional training guides, and high-quality sports equipment at Sportiva.',
    url: 'https://sportiva-rho.vercel.app/contact',
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

export default function page() {
  return (
    <main className="w-full flex-1 flex flex-col">
      <ContactUs />
    </main>
  );
}