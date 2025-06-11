"use client";

import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  time: string;
  available: boolean;
}

// Generate some mock time slots based on current time
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const now = new Date();
  let startHour = 9;

  // If current time is past 9 AM, start from the next available hour
  if (now.getHours() >= 9) {
    startHour = now.getHours() + 1;
  }
  
  if (startHour >= 17) { // If past 5 PM, no slots for today
    return [{ time: "No slots available today", available: false }];
  }

  for (let i = startHour; i < 17; i++) { // 9 AM to 5 PM
    slots.push({ time: `${i}:00`, available: Math.random() > 0.3 }); // Random availability
    slots.push({ time: `${i}:30`, available: Math.random() > 0.3 });
  }
  return slots.length > 0 ? slots : [{ time: "No slots available today", available: false }];
};


export default function BookingCalendarClient() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, [selectedDate]);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      toast({
        title: "Booking Requested",
        description: `Your request for ${selectedDate.toLocaleDateString()} at ${selectedTime} has been submitted.`,
        variant: "default",
      });
      // Reset selection
      setSelectedTime(null);
      // Potentially refresh time slots or mark as booked
      setTimeSlots(prevSlots => prevSlots.map(slot => slot.time === selectedTime ? {...slot, available: false} : slot));

    } else {
      toast({
        title: "Booking Error",
        description: "Please select a date and time slot.",
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
          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
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
        <Button onClick={handleBooking} disabled={!selectedTime} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
          Request Booking
        </Button>
      </CardContent>
    </Card>
  );
}
