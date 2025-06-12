
import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell'; // Importar AppShell

export const metadata: Metadata = {
  title: 'Renko',
  description: 'Encuentra al mejor profesional cerca de ti. Compara precios, reserva al instante y recibe atención de confianza.',
  icons: null, // Explicitly set icons to null
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background text-foreground">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
