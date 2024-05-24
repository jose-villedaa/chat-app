import { ConversationFallback, ItemList } from '@/components';
import React from 'react';

function FriendsPage() {
  return (
    <>
      <ItemList title="Friends">
        Fiends Page
      </ItemList>
      <ConversationFallback />
    </>
  );
}

export default FriendsPage;
