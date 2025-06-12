
// src/app/find-providers/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import type { Provider } from '@/types';
import { mockProviders, mockServices } from '@/data/mockData';
import ProviderCard from '@/components/provider/ProviderCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ListFilter, AlertTriangle, Briefcase, Star, Wallet, Activity } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


function FindProvidersContent() {
  const searchParams = useSearchParams();
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const serviceIdQuery = searchParams.get('serviceId');
  const locationQuery = searchParams.get('location');
  const dateQuery = searchParams.get('date');
  const userQuery = searchParams.get('query'); 

  const [searchTerm, setSearchTerm] = useState(''); 
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [minExperience, setMinExperience] = useState<number | undefined>(undefined);


  const targetService = serviceIdQuery ? mockServices.find(s => s.id === serviceIdQuery) : null;
  const serviceCategoryName = targetService?.name;
  
  const ServiceIcon = targetService?.icon || Briefcase;

  let pageTitle = "Explorar Proveedores";
  if (userQuery) {
    pageTitle = `Resultados para "${userQuery}"`;
  } else if (serviceCategoryName) {
    pageTitle = `Proveedores de ${serviceCategoryName}`;
  }


  useEffect(() => {
    setIsLoading(true);
    let providers = mockProviders;

    if (serviceCategoryName) {
      providers = providers.filter(p => p.serviceCategory.toLowerCase() === serviceCategoryName.toLowerCase());
    }
    
    if (locationQuery) {
      providers = providers.filter(p => p.location.toLowerCase().includes(locationQuery.toLowerCase()));
    }
    
    if (searchTerm) { 
        providers = providers.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.servicesOffered.some(so => so.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    } else if (userQuery && !serviceCategoryName) { 
      providers = providers.filter(p => 
        p.name.toLowerCase().includes(userQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(userQuery.toLowerCase()) ||
        p.servicesOffered.some(so => so.name.toLowerCase().includes(userQuery.toLowerCase())) ||
        p.serviceCategory.toLowerCase().includes(userQuery.toLowerCase())
      );
    }

    // Apply advanced filters
    if (maxPrice !== undefined) {
      providers = providers.filter(p => p.hourlyRate !== undefined && p.hourlyRate <= maxPrice);
    }
    if (minRating !== undefined) {
      providers = providers.filter(p => p.rating >= minRating);
    }
    if (minExperience !== undefined) {
      providers = providers.filter(p => p.experienceYears >= minExperience);
    }


    setFilteredProviders(providers);
    setIsLoading(false);
  }, [serviceCategoryName, locationQuery, dateQuery, searchTerm, userQuery, maxPrice, minRating, minExperience]);

  const displayDate = dateQuery ? format(parseISO(dateQuery), "PPP", { locale: es }) : "cualquier fecha";

  let descriptionText = "Mostrando resultados";
  if (userQuery) {
    descriptionText += ` para tu búsqueda "${userQuery}"`;
    if (serviceCategoryName) {
      descriptionText += ` (categorizado como '${serviceCategoryName}')`;
    }
  } else if (serviceCategoryName) {
    descriptionText += ` para '${serviceCategoryName}'`;
  }

  if (locationQuery) descriptionText += ` en '${locationQuery}'`;
  if (dateQuery) descriptionText += ` para el ${displayDate}`;
  else descriptionText += ' para cualquier fecha';
  
  const activeFilterCount = [maxPrice, minRating, minExperience].filter(f => f !== undefined).length;
  if(activeFilterCount > 0) {
    descriptionText += `. ${activeFilterCount} filtro(s) activo(s).`;
  } else {
    descriptionText += ". Usa los filtros para refinar tu búsqueda.";
  }

  const handleClearFilters = () => {
    setMaxPrice(undefined);
    setMinRating(undefined);
    setMinExperience(undefined);
    setIsFilterSheetOpen(false);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <ServiceIcon className="w-8 h-8 mr-3 text-primary" />
            <CardTitle className="text-3xl font-headline">
              {pageTitle}
            </CardTitle>
          </div>
          <CardDescription>
            {descriptionText}
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
                 <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="relative">
                            <ListFilter className="mr-2" /> Más Filtros
                            {activeFilterCount > 0 && (
                                <Badge variant="destructive" className="absolute -top-2 -right-2 rounded-full p-1 text-xs h-5 w-5 flex items-center justify-center">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>Filtros Avanzados</SheetTitle>
                        <SheetDescription>
                            Refina tu búsqueda para encontrar al proveedor perfecto.
                        </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-6 py-6">
                            <div className="space-y-3">
                                <Label htmlFor="maxPrice" className="flex items-center"><Wallet className="mr-2 h-4 w-4 text-primary"/>Precio Máximo por Hora: <span className="ml-1 font-semibold">{maxPrice ? `$${maxPrice}` : 'Cualquiera'}</span></Label>
                                <Slider
                                id="maxPrice"
                                defaultValue={[maxPrice || 200]} 
                                max={200} 
                                step={10} 
                                onValueChange={(value) => setMaxPrice(value[0] === 200 && maxPrice === undefined ? undefined : value[0])} // Allow unsetting if slider is at max
                                />
                                {maxPrice !== undefined && <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => setMaxPrice(undefined)}>Quitar filtro de precio</Button>}
                            </div>
                             <div className="space-y-3">
                                <Label className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary"/>Valoración Mínima</Label>
                                <RadioGroup defaultValue={minRating?.toString()} onValueChange={(value) => setMinRating(parseInt(value))}>
                                {[5, 4, 3, 2, 1].map(rating => (
                                    <div key={rating} className="flex items-center space-x-2">
                                    <RadioGroupItem value={rating.toString()} id={`r${rating}`} />
                                    <Label htmlFor={`r${rating}`} className="flex">
                                        {Array(rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                                        {Array(5 - rating).fill(0).map((_, i) => <Star key={i+rating} className="w-4 h-4 text-muted-foreground" />)}
                                        <span className="ml-1 text-sm"> y más</span>
                                    </Label>
                                    </div>
                                ))}
                                </RadioGroup>
                                {minRating !== undefined && <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => setMinRating(undefined)}>Quitar filtro de valoración</Button>}
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="minExperience" className="flex items-center"><Activity className="mr-2 h-4 w-4 text-primary"/>Experiencia Mínima (años): <span className="ml-1 font-semibold">{minExperience || 'Cualquiera'}</span></Label>
                                <Slider 
                                id="minExperience"
                                defaultValue={[minExperience || 0]} 
                                max={20} 
                                step={1} 
                                onValueChange={(value) => setMinExperience(value[0] === 0 && minExperience === undefined ? undefined : value[0])} // Allow unsetting if slider is at min
                                />
                                {minExperience !== undefined && <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => setMinExperience(undefined)}>Quitar filtro de experiencia</Button>}
                            </div>
                        </div>
                        <SheetFooter className="mt-auto">
                            <Button variant="outline" onClick={handleClearFilters} className="w-full sm:w-auto">Limpiar Filtros</Button>
                            <SheetClose asChild>
                                <Button type="button" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">Aplicar</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
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
                 {!serviceIdQuery && !userQuery && "Prueba especificando un servicio o una búsqueda más general."}
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

