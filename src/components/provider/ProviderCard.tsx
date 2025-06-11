"use client";

import type { Provider } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Briefcase, Wrench, Zap, Sprout, Sparkles, PaintRoller, Dog, BookOpen } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

// Minimal mockServices for ProviderCard, icons must be imported from lucide-react
const localMockServices = [
  { name: 'Plumbing', icon: Wrench },
  { name: 'Electricity', icon: Zap },
  { name: 'Gardening', icon: Sprout },
  { name: 'Cleaning', icon: Sparkles },
  { name: 'Painting', icon: PaintRoller },
  { name: 'Pet Care', icon: Dog },
  { name: 'Tutoring', icon: BookOpen },
  { name: 'Default', icon: Briefcase}
];

export default function ProviderCard({ provider }: ProviderCardProps) {
  const ServiceIconComponent = localMockServices.find(s => s.name.toLowerCase() === provider.serviceCategory.toLowerCase())?.icon || Briefcase;
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={provider.galleryImageUrls[0] || 'https://placehold.co/600x400.png'}
            alt={`${provider.name} service visual`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="service work"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center mb-2">
           <Image
            src={provider.profileImageUrl}
            alt={`${provider.name} profile`}
            width={40}
            height={40}
            className="rounded-full mr-3"
            data-ai-hint="professional portrait"
          />
          <CardTitle className="text-xl font-headline">{provider.name}</CardTitle>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <ServiceIconComponent className="w-4 h-4 mr-2 text-primary" />
          <span>{provider.serviceCategory}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span>{provider.location}</span>
        </div>
        <CardDescription className="text-sm mb-3 h-10 overflow-hidden text-ellipsis">
          {provider.description.substring(0, 100)}{provider.description.length > 100 ? '...' : ''}
        </CardDescription>
        <div className="flex items-center mb-3">
          <Star className="w-5 h-5 text-yellow-400 mr-1" />
          <span className="font-semibold">{provider.rating.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">({provider.reviewCount} reviews)</span>
        </div>
        {provider.hourlyRate && (
          <p className="text-lg font-semibold text-primary mb-2">${provider.hourlyRate}/hr</p>
        )}
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30">
        <Link href={`/providers/${provider.id}`} passHref className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
