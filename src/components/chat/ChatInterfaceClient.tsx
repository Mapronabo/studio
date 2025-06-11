"use client";

import { useState, useEffect, useRef } from 'react';
import type { ChatConversation, ChatMessage } from '@/types';
import { mockConversations, mockMessages } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, UserCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export default function ChatInterfaceClient() {
  const searchParams = useSearchParams();
  const initialProviderId = searchParams.get('providerId');

  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If providerId is in URL, try to find or create a conversation
    if (initialProviderId) {
      const existingConvo = conversations.find(c => c.id.includes(initialProviderId)); // Assuming convo id might relate to provider id
      if (existingConvo) {
        setSelectedConversationId(existingConvo.id);
      } else {
        // Mock: create a new conversation if one with this providerId doesn't exist
        const providerName = mockMessages[`convo${initialProviderId}`] ? `Provider ${initialProviderId}` : "New Provider"; // simplified
        const newConvo: ChatConversation = {
          id: `convo${initialProviderId}`,
          participantName: providerName,
          participantAvatar: 'https://placehold.co/40x40.png',
          lastMessage: 'Started a new chat.',
          lastMessageTimestamp: Date.now(),
          unreadCount: 0,
        };
        setConversations(prev => [newConvo, ...prev]);
        setSelectedConversationId(newConvo.id);
        // Ensure mockMessages has an entry for this new convo
        if (!mockMessages[newConvo.id]) {
            mockMessages[newConvo.id] = [];
        }
      }
    } else if (conversations.length > 0) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [initialProviderId, conversations]);


  useEffect(() => {
    if (selectedConversationId) {
      setMessages(mockMessages[selectedConversationId] || []);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversationId) return;

    const message: ChatMessage = {
      id: `msg${Date.now()}`,
      senderId: 'user', // Assuming 'user' is the current user's ID
      receiverId: selectedConversationId, // This would be the provider's ID
      text: newMessage,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, message]);
    // Update mockMessages for persistence in this mock scenario
    if(mockMessages[selectedConversationId]) {
        mockMessages[selectedConversationId].push(message);
    } else {
        mockMessages[selectedConversationId] = [message];
    }


    // Mock a reply
    setTimeout(() => {
        const reply: ChatMessage = {
            id: `msg${Date.now() + 1}`,
            senderId: selectedConversationId, 
            receiverId: 'user',
            text: `Thanks for your message: "${newMessage.substring(0,20)}..."`,
            timestamp: Date.now() + 1000,
        };
        setMessages(prev => [...prev, reply]);
        if(mockMessages[selectedConversationId]) {
            mockMessages[selectedConversationId].push(reply);
        }
    }, 1000);


    setNewMessage('');
  };
  
  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="flex h-[calc(100vh-200px)] border rounded-lg shadow-xl bg-card">
      {/* Conversation List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats" className="pl-9 h-9" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-65px)]">
          {conversations.map((convo) => (
            <div
              key={convo.id}
              className={cn(
                "flex items-center p-3 hover:bg-secondary/50 cursor-pointer border-b",
                selectedConversationId === convo.id && "bg-secondary"
              )}
              onClick={() => setSelectedConversationId(convo.id)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={convo.participantAvatar} alt={convo.participantName} data-ai-hint="person avatar" />
                <AvatarFallback>{convo.participantName.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">{convo.participantName}</p>
                <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
              {convo.unreadCount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {convo.unreadCount}
                </span>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Message Area */}
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                 <AvatarImage src={selectedConversation.participantAvatar} alt={selectedConversation.participantName} data-ai-hint="person avatar" />
                 <AvatarFallback>{selectedConversation.participantName.substring(0,1)}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{selectedConversation.participantName}</h2>
            </div>
            <ScrollArea className="flex-1 p-4 space-y-4 bg-secondary/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end space-x-2",
                    msg.senderId === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.senderId !== 'user' && (
                     <Avatar className="h-8 w-8">
                       <AvatarImage src={selectedConversation.participantAvatar} alt={selectedConversation.participantName} data-ai-hint="person avatar small" />
                       <AvatarFallback>{selectedConversation.participantName.substring(0,1)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg shadow",
                      msg.senderId === 'user'
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-background text-foreground rounded-bl-none border"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                   {msg.senderId === 'user' && (
                     <Avatar className="h-8 w-8">
                       <UserCircle className="h-8 w-8 text-muted-foreground" />
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center space-x-2 bg-background">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90">
                <Send className="h-5 w-5 text-accent-foreground" />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
