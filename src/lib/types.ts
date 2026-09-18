export interface SportCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  eventCount?: number;
};

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