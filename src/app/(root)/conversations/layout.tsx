'use client';

import { DmConversation, ItemList, Spinner } from '@/components';
import AddGroupDialog from '@/components/shared/Dialogs/AddGroup';
import { api } from '@convex/_generated/api';
import { useQuery } from 'convex/react';
import { MessageSquareX } from 'lucide-react';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

function ConversationsLayout({ children }: Props) {
  const conversations = useQuery(api.conversations.get);

  const renderConversations = () => {
    if (!conversations) {
      return <Spinner />;
    }

    if (conversations.length === 0) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 sm:p-6 md:p-8">
          <MessageSquareX className="w-12 h-12 mb-4 sm:w-16 sm:h-16 md:w-20 md:h-20" />
          <p className="text-base sm:text-lg md:text-xl font-semibold text-center">
            You have no conversations yet
          </p>
        </div>
      );
    }

    return conversations.map(({
      conversation,
      otherMember,
      lastMessage,
    }) => (conversation.isGroup ? null : (
      <DmConversation
        key={conversation._id}
        id={conversation._id}
        imageUrl={otherMember?.imageUrl ?? ''}
        username={otherMember?.username ?? ''}
        lastMessageContent={lastMessage?.content}
        lastMessageSender={lastMessage?.sender}
      />
    )));
  };

  return (
    <>
      <ItemList title="Conversations" action={<AddGroupDialog />}>
        {renderConversations()}
      </ItemList>
      {children}
    </>
  );
}

export default ConversationsLayout;
