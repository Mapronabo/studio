
"use client";

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Globe, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

const navLinks = [
  { href: "/how-it-works", label: "Cómo funciona" },
  { href: "/#search-services", label: "Buscar servicios" },
  { href: "/register/professional", label: "Conviértete en profesional" },
  { href: "/help", label: "Ayuda" },
];

const LogoSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12.67 19a1 1 0 0 0 1.41-1.41L9.41 12l4.67-5.59a1 1 0 0 0-1.41-1.41l-5.34 6.42a1 1 0 0 0 0 1.16z"></path><path d="M8.67 19a1 1 0 0 0 1.41-1.41L5.41 12l4.67-5.59a1 1 0 0 0-1.41-1.41l-5.34 6.42a1 1 0 0 0 0 1.16z"></path><path d="M15 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"></path></svg>
);

export default function AppShell({ children }: { children: ReactNode }) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const SCROLL_THRESHOLD = 10; // Min scroll distance to trigger visibility change
  const HEADER_HEIGHT_APPROX = 80; // Approximate height of the header (h-20)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < SCROLL_THRESHOLD && currentScrollY > 0) {
        return; 
      }

      if (currentScrollY <= 0) {
        setHeaderVisible(true); 
      } else if (currentScrollY > lastScrollY && currentScrollY > HEADER_HEIGHT_APPROX) {
        setHeaderVisible(false); 
      } else if (currentScrollY < lastScrollY) {
        setHeaderVisible(true); 
      }
      
      setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "transition-transform duration-300 ease-in-out",
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <LogoSvg />
            <span className="text-2xl font-bold font-headline sm:inline-block text-primary">
              ServiMatch
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" passHref>
              <Button variant="ghost" className="text-sm">Iniciar sesión</Button>
            </Link>
            <Link href="/register/client" passHref>
              <Button variant="outline" className="text-sm">Registrarse</Button>
            </Link>
          </div>
          {/* Mobile Menu Trigger can be added here */}
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold font-headline mb-3">ServiMatch</h3>
              <p className="text-sm text-muted-foreground">Conectando personas con profesionales de confianza para cada necesidad.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold font-headline mb-3">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-primary transition-colors">Sobre nosotros</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Trabaja con nosotros</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold font-headline mb-3">Soporte</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-primary transition-colors">Centro de Ayuda</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Términos de Servicio</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold font-headline mb-3">Conéctate</h3>
              <div className="flex space-x-4 mb-4">
                <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
                <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
                <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
              </div>
              <div className="space-y-2">
                 <Select defaultValue="es">
                    <SelectTrigger className="w-[150px] text-sm h-9">
                      <Globe size={16} className="mr-2" />
                      <SelectValue placeholder="Idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="eur">
                    <SelectTrigger className="w-[150px] text-sm h-9">
                      <DollarSign size={16} className="mr-2" />
                       <SelectValue placeholder="Moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </div>
          </div>
          <div className="border-t border-muted pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ServiMatch. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </>
  );
}
