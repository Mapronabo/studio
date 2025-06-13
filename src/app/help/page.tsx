
// src/app/help/page.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, HelpCircle, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

export default function HelpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    console.log("Simulating email submission:", { name, email, subject, message });

    toast({
      title: "Mensaje Enviado",
      description: "Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.",
      variant: "default",
      duration: 5000,
    });

    // Reset form fields
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <HelpCircle className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Centro de Ayuda y Contacto
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes preguntas o necesitas asistencia? Estamos aquí para ayudarte. También puedes consultar nuestra sección de <Link href="/how-it-works" className="text-primary hover:underline">cómo funciona</Link>.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center mb-1">
            <Mail className="w-6 h-6 mr-3 text-accent" />
            <CardTitle className="text-2xl font-headline">Envíanos un Mensaje</CardTitle>
          </div>
          <CardDescription>
            Completa el siguiente formulario y nuestro equipo de soporte se pondrá en contacto contigo a la brevedad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input 
                  id="name" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Tu nombre completo" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Tu Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="tu@correo.com" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input 
                id="subject" 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Ej: Problema con mi reserva" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Describe tu consulta o problema en detalle..." 
                rows={5} 
                required 
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3">
              <Send className="mr-2 h-5 w-5" />
              Enviar Mensaje
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            Normalmente respondemos en un plazo de 24-48 horas hábiles.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
