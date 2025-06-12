
// src/app/payment/page.tsx
"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const providerName = searchParams.get('providerName') || 'N/A';
  const serviceName = searchParams.get('serviceName') || 'N/A';
  const priceString = searchParams.get('price');
  const dateString = searchParams.get('date');
  const time = searchParams.get('time') || 'N/A';
  
  const price = priceString ? parseFloat(priceString) : 0;
  const commissionRate = 0.05; // 5%
  const commissionAmount = price * commissionRate;
  const totalAmount = price; // Customer pays full price, provider gets price - commission

  const formattedDate = dateString ? format(new Date(dateString), "PPP", { locale: es }) : 'N/A';

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    console.log("Processing payment for:", { serviceName, providerName, totalAmount });
    toast({
      title: "¡Pago Exitoso!",
      description: `Tu pago de ${totalAmount.toFixed(2)} € para "${serviceName}" con ${providerName} ha sido procesado.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => router.push('/schedule')}>
          Ver mis Reservas
        </Button>
      ),
      duration: 7000,
    });
    // Redirect to schedule or confirmation page after a delay
    setTimeout(() => {
      router.push('/schedule');
    }, 3000);
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <CreditCard className="w-10 h-10 mr-3 text-primary" />
            <CardTitle className="text-3xl font-headline">Procesar Pago</CardTitle>
          </div>
          <CardDescription>Confirma los detalles de tu servicio y realiza el pago de forma segura.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-lg bg-secondary/30">
            <h3 className="text-lg font-semibold mb-2">Resumen del Servicio</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Servicio:</strong> {serviceName}</p>
              <p><strong>Proveedor:</strong> {providerName}</p>
              <p><strong>Fecha y Hora:</strong> {formattedDate} a las {time}</p>
              <Separator className="my-2" />
              <p><strong>Precio del Servicio:</strong> {price.toFixed(2)} €</p>
              <p className="text-xs text-muted-foreground">ServiMatch aplicará una comisión del {(commissionRate * 100).toFixed(0)}% ({commissionAmount.toFixed(2)} €) al proveedor sobre este precio.</p>
              <Separator className="my-2" />
              <p className="text-lg font-bold"><strong>Total a Pagar por ti:</strong> {totalAmount.toFixed(2)} €</p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
              <Input id="cardName" type="text" placeholder="Juan Pérez" required />
            </div>
            <div>
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <Input id="cardNumber" type="text" placeholder="•••• •••• •••• ••••" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Fecha de Caducidad</Label>
                <Input id="expiryDate" type="text" placeholder="MM/AA" required />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" type="text" placeholder="•••" required />
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground flex items-center text-lg py-3">
              <CheckCircle className="mr-2 h-5 w-5" />
              Pagar {totalAmount.toFixed(2)} € Ahora
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function PaymentPage() {
  return (
    // Suspense is good practice for pages using useSearchParams
    <Suspense fallback={<div className="container mx-auto max-w-2xl py-8 px-4 text-center">Cargando detalles del pago...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
