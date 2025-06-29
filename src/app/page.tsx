
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { mockServices, mockProviders, mockFaqs } from '@/data/mockData'; 
import { Search, MapPin, CalendarDays, Users, CreditCard, Star, Briefcase, ChevronRight, Zap, Sprout, Sparkles, PaintRoller, Dog, BookOpen, UserCheck, ShieldCheck, Clock, Hammer, Truck, Laptop, Wrench, Dumbbell, Camera, Music, ChefHat, Scale, Baby, Square as CarpentrySquare, Disc3, CalendarCheck2, Languages, Palette, Code2, Landmark, Check, Hand, Scissors, Smile, Wand2 } from 'lucide-react';
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from '@/components/ui/label';
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { matchService } from '@/ai/flows/match-service-flow'; 

const popularCategories = mockServices.map(service => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'jardinería': Sprout,
    'limpieza': Sparkles,
    'pintura': PaintRoller,
    'cuidado de mascotas': Dog,
    'clases particulares': BookOpen,
    'manitas': Hammer,
    'mudanzas': Truck,
    'soporte técnico': Laptop,
    'reparación de electrodomésticos': Wrench,
    'entrenador personal': Dumbbell,
    'fotografía': Camera,
    'clases de música': Music,
    'seguridad del hogar': ShieldCheck,
    'catering': ChefHat,
    'servicios legales': Scale,
    'cuidado de niños': Baby,
    'carpintería': CarpentrySquare,
    'servicios de dj': Disc3,
    'planificación de eventos': CalendarCheck2,
    'traducción de idiomas': Languages,
    'diseño gráfico': Palette,
    'desarrollo web': Code2,
    'asesoría fiscal': Landmark,
    'manicurista': Hand,
    'peluquería': Scissors,
    'masajista': Smile,
    'esteticista': Wand2,
  };
  const IconComponent = iconMap[service.name.toLowerCase()] || Briefcase;
  return { ...service, icon: IconComponent };
});


const howItWorksSteps = [
  { 
    icon: Search, 
    title: "Busca lo que necesitas", 
    description: "Describe el servicio que buscas y encuentra profesionales cualificados en tu zona." 
  },
  { 
    icon: Users, 
    title: "Compara profesionales", 
    description: "Revisa perfiles, valoraciones, experiencia y precios para tomar la mejor decisión." 
  },
  { 
    icon: CreditCard, 
    title: "Reserva y paga de forma segura", 
    description: "Agenda tu servicio y realiza el pago directamente a través de nuestra plataforma segura." 
  },
  { 
    icon: Star, 
    title: "Valora y repite", 
    description: "Deja tu opinión sobre el servicio recibido y vuelve a contratar a tus profesionales favoritos." 
  },
];

const featuredProviders = mockProviders
  .filter(p => ["Manicurista", "Peluquería", "Esteticista"].includes(p.serviceCategory))
  .sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating; 
    }
    return b.reviewCount - a.reviewCount; 
  })
  .slice(0, 3); 

const testimonials = [
  {
    id: 't1',
    name: 'Lucía M.',
    role: 'Cliente Satisfecha',
    avatarUrl: 'https://placehold.co/80x80.png',
    avatarAiHint: 'woman portrait',
    avatarFallback: 'LM',
    quote: '¡Renko me salvó! Encontré un jardinero de urgencia en minutos y el trabajo fue impecable. ¡Totalmente recomendado!',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Carlos G.',
    role: 'Profesional Verificado',
    avatarUrl: 'https://placehold.co/80x80.png',
    avatarAiHint: 'man portrait',
    avatarFallback: 'CG',
    quote: 'Desde que me uní a Renko, mi agenda está llena. La plataforma es fácil de usar y me conecta con clientes serios.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Ana P.',
    role: 'Cliente Frecuente',
    avatarUrl: 'https://placehold.co/80x80.png',
    avatarAiHint: 'person avatar',
    avatarFallback: 'AP',
    quote: 'He usado Renko para todo, desde limpieza hasta clases de guitarra. Siempre encuentro profesionales de confianza y buenos precios.',
    rating: 4,
  },
  {
    id: 't4',
    name: 'Miguel R.',
    role: 'Nuevo Usuario',
    avatarUrl: 'https://placehold.co/80x80.png',
    avatarAiHint: 'man avatar',
    avatarFallback: 'MR',
    quote: 'La interfaz es muy intuitiva y el proceso de búsqueda es rápido. Encontré un pintor en menos de 5 minutos.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Sofía L.',
    role: 'Profesional de Limpieza',
    avatarUrl: 'https://placehold.co/80x80.png',
    avatarAiHint: 'woman cleaning professional',
    avatarFallback: 'SL',
    quote: 'Renko me ha ayudado a conseguir más clientes en mi área. La comisión es justa y los pagos son puntuales.',
    rating: 5,
  }
];


