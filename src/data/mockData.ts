
import type { Provider, Service, Review, Booking, ChatConversation, ChatMessage } from '@/types';
import { Wrench, Zap, Sprout, Sparkles, PaintRoller, Dog, BookOpen, Star, MapPin, Hammer, Truck, Laptop, Dumbbell, Camera, Music, ShieldCheck, ChefHat, Scale, Baby, Square as CarpentrySquare, Disc3, CalendarCheck2, Languages, Palette, Code2, Landmark } from 'lucide-react';

export const mockServices: Service[] = [
  { id: 'plumbing', name: 'Fontanería', description: 'Reparación de fugas, instalación de tuberías y más.', icon: Wrench },
  { id: 'electricity', name: 'Electricidad', description: 'Cableado, reparaciones e instalaciones.', icon: Zap },
  { id: 'gardening', name: 'Jardinería', description: 'Cuidado del césped, plantación y paisajismo.', icon: Sprout },
  { id: 'cleaning', name: 'Limpieza', description: 'Servicios de limpieza para hogar y oficinas.', icon: Sparkles },
  { id: 'painting', name: 'Pintura', description: 'Pintura interior y exterior.', icon: PaintRoller },
  { id: 'petcare', name: 'Cuidado de Mascotas', description: 'Paseo de perros, cuidado de mascotas.', icon: Dog },
  { id: 'tutoring', name: 'Clases Particulares', description: 'Clases privadas para diversas asignaturas.', icon: BookOpen },
  { id: 'handyman', name: 'Manitas', description: 'Reparaciones generales y mantenimiento del hogar.', icon: Hammer },
  { id: 'moving', name: 'Mudanzas', description: 'Ayuda para mudanzas locales y de larga distancia.', icon: Truck },
  { id: 'techsupport', name: 'Soporte Técnico', description: 'Ayuda informática para ordenadores y dispositivos.', icon: Laptop },
  { id: 'appliancerepair', name: 'Reparación de Electrodomésticos', description: 'Arreglo de lavadoras, secadoras, frigoríficos, etc.', icon: Wrench },
  { id: 'personaltrainer', name: 'Entrenador Personal', description: 'Programas de fitness personalizados.', icon: Dumbbell },
  { id: 'photography', name: 'Fotografía', description: 'Retratos, eventos y sesiones comerciales.', icon: Camera },
  { id: 'musiclessons', name: 'Clases de Música', description: 'Aprende a tocar un instrumento.', icon: Music },
  { id: 'homesecurity', name: 'Seguridad del Hogar', description: 'Instalación y servicios de monitoreo.', icon: ShieldCheck },
  { id: 'catering', name: 'Catering', description: 'Servicios de comida para eventos y fiestas.', icon: ChefHat },
  { id: 'legalservices', name: 'Servicios Legales', description: 'Consultas y asesoramiento legal.', icon: Scale },
  { id: 'babysitting', name: 'Cuidado de Niños', description: 'Canguros y niñeras cualificadas.', icon: Baby },
  { id: 'carpentry', name: 'Carpintería', description: 'Muebles a medida, reparaciones en madera.', icon: CarpentrySquare },
  { id: 'djservices', name: 'Servicios de DJ', description: 'Música para fiestas y eventos.', icon: Disc3 },
  { id: 'eventplanning', name: 'Planificación de Eventos', description: 'Organización integral de eventos.', icon: CalendarCheck2 },
  { id: 'translation', name: 'Traducción de Idiomas', description: 'Servicios de traducción profesional.', icon: Languages },
  { id: 'graphicdesign', name: 'Diseño Gráfico', description: 'Logotipos, branding y material visual.', icon: Palette },
  { id: 'webdevelopment', name: 'Desarrollo Web', description: 'Creación de páginas web y aplicaciones.', icon: Code2 },
  { id: 'taxadvisory', name: 'Asesoría Fiscal', description: 'Ayuda con impuestos y finanzas.', icon: Landmark },
];

