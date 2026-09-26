export interface SportCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  eventCount?: number;
};

export interface SportItem {
  id: string;
  name: string;
  description: string;
  categoryName: string;
  imageUrls: string[];
}

// src/lib/types.ts

export interface SportArticle {
  id: string | number;
  title: string;
  slug?: string;
  category?: string;
  description?: string;
  content?: string;
  image?: string;
  publishedAt?: string;
  author?: string;
  eventCount?: number;
}


export interface Event {
  uuid?: string;
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  category?: string;
  categoryName?: string;
  image?: string;
  imageUrl?: string;
  imageUrls?: string[];
  createdAt?: string;
}

export interface UserPayload {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: 'admin' | 'user'; 
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  terms: boolean;
  role?: 'admin' | 'user'; 
}

export interface ConfettiPiece {
  id: string;
  isEmoji: boolean;
  emoji: string | null;
  fontSize: number;
  size: number;
  rounded: boolean;
  color: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
}