export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [userInputServiceText, setUserInputServiceText] = useState<string>("");
  const [isSearchingService, setIsSearchingService] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingService(true);
    const queryParams = new URLSearchParams();

    if (userInputServiceText.trim()) {
      queryParams.append('query', userInputServiceText.trim()); 
      try {
        const servicesForAI = mockServices.map(s => ({ id: s.id, name: s.name }));
        const result = await matchService({ userInputText: userInputServiceText, availableServices: servicesForAI });
        if (result.matchedServiceId && result.matchedServiceId !== 'NO_MATCH') {
          queryParams.append('serviceId', result.matchedServiceId);
        }
      } catch (error) {
        console.error("Error matching service with AI:", error);
      }
    }


    if (selectedLocation.trim()) queryParams.append('location', selectedLocation.trim());
    if (selectedDate) queryParams.append('date', format(selectedDate, 'yyyy-MM-dd'));
    
    setIsSearchingService(false);
    router.push(`/find-providers?${queryParams.toString()}`);
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="search-services" className="bg-secondary py-16 md:py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
            Encuentra al mejor profesional <span className="text-primary">cerca de ti</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Compara precios, reserva al instante y recibe atención de confianza para todas tus necesidades del hogar y más.
          </p>
          <div className="bg-card border p-6 md:p-8 rounded-xl shadow-2xl backdrop-blur-lg bg-background/95">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="relative md:col-span-1">
                <Label htmlFor="service-needed-text" className="block text-sm font-medium text-foreground mb-1 text-left">¿Qué necesitas?</Label>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   <Input
                    id="service-needed-text"
                    type="text"
                    value={userInputServiceText}
                    onChange={(e) => setUserInputServiceText(e.target.value)}
                    placeholder="Describe el servicio..."
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <div className="relative md:col-span-1">
                <Label htmlFor="location" className="block text-sm font-medium text-foreground mb-1 text-left">Ubicación</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="location"
                        type="text"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        placeholder="Ej: Madrid, Valencia..."
                        className="pl-10 h-12"
                    />
                </div>
              </div>
              <div className="relative md:col-span-1">
                <Label htmlFor="date" className="block text-sm font-medium text-foreground mb-1 text-left">Fecha</Label>
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "relative w-full pl-10 h-12 justify-start text-left font-normal text-foreground",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setIsDatePickerOpen(false); // Close date picker on select
                      }}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } 
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" size="lg" className="h-12 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base md:col-span-1" disabled={isSearchingService}>
                {isSearchingService ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5 md:inline" />
                    <span className="inline">Buscar</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center mb-10 text-foreground">Explora categorías populares</h2>
          <div className="overflow-hidden py-4">
            <div className="flex animate-scroll-x-loop will-change-transform">
              {/* Set 1 of categories */}
              <div className="flex flex-none gap-6 pr-6">
                {popularCategories.map((category, index) => ( 
                  <Link href={`/find-providers?serviceId=${category.id}`} key={`${category.id}-set1-${index}`} passHref>
                    <Card className="group text-center p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-card w-[160px] md:w-[200px] flex-shrink-0 aspect-square">
                      <CardContent className="flex flex-col items-center justify-center space-y-3 h-full">
                        <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                          <category.icon className="w-10 h-10 text-primary" />
                        </div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-base">{category.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              {/* Set 2 of categories (duplicate for seamless scroll) */}
              <div className="flex flex-none gap-6 pr-6">
                {popularCategories.map((category, index) => ( 
                  <Link href={`/find-providers?serviceId=${category.id}`} key={`${category.id}-set2-${index}`} passHref>
                    <Card className="group text-center p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-card w-[160px] md:w-[200px] flex-shrink-0 aspect-square">
                      <CardContent className="flex flex-col items-center justify-center space-y-3 h-full">
                        <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                          <category.icon className="w-10 h-10 text-primary" />
                        </div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-base">{category.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center mb-12 text-foreground">Así de fácil funciona Renko</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="p-5 bg-accent/10 rounded-full mb-4">
                  <step.icon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-headline font-medium mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Offers / Urgent Services Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-headline font-semibold text-foreground">Servicios destacados cerca de ti</h2>
            <Link href="/find-providers" passHref>
              <Button variant="link" className="text-primary hover:text-primary/80">
                Ver todos <ChevronRight size={20} className="ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map(provider => (
              <Card key={provider.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
                <div className="relative h-52 w-full">
                  <Image
                    src={provider.galleryImageUrls[0] || 'https://placehold.co/600x400.png'}
                    alt={`${provider.name} service`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{objectFit: 'cover'}}
                    data-ai-hint="service action photo"
                  />
                   <Badge variant="default" className="absolute top-3 right-3 bg-accent text-accent-foreground">Destacado</Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start space-x-3 mb-2">
                    <Avatar className="h-12 w-12 border-2 border-primary">
                      <AvatarImage src={provider.profileImageUrl} alt={provider.name} data-ai-hint="professional portrait" />
                      <AvatarFallback>{provider.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-headline hover:text-primary transition-colors">
                        <Link href={`/providers/${provider.id}`}>{provider.name}</Link>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{provider.serviceCategory}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-yellow-500 mb-2">
                    <Star size={16} className="mr-1 fill-current" /> {provider.rating.toFixed(1)} 
                    <span className="text-muted-foreground ml-1">({provider.reviewCount} reseñas)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 h-12 overflow-hidden text-ellipsis">
                    {provider.description.substring(0, 70)}{provider.description.length > 70 ? '...' : ''}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-primary">
                      {provider.hourlyRate ? `$${provider.hourlyRate}/hr` : (provider.servicesOffered[0] ? `$${provider.servicesOffered[0].price}`: 'Consultar')}
                    </p>
                    <Link href={`/providers/${provider.id}#booking`} passHref>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">Reservar ya</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center mb-12 text-foreground">Lo que dicen nuestros usuarios</h2>
          <div className="overflow-hidden py-4">
            <div className="flex animate-scroll-x-loop will-change-transform">
              {/* Set 1 of testimonials */}
              <div className="flex flex-none gap-8 pr-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={`${testimonial.id}-set1-${index}`} className="flex flex-col shadow-lg bg-card min-w-[320px] md:min-w-[380px] flex-shrink-0">
                    <CardContent className="p-6 flex-grow">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-16 w-16 mr-4 border-2 border-primary">
                          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarAiHint} />
                          <AvatarFallback className="text-xl">{testimonial.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold font-headline text-lg text-foreground">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} className={` ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                      <p className="text-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Set 2 of testimonials (duplicate for seamless scroll) */}
              <div className="flex flex-none gap-8 pr-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={`${testimonial.id}-set2-${index}`} className="flex flex-col shadow-lg bg-card min-w-[320px] md:min-w-[380px] flex-shrink-0">
                    <CardContent className="p-6 flex-grow">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-16 w-16 mr-4 border-2 border-primary">
                          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarAiHint} />
                          <AvatarFallback className="text-xl">{testimonial.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold font-headline text-lg text-foreground">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} className={` ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                      <p className="text-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action for Professionals */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">¿Ofreces servicios? Gana dinero con Renko</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Únete a nuestra creciente comunidad de profesionales. Aumenta tu visibilidad, gestiona tu agenda y recibe pagos de forma segura. ¡Sin comisiones iniciales!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-left text-sm">
            <div className="flex items-start space-x-2 p-3 bg-primary-foreground/10 rounded-lg">
              <UserCheck size={24} className="text-accent mt-1 shrink-0" />
              <span>Consigue <span className="font-semibold">más clientes</span> y aumenta tu visibilidad.</span>
            </div>
            <div className="flex items-start space-x-2 p-3 bg-primary-foreground/10 rounded-lg">
              <ShieldCheck size={24} className="text-accent mt-1 shrink-0" />
              <span>Recibe <span className="font-semibold">pagos seguros</span> directamente en tu cuenta.</span>
            </div>
            <div className="flex items-start space-x-2 p-3 bg-primary-foreground/10 rounded-lg">
              <CalendarDays size={24} className="text-accent mt-1 shrink-0" />
              <span>Gestiona tu <span className="font-semibold">agenda digital</span> de forma sencilla.</span>
            </div>
            <div className="flex items-start space-x-2 p-3 bg-primary-foreground/10 rounded-lg">
              <Clock size={24} className="text-accent mt-1 shrink-0" />
              <span>Ahorra tiempo y <span className="font-semibold">céntrate en tu trabajo</span>.</span>
            </div>
          </div>
          <Link href="/register/professional" passHref>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-10 py-3">
              Empieza gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center mb-10 text-foreground">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
            {mockFaqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b border-border">
                <AccordionTrigger className="text-left hover:no-underline py-4 text-base font-medium text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-4 text-muted-foreground text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
    
    
    

    






