import type { Provider, Service, Review, Booking, ChatConversation, ChatMessage } from '@/types';
import { Wrench, Zap, Sprout, Sparkles, PaintRoller, Dog, BookOpen, Star, MapPin } from 'lucide-react';

export const mockServices: Service[] = [
  { id: 'plumbing', name: 'Plumbing', description: 'Fix leaks, install pipes, and more.', icon: Wrench },
  { id: 'electricity', name: 'Electricity', description: 'Wiring, repairs, and installations.', icon: Zap },
  { id: 'gardening', name: 'Gardening', description: 'Lawn care, planting, and landscaping.', icon: Sprout },
  { id: 'cleaning', name: 'Cleaning', description: 'Home and office cleaning services.', icon: Sparkles },
  { id: 'painting', name: 'Painting', description: 'Interior and exterior painting.', icon: PaintRoller },
  { id: 'petcare', name: 'Pet Care', description: 'Dog walking, pet sitting.', icon: Dog },
  { id: 'tutoring', name: 'Tutoring', description: 'Private lessons for various subjects.', icon: BookOpen },
];

const commonReviews: Review[] = [
  { id: 'r1', userId: 'user1', userName: 'Alice Smith', rating: 5, comment: 'Excellent service, very professional and on time!', date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'r2', userId: 'user2', userName: 'Bob Johnson', rating: 4, comment: 'Good job, but was a bit late.', date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: 'r3', userId: 'user3', userName: 'Carol Williams', rating: 5, comment: 'Highly recommend! Solved my issue quickly.', date: new Date(Date.now() - 86400000 * 10).toISOString()},
  { id: 'r4', userId: 'user4', userName: 'David Brown', rating: 3, comment: 'Average service. Took longer than expected.', date: new Date(Date.now() - 86400000 * 15).toISOString()},
  { id: 'r5', userId: 'user5', userName: 'Eve Davis', rating: 5, comment: 'Fantastic work, very friendly and efficient.', date: new Date(Date.now() - 86400000 * 1).toISOString()},
];


export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'John\'s Plumbing',
    serviceCategory: 'Plumbing',
    description: 'Experienced plumber with over 10 years in the field. Residential and commercial services.',
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 120,
    servicesOffered: [
      { name: 'Leak Repair', price: 80 },
      { name: 'Drain Cleaning', price: 100 },
      { name: 'Faucet Installation', price: 150 },
    ],
    hourlyRate: 75,
    certifications: ['Master Plumber License #12345', 'Certified Water Heater Technician'],
    availability: 'Mon-Sat, 8am-6pm',
    experienceYears: 10,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    reviews: commonReviews.slice(0,3).map(r => ({...r, id: `p1-${r.id}`})),
  },
  {
    id: '2',
    name: 'Bright Spark Electrical',
    serviceCategory: 'Electricity',
    description: 'Your local expert for all electrical needs. Fast, reliable, and safe.',
    location: 'Los Angeles, CA',
    rating: 4.5,
    reviewCount: 85,
    servicesOffered: [
      { name: 'Outlet Repair', price: 60 },
      { name: 'Light Fixture Installation', price: 90 },
      { name: 'Circuit Breaker Replacement', price: 200 },
    ],
    hourlyRate: 80,
    certifications: ['Licensed Electrician #E67890', 'Home Safety Certified'],
    availability: '24/7 Emergency Service',
    experienceYears: 8,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    reviews: commonReviews.slice(1,4).map(r => ({...r, id: `p2-${r.id}`})),
  },
  {
    id: '3',
    name: 'Green Thumb Gardeners',
    serviceCategory: 'Gardening',
    description: 'Transforming outdoor spaces with passion and expertise. Organic gardening specialist.',
    location: 'Chicago, IL',
    rating: 4.9,
    reviewCount: 200,
    servicesOffered: [
      { name: 'Lawn Mowing', price: 50 },
      { name: 'Hedge Trimming', price: 70 },
      { name: 'Garden Design Consultation', price: 120 },
    ],
    hourlyRate: 65,
    certifications: ['Certified Horticulturist', 'Organic Land Care Professional'],
    availability: 'Mon-Fri, 9am-5pm',
    experienceYears: 12,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    reviews: commonReviews.slice(2,5).map(r => ({...r, id: `p3-${r.id}`})),
  },
  {
    id: '4',
    name: 'Sparkle Clean Co.',
    serviceCategory: 'Cleaning',
    description: 'Dedicated to making your space shine. Eco-friendly cleaning solutions.',
    location: 'Houston, TX',
    rating: 4.7,
    reviewCount: 150,
    servicesOffered: [
      { name: 'Standard Home Cleaning (2hr)', price: 90 },
      { name: 'Deep Cleaning (4hr)', price: 180 },
      { name: 'Office Cleaning (per sq ft)', price: 0.10 },
    ],
    certifications: ['Green Clean Certified', 'Insured and Bonded'],
    availability: 'Mon-Sat, 7am-7pm',
    experienceYears: 5,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: ['https://placehold.co/600x400.png'],
    reviews: commonReviews.slice(0,2).map(r => ({...r, id: `p4-${r.id}`})),
  },
  {
    id: '5',
    name: 'A+ Tutoring Services',
    serviceCategory: 'Tutoring',
    description: 'Experienced tutors for K-12 and college subjects. Personalized learning plans.',
    location: 'Online / San Francisco, CA',
    rating: 4.9,
    reviewCount: 95,
    servicesOffered: [
      { name: 'Math Tutoring (1hr)', price: 50 },
      { name: 'Science Tutoring (1hr)', price: 55 },
      { name: 'Test Prep (SAT/ACT) (1hr)', price: 70 },
    ],
    hourlyRate: 50,
    certifications: ['Certified Educator', 'Subject Matter Expert (Various)'],
    availability: 'Flexible Hours, Online & In-Person',
    experienceYears: 7,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: [],
    reviews: commonReviews.slice(3,5).map(r => ({...r, id: `p5-${r.id}`})),
  }
];