export const mockLocations: string[] = [
  "Madrid, ES",
  "Barcelona, ES",
  "Valencia, ES",
  "Sevilla, ES",
  "Zaragoza, ES",
  "Málaga, ES",
  "Murcia, ES",
  "Palma de Mallorca, ES",
  "Las Palmas de Gran Canaria, ES",
  "Bilbao, ES",
  "Alicante, ES",
  "Córdoba, ES",
  "Valladolid, ES",
  "Vigo, ES",
  "Gijón, ES",
  "A Coruña, ES",
  "Online"
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
    name: 'Juan Fontanería',
    serviceCategory: 'Fontanería',
    description: 'Fontanero experimentado con más de 10 años en el sector. Servicios residenciales y comerciales.',
    location: 'Madrid, ES',
    rating: 4.8,
    reviewCount: 120,
    servicesOffered: [
      { name: 'Reparación de Fugas', price: 80 },
      { name: 'Limpieza de Desagües', price: 100 },
      { name: 'Instalación de Grifos', price: 150 },
    ],
    hourlyRate: 75,
    certifications: ['Carnet de Fontanero #12345', 'Técnico Certificado en Calentadores'],
    availability: 'Lun-Sáb, 8am-6pm',
    experienceYears: 10,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    reviews: commonReviews.slice(0,3).map(r => ({...r, id: `p1-${r.id}`, userName: r.userName.replace('Smith', 'García').replace('Johnson', 'López')})),
  },
  {
    id: '2',
    name: 'Chispas Eléctricas S.L.',
    serviceCategory: 'Electricidad',
    description: 'Tu experto local para todas las necesidades eléctricas. Rápido, fiable y seguro.',
    location: 'Barcelona, ES',
    rating: 4.5,
    reviewCount: 85,
    servicesOffered: [
      { name: 'Reparación de Enchufes', price: 60 },
      { name: 'Instalación de Lámparas', price: 90 },
      { name: 'Cambio de Automáticos', price: 200 },
    ],
    hourlyRate: 80,
    certifications: ['Electricista Autorizado #E67890', 'Certificado Seguridad Hogar'],
    availability: 'Servicio Urgencias 24/7',
    experienceYears: 8,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    reviews: commonReviews.slice(1,4).map(r => ({...r, id: `p2-${r.id}`, userName: r.userName.replace('Williams', 'Martínez')})),
  },
  {
    id: '3',
    name: 'Jardines Verdes',
    serviceCategory: 'Jardinería',
    description: 'Transformando espacios exteriores con pasión y pericia. Especialista en jardinería orgánica.',
    location: 'Valencia, ES',
    rating: 4.9,
    reviewCount: 200,
    servicesOffered: [
      { name: 'Corte de Césped', price: 50 },
      { name: 'Poda de Setos', price: 70 },
      { name: 'Consulta Diseño Jardín', price: 120 },
    ],
    hourlyRate: 65,
    certifications: ['Horticultor Certificado', 'Profesional Cuidado Orgánico Terrenos'],
    availability: 'Lun-Vie, 9am-5pm',
    experienceYears: 12,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    reviews: commonReviews.slice(2,5).map(r => ({...r, id: `p3-${r.id}`, userName: r.userName.replace('Brown', 'Sánchez').replace('Davis', 'Pérez')})),
  },
  {
    id: '4',
    name: 'Limpiezas BrilloTotal',
    serviceCategory: 'Limpieza',
    description: 'Dedicados a hacer brillar tu espacio. Soluciones de limpieza ecológicas.',
    location: 'Sevilla, ES',
    rating: 4.7,
    reviewCount: 150,
    servicesOffered: [
      { name: 'Limpieza Hogar Estándar (2h)', price: 90 },
      { name: 'Limpieza Profunda (4h)', price: 180 },
      { name: 'Limpieza Oficina (por m²)', price: 0.10 },
    ],
    certifications: ['Certificado Limpieza Ecológica', 'Asegurado y Afianzado'],
    availability: 'Lun-Sáb, 7am-7pm',
    experienceYears: 5,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: ['https://placehold.co/600x400.png'],
    reviews: commonReviews.slice(0,2).map(r => ({...r, id: `p4-${r.id}`})),
  },
  {
    id: '5',
    name: 'Tutorías ÉxitoTotal',
    serviceCategory: 'Clases Particulares',
    description: 'Tutores experimentados para Primaria, ESO, Bachillerato y Universidad. Planes de estudio personalizados.',
    location: 'Online / Bilbao, ES',
    rating: 4.9,
    reviewCount: 95,
    servicesOffered: [
      { name: 'Clases Matemáticas (1h)', price: 50 },
      { name: 'Clases Ciencias (1h)', price: 55 },
      { name: 'Preparación Selectividad (1h)', price: 70 },
    ],
    hourlyRate: 50,
    certifications: ['Educador Certificado', 'Experto Materia (Varias)'],
    availability: 'Horario Flexible, Online y Presencial',
    experienceYears: 7,
    profileImageUrl: 'https://placehold.co/100x100.png',
    galleryImageUrls: [],
    reviews: commonReviews.slice(3,5).map(r => ({...r, id: `p5-${r.id}`})),
  }
];

