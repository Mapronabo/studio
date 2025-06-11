"use client";

import { useSearchParams } from 'next/navigation';
import { mockProviders, mockServices } from '@/data/mockData';
import type { Provider } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Star, DollarSign, ExternalLink, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PriceComparisonPage() {
  const searchParams = useSearchParams();
  const serviceCategory = searchParams.get('service') || mockServices[0].name; // Default to first service if none specified

  const [providersToCompare, setProvidersToCompare] = useState<Provider[]>([]);

  useEffect(() => {
    // Filter providers based on the serviceCategory from URL or default
    const filtered = mockProviders.filter(
      p => p.serviceCategory.toLowerCase() === serviceCategory.toLowerCase()
    );
    setProvidersToCompare(filtered);
  }, [serviceCategory]);


  const getServiceIcon = (categoryName: string) => {
    return mockServices.find(s => s.name.toLowerCase() === categoryName.toLowerCase())?.icon || Briefcase;
  };
  const ServiceIcon = getServiceIcon(serviceCategory);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <ServiceIcon className="w-8 h-8 mr-3 text-primary" />
            <CardTitle className="text-3xl font-headline">Price Comparison: {serviceCategory}</CardTitle>
          </div>
          <CardDescription>
            Compare prices, ratings, and services from top providers in the '{serviceCategory}' category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {providersToCompare.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Provider</TableHead>
                    <TableHead>Primary Service / Rate</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-center">Experience</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providersToCompare.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={provider.profileImageUrl}
                            alt={provider.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                            data-ai-hint="professional portrait"
                          />
                          <span className="font-medium">{provider.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {provider.hourlyRate ? (
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1 text-green-600" /> ${provider.hourlyRate}/hr
                          </div>
                        ) : provider.servicesOffered[0] ? (
                          <div className="flex items-center">
                             <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                            {provider.servicesOffered[0].name} - ${provider.servicesOffered[0].price}
                          </div>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {provider.rating.toFixed(1)} ({provider.reviewCount})
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{provider.experienceYears} yrs</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/providers/${provider.id}`} passHref>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" /> View Profile
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10">
              No providers found for the '{serviceCategory}' category to compare. Try another category.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Link href="/" passHref>
          <Button variant="default" className="bg-accent hover:bg-accent/80 text-accent-foreground">
            Back to Search
          </Button>
        </Link>
      </div>
    </div>
  );
}
