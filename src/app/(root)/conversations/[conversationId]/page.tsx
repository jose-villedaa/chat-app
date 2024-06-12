'use client';

import {
  Body, ConversationContainer, Header, Input, Spinner,
} from '@/components';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import React from 'react';

type Props = {
  params: {
    conversationId: Id<'conversations'>;
  };
};

function ConversationPage({ params: { conversationId } }: Props) {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  if (conversation === undefined) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (conversation === null) {
    return (
      <p className="w-full h-full flex items-center justify-center">
        Conversation not found
      </p>
    );
  }

  return (
    <ConversationContainer>
      <Header
        imageUrl={conversation.isGroup ? undefined : conversation.otherMember?.imageUrl}
        name={(conversation.isGroup ? conversation.name : conversation.otherMember?.username) || ''}
      />
      <Body />
      <Input />
    </ConversationContainer>
  );
}

export default ConversationPage;