export const mockBookings: Booking[] = [
  { id: 'b1', providerId: '1', providerName: 'Juan Fontanería', serviceName: 'Reparación de Fugas', dateTime: new Date(Date.now() + 86400000 * 3).toISOString(), status: 'confirmed' },
  { id: 'b2', providerId: '3', providerName: 'Jardines Verdes', serviceName: 'Corte de Césped', dateTime: new Date(Date.now() + 86400000 * 7).toISOString(), status: 'pending' },
  { id: 'b3', providerId: '4', providerName: 'Limpiezas BrilloTotal', serviceName: 'Limpieza Hogar Estándar', dateTime: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'completed' },
];

export const mockConversations: ChatConversation[] = [
  { id: 'convo1', participantName: 'Juan Fontanería', participantAvatar: 'https://placehold.co/40x40.png', lastMessage: 'Sí, puedo ir mañana a las 14h.', lastMessageTimestamp: Date.now() - 3600000, unreadCount: 0 },
  { id: 'convo2', participantName: 'Jardines Verdes', participantAvatar: 'https://placehold.co/40x40.png', lastMessage: '¡Tu jardín luce genial!', lastMessageTimestamp: Date.now() - 86400000, unreadCount: 1 },
];

export const mockMessages: { [conversationId: string]: ChatMessage[] } = {
  'convo1': [
    { id: 'msg1', senderId: 'user', receiverId: '1', text: 'Hola, ¿estás disponible para una reparación de fuga mañana?', timestamp: Date.now() - 7200000 },
    { id: 'msg2', senderId: '1', receiverId: 'user', text: '¡Hola! Sí, puedo ir mañana a las 14h. ¿Te viene bien?', timestamp: Date.now() - 3600000 },
  ],
  'convo2': [
    { id: 'msg3', senderId: '3', receiverId: 'user', text: 'Acabo de terminar tu césped. ¡Luce genial!', timestamp: Date.now() - 86400000 * 2 },
    { id: 'msg4', senderId: 'user', receiverId: '3', text: '¡Muchas gracias! Dejaré una reseña.', timestamp: Date.now() - 86400000 },
    { id: 'msg5', senderId: '3', receiverId: 'user', text: 'Genial, ¡lo agradezco!', timestamp: Date.now() - 72000000, isRead: false },
  ],
};

export const mockFaqs: { question: string, answer: string }[] = [
  {
    question: "¿Cómo funciona ServiMatch?",
    answer: "ServiMatch te conecta con profesionales locales. Simplemente busca el servicio que necesitas, compara perfiles y precios, reserva directamente y paga de forma segura a través de la plataforma. Después del servicio, puedes valorar al profesional."
  },
  {
    question: "¿Es seguro pagar a través de ServiMatch?",
    answer: "Sí, utilizamos pasarelas de pago seguras y encriptadas para proteger tu información financiera. El pago se retiene hasta que confirmas que el servicio se ha completado satisfactoriamente (según el tipo de servicio)."
  },
  {
    question: "¿Qué pasa si tengo un problema con un servicio?",
    answer: "Nuestro equipo de soporte está aquí para ayudarte. Puedes contactarnos a través del Centro de Ayuda y mediaremos para resolver cualquier inconveniente que puedas tener con un profesional."
  },
  {
    question: "Soy profesional, ¿cómo me uno a ServiMatch?",
    answer: "¡Es fácil! Haz clic en 'Conviértete en profesional', completa tu perfil con tus servicios, experiencia, tarifas y sube una foto de tu DNI para verificación. Una vez aprobado, empezarás a recibir solicitudes de clientes."
  },
  {
    question: "¿Tiene algún costo registrarse como profesional?",
    answer: "Registrarse y crear un perfil en ServiMatch es completamente gratis. Solo aplicamos una pequeña comisión por servicio completado y pagado a través de la plataforma."
  }
];

// Helper to get service icon by name (used in multiple places)
export const getServiceIconByName = (serviceName: string): React.ComponentType<any> => {
  const service = mockServices.find(s => s.name.toLowerCase() === serviceName.toLowerCase());
  return service?.icon || Briefcase; // Fallback to a generic icon
};

    

    