import { Card } from '@/components/ui/card';
import { MessageSquarePlus } from 'lucide-react';
import React from 'react';

function ConversationFallback() {
  return (
    <Card className="hidden lg:flex h-full w-full p-4 items-center justify-center bg-secondary text-gray-400 flex-col">
      <MessageSquarePlus className="w-16 h-16 mb-4 text-gray-400 animate-pulse" />
      <p className="text-lg font-semibold text-center animate-pulse">
        Select/Start a conversation to get started!
      </p>
    </Card>
  );
}

export default ConversationFallback;
