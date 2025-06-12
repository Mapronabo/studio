
"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { mockProviders } from '@/data/mockData'; // Import mockProviders to get provider name

interface TimeSlot {
  time: string;
  available: boolean;
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const now = new Date();
  let startHour = 9;

  if (now.getHours() >= 9) {
    startHour = now.getHours() + 1;
  }
  
  if (startHour >= 17) {
    return [{ time: "No slots available today", available: false }];
  }

  for (let i = startHour; i < 17; i++) {
    slots.push({ time: `${i}:00`, available: Math.random() > 0.3 });
    slots.push({ time: `${i}:30`, available: Math.random() > 0.3 });
  }
  return slots.length > 0 ? slots : [{ time: "No slots available today", available: false }];
};


export default function BookingCalendarClient() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname(); // Get current path to extract providerId

  // Extract providerId from the URL (e.g., /providers/[id])
  const providerId = pathname.split('/providers/')[1]?.split('/')[0];
  const provider = mockProviders.find(p => p.id === providerId);


  useEffect(() => {
    setTimeSlots(generateTimeSlots());
    setSelectedTime(null); // Reset selected time when date changes
  }, [selectedDate]);

  const handleBookingRequest = () => {
    if (selectedDate && selectedTime && provider) {
      // Simulate booking request
      toast({
        title: "Booking Requested",
        description: `Your request for ${selectedDate.toLocaleDateString()} at ${selectedTime} with ${provider.name} has been submitted. Proceed to payment.`,
        variant: "default",
      });

      // Prepare query parameters for payment page
      // For simplicity, let's assume a generic service name and price if not easily available here
      // In a real app, you'd fetch service details or pass them down
      const serviceToBook = provider.servicesOffered[0] || { name: 'Consultation', price: provider.hourlyRate || 50 };

      const queryParams = new URLSearchParams({
        providerId: provider.id,
        providerName: provider.name,
        serviceName: serviceToBook.name,
        price: serviceToBook.price.toString(),
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
      });

      router.push(`/payment?${queryParams.toString()}`);
      
      // Reset selection after navigating
      // setSelectedTime(null); // No need, as we are navigating away
      // setTimeSlots(prevSlots => prevSlots.map(slot => slot.time === selectedTime ? {...slot, available: false} : slot)); // This would be for client-side state update if not navigating
    } else {
      toast({
        title: "Booking Error",
        description: "Please select a date, time slot, or ensure provider details are available.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-headline flex items-center">
          <Clock className="mr-2 h-6 w-6 text-primary" />
          Book an Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) }
        />
        {selectedDate && (
          <div>
            <h4 className="font-semibold mb-2">Available Times for {selectedDate.toLocaleDateString()}:</h4>
            {timeSlots.length === 0 || (timeSlots.length === 1 && !timeSlots[0].available) ? (
              <p className="text-muted-foreground">No time slots available for this day.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    className={cn(!slot.available && "text-muted-foreground line-through", selectedTime === slot.time && "bg-primary text-primary-foreground")}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
        <Button onClick={handleBookingRequest} disabled={!selectedTime || !provider} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
          Request & Proceed to Payment
        </Button>
      </CardContent>
    </Card>
  );
}
