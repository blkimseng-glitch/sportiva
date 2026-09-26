import ContactUs from '@/components/contact/ContactUs';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Sportiva',
  description: 'Get in touch with Sportiva for any questions, complaints, or help with choosing the right sports products.',
  keywords: ['Contact Sportiva', 'Sports Store Support', 'Customer Service', 'Sportiva Contact Number'],
};

export default function page() {
  return (
    <main>
      <ContactUs />
    </main>
  );
}