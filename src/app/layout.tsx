import type { Metadata } from 'next';
import './globals.css';
import NavigationBar from '@/components/layout/NavigationBar';
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link'; // Import Link

export const metadata: Metadata = {
  title: 'ServiMatch',
  description: 'Find and book local service providers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between"> {/* Changed to justify-between */}
            <Link href="/" className="mr-6 flex items-center space-x-2"> {/* Changed <a> to Link */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12.67 19a1 1 0 0 0 1.41-1.41L9.41 12l4.67-5.59a1 1 0 0 0-1.41-1.41l-5.34 6.42a1 1 0 0 0 0 1.16z"></path><path d="M8.67 19a1 1 0 0 0 1.41-1.41L5.41 12l4.67-5.59a1 1 0 0 0-1.41-1.41l-5.34 6.42a1 1 0 0 0 0 1.16z"></path><path d="M15 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"></path></svg>
              <span className="font-bold font-headline sm:inline-block text-primary">
                ServiMatch
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/register/client" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Register as Client
              </Link>
              <Link href="/register/professional" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Register as Professional
              </Link>
              {/* Future login link can go here */}
            </div>
          </div>
        </header>
        <main className="flex-grow container py-8">
          {children}
        </main>
        <NavigationBar />
        <Toaster />
      </body>
    </html>
  );
}
