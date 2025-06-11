import { mockProviders, mockServices } from '@/data/mockData';
import ProviderCard from '@/components/provider/ProviderCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter } from 'lucide-react';

export default function SearchPage() {
  // In a real app, providers would be fetched based on search/filter criteria
  const providers = mockProviders;

  return (
    <div className="space-y-8">
      <section className="bg-card p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-headline font-bold mb-6 text-center text-primary">Find Local Service Professionals</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="text" placeholder="Service (e.g., plumbing, electrician)" className="pl-10" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="text" placeholder="Location (e.g., New York, NY)" className="pl-10" />
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <Search className="mr-2 h-5 w-5" /> Search
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Filter by Service Type" />
            </SelectTrigger>
            <SelectContent>
              {mockServices.map(service => (
                <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Sort by Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating_desc">Highest Rated</SelectItem>
              <SelectItem value="rating_asc">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
           <Button variant="outline" className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-semibold mb-6">Available Providers</h2>
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No providers found matching your criteria.</p>
        )}
      </section>
    </div>
  );
}
