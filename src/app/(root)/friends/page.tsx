'use client';

import { ConversationFallback, ItemList, Spinner } from '@/components';
import React from 'react';
import FriendDialog from '@/components/shared/AddFriendDialog';
import { useQuery } from 'convex/react';
import { api } from '@convex/_generated/api';
import Request from '@/components/shared/Request';

function FriendsPage() {
  const friendRequests = useQuery(api.requests.get);

  // TODO: Find a way to improve the conditional rendering
  // TODO: Add translations for the entire project
  const renderFriendRequests = () => {
    if (!friendRequests) {
      return (
        <Spinner />
      );
    }

    if (friendRequests.length === 0) {
      return (
        <p className="w-full h-full flex items-center justify-center">
          You have no friend requests
        </p>
      );
    }

    return friendRequests.map(({ request, sender }) => (
      <Request
        key={request._id}
        email={sender.email}
        imageUrl={sender.imageUrl}
        username={sender.username}
      />
    ));
  };

  return (
    <>
      <ItemList title="Friends" action={<FriendDialog />}>
        {renderFriendRequests()}
      </ItemList>
      <ConversationFallback />
    </>
  );
}

export default FriendsPage;
