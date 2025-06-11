
import { mockProviders, mockServices } from '@/data/mockData';
import ProviderCard from '@/components/provider/ProviderCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Filter, Star, Users, ListChecks, CalendarCheck } from 'lucide-react';
import Image from 'next/image';

const mockTestimonials = [
  {
    id: 't1',
    name: 'Elena G.',
    location: 'Cliente Satisfecha',
    avatarUrl: 'https://placehold.co/64x64.png',
    avatarAiHint: 'person avatar',
    avatarFallback: 'EG',
    quote: '¡ServiMatch me ayudó a encontrar un fontanero excelente en cuestión de horas! Muy fácil de usar y el profesional fue muy eficiente.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Carlos R.',
    location: 'Profesional Verificado',
    avatarUrl: 'https://placehold.co/64x64.png',
    avatarAiHint: 'person avatar',
    avatarFallback: 'CR',
    quote: 'Como profesional, ServiMatch ha ampliado mi clientela significativamente. La plataforma es intuitiva y me conecta con clientes serios.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Laura M.',
    location: 'Cliente Frecuente',
    avatarUrl: 'https://placehold.co/64x64.png',
    avatarAiHint: 'person avatar',
    avatarFallback: 'LM',
    quote: 'He usado ServiMatch para varios servicios en casa, desde jardinería hasta reparaciones. Siempre encuentro profesionales de confianza.',
    rating: 4,
  },
];

export default function SearchPage() {
  return (
    <div className="space-y-12">
      <section className="bg-card p-6 md:p-8 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-center text-primary">Encuentra Profesionales Locales de Confianza</h1>
        <p className="text-center text-muted-foreground mb-8 text-base md:text-lg max-w-2xl mx-auto">
          Bienvenido a ServiMatch, tu plataforma ideal para conectar con expertos en una amplia gama de servicios.
          Utiliza nuestras herramientas de búsqueda y filtros para encontrar el talento local perfecto para tus necesidades, de forma rápida y segura.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="text" placeholder="Servicio (ej: fontanería, electricidad)" className="pl-10" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="text" placeholder="Ubicación (ej: Madrid, Barcelona)" className="pl-10" />
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 text-base">
            <Search className="mr-2 h-5 w-5" /> Buscar
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Filtrar por Tipo de Servicio" />
            </SelectTrigger>
            <SelectContent>
              {mockServices.map(service => (
                <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Ordenar por Valoración" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating_desc">Mejor Valorados</SelectItem>
              <SelectItem value="rating_asc">Menor Valorados</SelectItem>
            </SelectContent>
          </Select>
           <Button variant="outline" className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Más Filtros
          </Button>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-8 text-center">¿Por qué elegir ServiMatch?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <ListChecks className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="mt-4 font-headline text-xl">Amplia Gama de Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Encuentra ayuda para cualquier tarea, desde reparaciones del hogar hasta clases particulares y cuidado de mascotas.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="mt-4 font-headline text-xl">Profesionales Verificados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conectamos con profesionales cualificados y revisamos sus perfiles para tu tranquilidad y confianza.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <CalendarCheck className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="mt-4 font-headline text-xl">Reserva Fácil y Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Compara, contacta y reserva servicios de forma sencilla directamente desde nuestra plataforma.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-8 bg-secondary/30 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-8 text-center">Lo que dicen nuestros usuarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
          {mockTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarAiHint} />
                  <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-headline">{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