export const mockBookings: Booking[] = [
  { id: 'b1', providerId: '1', providerName: 'John\'s Plumbing', serviceName: 'Leak Repair', dateTime: new Date(Date.now() + 86400000 * 3).toISOString(), status: 'confirmed' },
  { id: 'b2', providerId: '3', providerName: 'Green Thumb Gardeners', serviceName: 'Lawn Mowing', dateTime: new Date(Date.now() + 86400000 * 7).toISOString(), status: 'pending' },
  { id: 'b3', providerId: '4', providerName: 'Sparkle Clean Co.', serviceName: 'Standard Home Cleaning', dateTime: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'completed' },
];

export const mockConversations: ChatConversation[] = [
  { id: 'convo1', participantName: 'John\'s Plumbing', participantAvatar: 'https://placehold.co/40x40.png', lastMessage: 'Yes, I can come tomorrow at 2 PM.', lastMessageTimestamp: Date.now() - 3600000, unreadCount: 0 },
  { id: 'convo2', participantName: 'Green Thumb Gardeners', participantAvatar: 'https://placehold.co/40x40.png', lastMessage: 'Your garden looks great!', lastMessageTimestamp: Date.now() - 86400000, unreadCount: 1 },
];

export const mockMessages: { [conversationId: string]: ChatMessage[] } = {
  'convo1': [
    { id: 'msg1', senderId: 'user', receiverId: '1', text: 'Hi, are you available for a leak repair tomorrow?', timestamp: Date.now() - 7200000 },
    { id: 'msg2', senderId: '1', receiverId: 'user', text: 'Hello! Yes, I can come tomorrow at 2 PM. Does that work for you?', timestamp: Date.now() - 3600000 },
  ],
  'convo2': [
    { id: 'msg3', senderId: '3', receiverId: 'user', text: 'Just finished your lawn. It looks great!', timestamp: Date.now() - 86400000 * 2 },
    { id: 'msg4', senderId: 'user', receiverId: '3', text: 'Thanks so much! I\'ll leave a review.', timestamp: Date.now() - 86400000 },
    { id: 'msg5', senderId: '3', receiverId: 'user', text: 'Great, appreciate it!', timestamp: Date.now() - 72000000, isRead: false },
  ],
};
