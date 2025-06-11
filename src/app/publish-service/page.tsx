// src/app/publish-service/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { BriefcaseBusiness, UploadCloud, CheckCircle } from 'lucide-react';
import { mockServices } from '@/data/mockData';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";


export default function PublishServicePage() {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual service publishing logic
    console.log({ serviceName, description, category, price, priceType, location, availability });
    toast({
      title: "Servicio Publicado (Simulado)",
      description: `Tu servicio "${serviceName}" ha sido publicado exitosamente.`,
      action: ( // This action is just a mock, ideally it would link to a "My Services" page
        <ToastAction altText="Ver mis servicios">Ver mis servicios</ToastAction>
      ),
    });
    // Reset form
    setServiceName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setPriceType('');
    setLocation('');
    setAvailability('');
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <UploadCloud className="w-10 h-10 mr-3 text-primary" />
            <CardTitle className="text-2xl font-headline">Publica tu Servicio</CardTitle>
          </div>
          <CardDescription className="text-center">Describe el servicio que ofreces para que los clientes puedan encontrarte.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Nombre del Servicio</Label>
              <Input id="serviceName" value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="Ej: Reparación de tuberías, Clase de guitarra" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Detallada del Servicio</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe qué incluye tu servicio, tu experiencia, materiales (si aplica), etc." required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría del Servicio</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockServices.map(service => (
                      <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio (EUR)</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ej: 50" min="0" step="any" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="priceType">Tipo de Precio</Label>
                <Select value={priceType} onValueChange={setPriceType} required>
                  <SelectTrigger id="priceType">
                    <SelectValue placeholder="Selecciona tipo de precio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Por Hora</SelectItem>
                    <SelectItem value="fixed">Precio Fijo Total</SelectItem>
                    <SelectItem value="per_unit">Por Unidad/Tarea</SelectItem>
                    <SelectItem value="negotiable">A convenir</SelectItem>
                    <SelectItem value="free_quote">Presupuesto gratuito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación donde ofreces el servicio</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ej: Madrid Centro, Online, A domicilio" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Tu Disponibilidad</Label>
              <Textarea id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="Ej: Lunes a Viernes de 9am a 5pm, Fines de semana con cita previa, Respuesta en 24h" required />
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Publicar Servicio
            </Button>
          </form>
        </CardContent>
         <CardFooter className="flex flex-col items-center space-y-2 pt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Volver al inicio</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
