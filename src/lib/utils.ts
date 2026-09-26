
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong 💪'];
export const STRENGTH_LABEL_COLORS = ['', 'text-rose-500', 'text-orange-500', 'text-amber-600', 'text-emerald-600'];
export const STRENGTH_BAR_COLORS = ['bg-rose-400', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-500'];

export const CONFETTI_EMOJIS = ['⚽', '🏀', '🎾', '🏆', '🌟', '🎯', '🔥'];
export const CONFETTI_COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export function getPasswordScore(v: string): number {
  let score = 0;
  if (v.length >= 6) score++;
  if (v.length >= 10) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return score;
}

export interface SportCard {
  id: number;
  title: string;
  imageSrc: string;
}

export const SPORTS_IMAGE_CARDS: SportCard[] = [
  { 
    id: 1, 
    title: 'Basketball', 
    imageSrc: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 2, 
    title: 'Gym & Training', 
    imageSrc: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 3, 
    title: 'Track & Running', 
    imageSrc: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 4, 
    title: 'Soccer & Pitch', 
    imageSrc: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=60' 
  },
];