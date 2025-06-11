export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string; // ISO date string
}

export interface Provider {
  id: string;
  name: string;
  serviceCategory: string; // e.g., "Plumbing", "Electricity"
  description: string;
  location: string;
  rating: number; // Average rating
  reviewCount: number;
  servicesOffered: { name: string; price: number }[];
  certifications: string[];
  availability: string; // e.g., "Mon-Fri, 9am-5pm", "Available Now"
  experienceYears: number;
  profileImageUrl: string;
  galleryImageUrls: string[];
  reviews: Review[];
  hourlyRate?: number; // Optional, can be part of servicesOffered
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  serviceName: string;
  dateTime: string; // ISO date string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'user' or providerId
  receiverId: string;
  text: string;
  timestamp: number; // Unix timestamp
  isRead?: boolean;
}

export interface ChatConversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTimestamp: number;
  unreadCount: number;
}
