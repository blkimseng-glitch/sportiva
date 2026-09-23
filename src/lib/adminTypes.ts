export interface AdminSport {
  uuid: string;
  name: string;
  description: string;
  categoryName: string;
  imageUrls: string[];
}

export interface AdminEvent {
  uuid: string;
  name: string;
  description: string;
  categoryName: string;
  locationName: string;
  latitude: number | null;
  longitude: number | null;
  imageUrls: string[];
  createdAt: string | null;
}

export interface AdminCategory {
  uuid: string;
  name: string;
  description: string;
  slug?: string;
}

export interface AdminComment {
  uuid: string;
  eventUuid: string;
  comment: string;
  userName: string;
  userAvatar?: string;
  createdAt: string | null;
}

export interface SportFormValues {
  name: string;
  description: string;
  categoryName: string;
  imageUrls: string[];
}

export interface EventFormValues {
  name: string;
  description: string;
  categoryName: string;
  locationName: string;
  latitude: string;
  longitude: string;
  imageUrls: string[];
}

export interface CategoryFormValues {
  name: string;
  description: string;
}
