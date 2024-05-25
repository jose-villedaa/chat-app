import { ConversationFallback, ItemList } from '@/components';
import React from 'react';
import FriendDialog from './_components/AddFriendDialog';

function FriendsPage() {
  return (
    <>
      <ItemList title="Friends" action={<FriendDialog />}>
        Fiends Page
      </ItemList>
      <ConversationFallback />
    </>
  );
}

export default FriendsPage;
