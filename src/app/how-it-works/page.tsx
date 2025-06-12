
// src/app/how-it-works/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Users, CreditCard, Star, UserPlus, CheckSquare, Send, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const clientSteps = [
  { 
    icon: Search, 
    title: "1. Busca lo que Necesitas", 
    description: "Utiliza nuestra barra de búsqueda inteligente. Describe el servicio que buscas o explora nuestras categorías. Filtra por ubicación, fecha y más para encontrar exactamente lo que necesitas." 
  },
  { 
    icon: Users, 
    title: "2. Compara Profesionales", 
    description: "Revisa perfiles detallados de los proveedores. Compara su experiencia, servicios ofrecidos, precios, valoraciones de otros usuarios y análisis de reputación por IA para tomar la mejor decisión." 
  },
  { 
    icon: CreditCard, 
    title: "3. Reserva y Paga con Seguridad", 
    description: "Una vez que hayas elegido al profesional ideal, selecciona una fecha y hora, y procede al pago de forma segura a través de nuestra plataforma. Tu pago queda protegido." 
  },
  { 
    icon: Star, 
    title: "4. Recibe el Servicio y Valora", 
    description: "El profesional realizará el trabajo acordado. Una vez completado, podrás valorar tu experiencia para ayudar a otros usuarios y mantener la calidad de nuestra comunidad." 
  },
];

const professionalSteps = [
  {
    icon: UserPlus,
    title: "1. Regístrate y Crea tu Perfil",
    description: "Únete gratis a ServiMatch. Completa tu perfil profesional detallando tu experiencia, habilidades y sube una selfie con tu DNI/NIE para verificación. Un perfil completo atrae más clientes."
  },
  {
    icon: CheckSquare,
    title: "2. Publica tus Servicios",
    description: "Crea 'anuncios' para cada uno de los servicios que ofreces. Define nombres claros, descripciones detalladas, precios (por hora, fijo, etc.), tu ubicación y disponibilidad."
  },
  {
    icon: Send,
    title: "3. Recibe Solicitudes y Comunícate",
    description: "Los clientes interesados podrán ver tus servicios y contactarte a través de la plataforma. Responde rápidamente a sus consultas y acuerda los detalles del trabajo."
  },
  {
    icon: Award,
    title: "4. Realiza el Trabajo y Recibe tu Pago",
    description: "Ofrece un servicio de calidad. Una vez completado y confirmado por el cliente, recibirás tu pago directamente en tu cuenta, menos una pequeña comisión de ServiMatch (5%)."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Cómo Funciona ServiMatch
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Encuentra servicios o crece tu negocio de forma fácil, rápida y segura.
        </p>
      </header>

      {/* Para Clientes */}
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="bg-secondary/30">
          <CardTitle className="text-3xl font-headline text-foreground">Para Clientes: Encuentra Ayuda Confiable</CardTitle>
          <CardDescription className="text-base">
            Contratar al profesional adecuado nunca fue tan sencillo. Sigue estos simples pasos:
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">
          {clientSteps.map((step, index) => (
            <div key={`client-step-${index}`} className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="p-4 bg-primary/10 rounded-full inline-block">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
          <div className="text-center pt-6">
            <Link href="/" passHref>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                Empezar a Buscar Servicios <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Para Profesionales */}
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-3xl font-headline text-foreground">Para Profesionales: Haz Crecer tu Negocio</CardTitle>
          <CardDescription className="text-base">
            Expande tu alcance, gestiona tu trabajo y recibe pagos de forma segura.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">
          {professionalSteps.map((step, index) => (
            <div key={`prof-step-${index}`} className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="p-4 bg-accent/10 rounded-full inline-block">
                  <step.icon className="w-10 h-10 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
          <div className="text-center pt-6">
            <Link href="/register/professional" passHref>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
                Regístrate como Profesional <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <section className="text-center py-10">
        <h2 className="text-2xl font-headline font-semibold mb-4 text-foreground">¿Listo para Empezar?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Únete a la comunidad ServiMatch hoy mismo y descubre una nueva forma de conectar servicios y oportunidades.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" passHref>
            <Button variant="outline" size="lg">Buscar un Servicio</Button>
          </Link>
          <Link href="/register/professional" passHref>
            <Button variant="outline" size="lg">Ofrecer mis Servicios</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
