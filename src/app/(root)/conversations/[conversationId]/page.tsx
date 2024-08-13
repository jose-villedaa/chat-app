'use client';

import {
  Body, ConversationContainer, Header, Input, Spinner,
} from '@/components';
import RemoveFriendDialog from '@/components/shared/Dialogs/RemoveFriend';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import React, { useState } from 'react';

type Props = {
  params: {
    conversationId: Id<'conversations'>;
  };
};

type CallType = 'audio' | 'video' | null;

function ConversationPage({ params: { conversationId } }: Props) {
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState<boolean>(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState<boolean>(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState<boolean>(false);
  const [callType, setCallType] = useState<CallType>(null);

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
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
        key={conversationId}
      />
      <Header
        imageUrl={conversation.isGroup ? undefined : conversation.otherMember?.imageUrl}
        name={(conversation.isGroup ? conversation.name : conversation.otherMember?.username) || ''}
        options={conversation.isGroup ? [
          {
            label: 'Leave group',
            destructive: false,
            onClick: () => setLeaveGroupDialogOpen(true),
          },
          {
            label: 'Delete group',
            destructive: true,
            onClick: () => setDeleteGroupDialogOpen(true),
          },
        ] : [
          {
            label: 'Remove friend',
            destructive: true,
            onClick: () => setRemoveFriendDialogOpen(true),
          },
        ]}
      />
      <Body />
      <Input />
    </ConversationContainer>
  );
}

export default ConversationPage;
