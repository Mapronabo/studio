// src/app/register/client/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function RegisterClientPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error de Contraseña",
        description: "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      return;
    }
    // Simulate API call for registration
    console.log("Registering client:", { name, email, password });
    toast({
      title: "¡Registro Exitoso!",
      description: `Bienvenido/a, ${name}! Tu cuenta de cliente ha sido creada. Serás redirigido al inicio.`,
      variant: "default",
      duration: 5000,
    });
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <UserPlus className="w-10 h-10 mr-3 text-primary" />
            <CardTitle className="text-2xl font-headline">Registro de Cliente</CardTitle>
          </div>
          <CardDescription className="text-center">Crea tu cuenta para empezar a buscar servicios.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Ana Pérez" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ej: ana.perez@correo.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Crear Cuenta</Button>
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
