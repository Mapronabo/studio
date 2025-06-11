import { mockProviders } from '@/data/mockData';
import type { Provider } from '@/types';
import { analyzeProviderReputation, type AnalyzeProviderReputationOutput } from '@/ai/flows/analyze-provider-reputation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Briefcase, Phone, MessageCircle, CheckCircle2, DollarSign, ExternalLink } from 'lucide-react';
import ReputationDisplay from '@/components/reputation/ReputationDisplay';
import BookingCalendarClient from '@/components/booking/BookingCalendarClient';
import Link from 'next/link';

interface ProviderProfilePageProps {
  params: { id: string };
}

export default async function ProviderProfilePage({ params }: ProviderProfilePageProps) {
  const provider = mockProviders.find(p => p.id === params.id);

  if (!provider) {
    return <div className="text-center py-10">Provider not found.</div>;
  }

  // Format reviews for AI analysis
  const reviewsText = provider.reviews.map(r => `Rating: ${r.rating}/5 - "${r.comment}"`).join('\n');
  let reputationAnalysis: AnalyzeProviderReputationOutput | null = null;
  let isLoadingReputation = true;
  try {
    if (reviewsText.length > 0) {
        reputationAnalysis = await analyzeProviderReputation({ reviews: reviewsText });
    }
  } catch (error) {
    console.error("Error analyzing reputation:", error);
    // reputationAnalysis will remain null
  } finally {
    isLoadingReputation = false;
  }

  const ServiceIcon = mockServices.find(s => s.name === provider.serviceCategory)?.icon || Briefcase;

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="relative p-0 h-64 bg-muted">
          <Image
            src={provider.galleryImageUrls[0] || 'https://placehold.co/1200x400.png'}
            alt={`${provider.name} cover image`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="service landscape"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-end space-x-4">
            <Image
              src={provider.profileImageUrl}
              alt={`${provider.name} profile`}
              width={128}
              height={128}
              className="rounded-full border-4 border-background shadow-lg"
              data-ai-hint="professional portrait"
            />
            <div>
              <CardTitle className="text-3xl font-headline text-white drop-shadow-md">{provider.name}</CardTitle>
              <div className="flex items-center text-sm text-gray-200 drop-shadow-sm">
                <ServiceIcon className="w-5 h-5 mr-2" />
                <span>{provider.serviceCategory}</span>
                <span className="mx-2">|</span>
                <MapPin className="w-5 h-5 mr-1" />
                <span>{provider.location}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-2xl font-headline font-semibold mb-3">About {provider.name}</h2>
              <CardDescription className="text-base leading-relaxed">{provider.description}</CardDescription>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 mr-1" />
                  <span className="font-semibold">{provider.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground ml-1">({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-1 text-primary" />
                  <span className="text-muted-foreground">{provider.experienceYears} years experience</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-headline font-semibold mb-3">Services Offered</h2>
              <ul className="space-y-2">
                {provider.servicesOffered.map(service => (
                  <li key={service.name} className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                    <span className="font-medium">{service.name}</span>
                    <Badge variant="secondary" className="text-base">
                      <DollarSign className="w-4 h-4 mr-1" />{service.price}
                    </Badge>
                  </li>
                ))}
              </ul>
            </section>

            {provider.certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-headline font-semibold mb-3">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.certifications.map(cert => (
                    <Badge key={cert} variant="outline" className="text-sm py-1 px-3">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> {cert}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
            
            <section>
              <h2 className="text-2xl font-headline font-semibold mb-3">Reviews</h2>
              <div className="space-y-4">
                {provider.reviews.slice(0, 3).map(review => (
                  <Card key={review.id} className="bg-secondary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                        <span className="ml-2 font-semibold text-sm">{review.userName}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{new Date(review.date).toLocaleDateString()}</p>
                      <p className="text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
                {provider.reviews.length > 3 && (
                  <Button variant="link" className="text-primary p-0">View all {provider.reviews.length} reviews</Button>
                )}
              </div>
            </section>

            <section>
                <ReputationDisplay analysis={reputationAnalysis} isLoading={isLoadingReputation} />
            </section>
          </div>

          <aside className="space-y-6 md:sticky md:top-24 self-start">
            <BookingCalendarClient />
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-headline">Contact Provider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <Link href={`/messages?providerId=${provider.id}`} passHref className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <MessageCircle className="mr-2 h-5 w-5" /> Chat with Provider
                    </Button>
                 </Link>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-5 w-5" /> Call Now (Mock)
                </Button>
                <Link href={`/compare?service=${encodeURIComponent(provider.serviceCategory)}`} passHref className="w-full">
                    <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-5 w-5" /> Compare Similar Providers
                    </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{provider.availability}</p>
              </CardContent>
            </Card>
          </aside>
        </CardContent>
      </Card>
    </div>
  );
}

// Minimal mockServices for icons, ensure it aligns with mockData.ts
const mockServices = [
  { name: 'Plumbing', icon: Briefcase },
  { name: 'Electricity', icon: Briefcase },
  { name: 'Gardening', icon: Briefcase },
  // ... add other service types with their icons
];
