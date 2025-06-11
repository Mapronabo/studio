"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, CalendarDays, MessageCircle, User, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Search', icon: Search },
  { href: '/schedule', label: 'Schedule', icon: CalendarDays },
  { href: '/messages', label: 'Messages', icon: MessageCircle },
  { href: '/compare', label: 'Compare', icon: LayoutGrid }, // Added Compare to nav for demonstration
  { href: '/profile', label: 'Profile', icon: User },
];

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-md md:relative md:bottom-auto md:border-none md:shadow-none">
      <div className="container mx-auto flex justify-around items-center h-16 md:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-sm transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      {/* Desktop navigation can be different or removed if sidebar is preferred */}
      {/* For this example, we'll hide it on desktop, assuming main header is used. */}
    </nav>
  );
}
