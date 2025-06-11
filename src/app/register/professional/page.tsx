
// src/app/register/professional/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, UserPlus, UploadCloud } from 'lucide-react';
import { mockServices } from '@/data/mockData';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function RegisterProfessionalPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [dniPhoto, setDniPhoto] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error de Contraseña",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      });
      return;
    }
    if (!dniPhoto) {
      toast({
        title: "Falta Documento",
        description: "Por favor, sube una foto de tu DNI.",
        variant: "destructive",
      });
      return;
    }
    // Placeholder for actual registration logic
    console.log({ name, email, password, serviceCategory, experience, bio, dniPhotoName: dniPhoto?.name });
    toast({
      title: "Registro Profesional Exitoso (Simulado)",
      description: `¡Bienvenido, ${name}! Tu perfil profesional ha sido creado y tu DNI está pendiente de verificación. Ahora puedes publicar tus servicios.`,
      action: <Link href="/publish-service"><ToastAction altText="Publicar un servicio">Publicar Servicio</ToastAction></Link>,
      duration: 7000,
    });
    // Reset form or redirect
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setServiceCategory('');
    setExperience('');
    setBio('');
    setDniPhoto(null);
    // Reset file input visually if possible (difficult with controlled file inputs)
    const dniInput = document.getElementById('dniPhoto') as HTMLInputElement;
    if (dniInput) dniInput.value = '';
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <Briefcase className="w-10 h-10 mr-3 text-primary" />
            <CardTitle className="text-2xl font-headline">Registro de Profesional</CardTitle>
          </div>
          <CardDescription className="text-center">Únete a nuestra red de profesionales y ofrece tus servicios.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo o de Empresa</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Juan Manitas S.L." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ej: contacto@juanmanitas.com" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceCategory">Categoría de Servicio Principal</Label>
                <Select value={serviceCategory} onValueChange={setServiceCategory} required>
                  <SelectTrigger id="serviceCategory">
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
                <Label htmlFor="experience">Años de Experiencia</Label>
                <Input id="experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Ej: 5" min="0" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Descripción Corta / Bio</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Describe brevemente tus servicios, especialidades, etc." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dniPhoto" className="flex items-center">
                <UploadCloud className="w-5 h-5 mr-2 text-primary" />
                Foto de DNI/NIE (Anverso)
              </Label>
              <Input 
                id="dniPhoto" 
                type="file" 
                onChange={(e) => setDniPhoto(e.target.files ? e.target.files[0] : null)} 
                accept="image/jpeg, image/png, image/webp" 
                required 
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              <p className="text-xs text-muted-foreground pt-1">Sube una imagen clara del anverso de tu documento de identidad. Necesario para verificación.</p>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Crear Perfil Profesional</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-6">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta? <Link href="/login" className="font-medium text-primary hover:underline">Inicia Sesión</Link>
          </p>
           <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Volver al inicio</Link>
        </CardFooter>
      </Card>
    </div>
  );
}

    