import React from 'react';
import type { Metadata } from 'next';
import LoginForm from '@/components/form/LoginForm'; 

export const metadata: Metadata = {
  title: 'Login | Sportiva',
  description: 'Log in to your Sportiva account to manage your profile, submit entries, and access exclusive sports features.',
  keywords: ['Sportiva Login', 'Sign In', 'User Authentication', 'Sports Platform Account'],
  openGraph: {
    title: 'Login | Sportiva',
    description: 'Log in to your Sportiva account to manage your profile, submit entries, and access exclusive sports features.',
    url: 'https://yourdomain.com/login',
    siteName: 'Sportiva',
    images: [
      {
        url: 'https://yourdomain.com/images/login-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Sportiva Login',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}