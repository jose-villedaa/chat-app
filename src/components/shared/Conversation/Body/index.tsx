'use client';

import React from 'react';
import { api } from '@convex/_generated/api';
import { useConversation } from '@/hooks';
import { useQuery } from 'convex/react';
import { Id } from '@convex/_generated/dataModel';
import Message from '../Message';

function Body() {
  const { conversationId } = useConversation();

  const messages = useQuery(api.messages.get, { id: conversationId as Id<'conversations'> });

  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages?.map(({
        isCurrentUser, message, senderImage, senderName,
      }, index) => {
        const lastByUser = messages[index - 1]
          ?.message.senderId === messages[index].message.senderId;

        return (
          <Message
            key={message._id}
            fromCurrentUser={isCurrentUser}
            lastByUser={lastByUser}
            senderImageUrl={senderImage}
            senderName={senderName}
            content={message.content}
            createdAt={message._creationTime}
            type={message.type}
          />
        );
      })}
    </div>
  );
}

export default Body;
