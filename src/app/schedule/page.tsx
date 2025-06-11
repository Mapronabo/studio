import { mockBookings } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, CheckCircle, AlertTriangle, Clock, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function SchedulePage() {
  const upcomingBookings = mockBookings.filter(b => new Date(b.dateTime) >= new Date() && (b.status === 'confirmed' || b.status === 'pending'));
  const pastBookings = mockBookings.filter(b => new Date(b.dateTime) < new Date() || b.status === 'completed' || b.status === 'cancelled');

  const getStatusProps = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-green-500', variant: 'default' as const, label: 'Confirmed' };
      case 'pending':
        return { icon: AlertTriangle, color: 'text-yellow-500', variant: 'secondary' as const, label: 'Pending' };
      case 'completed':
        return { icon: CheckCircle, color: 'text-blue-500', variant: 'outline' as const, label: 'Completed' };
      case 'cancelled':
        return { icon: AlertTriangle, color: 'text-red-500', variant: 'destructive' as const, label: 'Cancelled' };
      default:
        return { icon: Clock, color: 'text-muted-foreground', variant: 'ghost' as const, label: 'Unknown' };
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center mb-6">
          <CalendarDays className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-3xl font-headline font-bold">My Schedule</h1>
        </div>

        {upcomingBookings.length > 0 && (
          <>
            <h2 className="text-2xl font-headline font-semibold mb-4">Upcoming Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingBookings.map((booking) => {
                const statusProps = getStatusProps(booking.status);
                return (
                  <Card key={booking.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl font-headline">{booking.serviceName}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" /> With: {booking.providerName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        {new Date(booking.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                       <Badge variant={statusProps.variant} className={`capitalize ${statusProps.color} border-${statusProps.color.replace('text-', '')}`}>
                        <statusProps.icon className="w-4 h-4 mr-2" />
                        {statusProps.label}
                      </Badge>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Link href={`/providers/${booking.providerId}`} passHref>
                        <Button variant="outline" size="sm">View Provider</Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-100">Cancel (Mock)</Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </>
        )}
        
        {upcomingBookings.length === 0 && (
           <p className="text-muted-foreground text-center py-6">You have no upcoming appointments.</p>
        )}
      </section>

      {pastBookings.length > 0 && (
        <section>
          <h2 className="text-2xl font-headline font-semibold mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {pastBookings.map((booking) => {
              const statusProps = getStatusProps(booking.status);
              return (
                <Card key={booking.id} className="bg-card/70 shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{booking.serviceName}</p>
                      <p className="text-sm text-muted-foreground">With: {booking.providerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.dateTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={statusProps.variant} className={`capitalize ${statusProps.color} border-${statusProps.color.replace('text-', '')}`}>
                         <statusProps.icon className="w-3 h-3 mr-1" />
                        {statusProps.label}
                      </Badge>
                      {booking.status === 'completed' && (
                        <Button variant="link" size="sm" className="p-0 h-auto text-primary">Leave a Review</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
