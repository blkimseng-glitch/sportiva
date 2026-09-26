import type { Metadata } from 'next';
import SportivaRegisterPage from "@/components/form/RegiasterForm";

export const metadata: Metadata = {
  title: 'Register | Sportiva',
  description: 'Create a new account on Sportiva to join the community, submit news items, and engage with sports enthusiasts.',
  keywords: ['Sportiva Register', 'Sign Up', 'Create Account', 'Sports Platform Membership'],
  openGraph: {
    title: 'Register | Sportiva',
    description: 'Create a new account on Sportiva to join the community, submit news items, and engage with sports enthusiasts.',
    url: 'https://yourdomain.com/register',
    siteName: 'Sportiva',
    images: [
      {
        url: 'https://yourdomain.com/images/register-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Sportiva Register',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <SportivaRegisterPage />;
}