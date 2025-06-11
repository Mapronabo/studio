import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Edit3, Shield, LogOut } from 'lucide-react';

// Mock user data
const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatarUrl: "https://placehold.co/128x128.png",
  joinDate: "Joined on January 15, 2023",
};

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <User className="w-8 h-8 mr-3 text-primary" />
        <h1 className="text-3xl font-headline font-bold">My Profile</h1>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center text-center p-6 bg-secondary/30">
          <Avatar className="w-32 h-32 mb-4 border-4 border-primary shadow-md">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="person avatar large" />
            <AvatarFallback className="text-4xl">{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-headline">{userProfile.name}</CardTitle>
          <CardDescription>{userProfile.joinDate}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={userProfile.name} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={userProfile.email} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={userProfile.phone} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue={userProfile.location} />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-5 h-5 mr-3" /> Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-5 h-5 mr-3" /> Notification Preferences
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="w-full sm:w-auto flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Edit3 className="w-5 h-5 mr-2" /> Save Changes
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto">
              <LogOut className="w-5 h-5 mr-2" /> Log Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline">Service History</CardTitle>
          <CardDescription>A list of services you've hired or provided.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for service history */}
          <p className="text-muted-foreground text-center py-6">Your service history will appear here.</p>
          <div className="text-center">
            <Button variant="link" className="text-primary">View Full History</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
