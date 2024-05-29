'use client';

import { DmConversation, ItemList, Spinner } from '@/components';
import { api } from '@convex/_generated/api';
import { useQuery } from 'convex/react';
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
        <p className="w-full h-full flex items-center justify-center">
          You have no conversations yet. :(
        </p>
      );
    }

    return conversations.map(({ conversation, otherMember }) => (conversation.isGroup ? null : (
      <DmConversation
        key={conversation._id}
        id={conversation._id}
        imageUrl={otherMember?.imageUrl ?? ''}
        username={otherMember?.username ?? ''}
      />
    )));
  };

  return (
    <>
      <ItemList title="Conversations">{renderConversations()}</ItemList>
      {children}
    </>
  );
}

export default ConversationsLayout;
