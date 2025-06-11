import ChatInterfaceClient from '@/components/chat/ChatInterfaceClient';
import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center mb-6">
        <MessageSquare className="w-8 h-8 mr-3 text-primary" />
        <h1 className="text-3xl font-headline font-bold">Messages</h1>
      </div>
      <ChatInterfaceClient />
    </div>
  );
}
