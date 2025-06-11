// src/app/find-providers/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import type { Provider } from '@/types';
import { mockProviders, mockServices, getServiceIconByName } from '@/data/mockData';
import ProviderCard from '@/components/provider/ProviderCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, CalendarDays, Filter, ListFilter, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

function FindProvidersContent() {
  const searchParams = useSearchParams();
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const serviceIdQuery = searchParams.get('serviceId');
  const locationQuery = searchParams.get('location');
  const dateQuery = searchParams.get('date');

  const [searchTerm, setSearchTerm] = useState(''); // For live text search on this page

  const targetService = serviceIdQuery ? mockServices.find(s => s.id === serviceIdQuery) : null;
  const serviceCategoryName = targetService?.name;
  const ServiceIcon = targetService?.icon || Search;

  useEffect(() => {
    setIsLoading(true);
    let providers = mockProviders;

    if (serviceCategoryName) {
      providers = providers.filter(p => p.serviceCategory.toLowerCase() === serviceCategoryName.toLowerCase());
    }

    if (locationQuery) {
      providers = providers.filter(p => p.location.toLowerCase().includes(locationQuery.toLowerCase()));
    }
    
    // Simple text search on current results
    if (searchTerm) {
        providers = providers.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.servicesOffered.some(so => so.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }

    // Date filtering is complex with mock availability strings. 
    // For now, we are not strictly filtering by date but acknowledge it.
    // A real implementation would query backend with date availability.

    setFilteredProviders(providers);
    setIsLoading(false);
  }, [serviceCategoryName, locationQuery, dateQuery, searchTerm]);

  const displayDate = dateQuery ? format(parseISO(dateQuery), "PPP", { locale: es }) : "cualquier fecha";

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <ServiceIcon className="w-8 h-8 mr-3 text-primary" />
            <CardTitle className="text-3xl font-headline">
              {serviceCategoryName ? `Proveedores de ${serviceCategoryName}` : 'Todos los Proveedores'}
            </CardTitle>
          </div>
          <CardDescription>
            Mostrando resultados {serviceCategoryName ? `para '${serviceCategoryName}'` : ''} 
            {locationQuery ? ` en '${locationQuery}'` : ''} 
            {dateQuery ? ` para el ${displayDate}` : ' para cualquier fecha'}.
            Usa los filtros para refinar tu búsqueda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 border rounded-lg bg-secondary/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <Label htmlFor="search-term" className="text-sm font-medium">Buscar por palabra clave:</Label>
                <div className="relative mt-1">
                  <Input 
                    id="search-term"
                    type="text" 
                    placeholder="Ej: nombre, servicio específico..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-end justify-start md:justify-end space-x-2">
                 <Button variant="outline"><ListFilter className="mr-2" /> Más Filtros (Mock)</Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground py-10">Cargando proveedores...</p>
          ) : filteredProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map(provider => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron proveedores</h3>
              <p className="text-muted-foreground">
                Intenta ajustar tus criterios de búsqueda o explora otras categorías.
              </p>
              <Link href="/" passHref>
                <Button variant="default" className="mt-6 bg-accent hover:bg-accent/80 text-accent-foreground">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
       <div className="text-center mt-8">
        <Link href="/" passHref>
          <Button variant="outline">
            Nueva Búsqueda
          </Button>
        </Link>
      </div>
    </div>
  );
}


export default function FindProvidersPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 md:px-6 py-8 text-center">Cargando búsqueda...</div>}>
      <FindProvidersContent />
    </Suspense>
  );
}

// Minimal Label component as it's not a standard HTML element, 
// usually it would come from @/components/ui/label but this is a page not a component.
const Label = ({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) => (
  <label htmlFor={htmlFor} className={cn("block text-sm font-medium text-foreground", className)}>
    {children}
  </label>
);

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' '); // Basic cn for this context
