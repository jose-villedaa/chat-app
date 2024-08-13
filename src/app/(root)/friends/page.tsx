'use client';

import { ConversationFallback, ItemList, Spinner } from '@/components';
import React from 'react';
import FriendDialog from '@/components/shared/AddFriendDialog';
import { useQuery } from 'convex/react';
import { api } from '@convex/_generated/api';
import Request from '@/components/shared/Request';
import { HeartCrack } from 'lucide-react';

function FriendsPage() {
  const friendRequests = useQuery(api.requests.get);

  const renderFriendRequests = () => {
    if (!friendRequests) {
      return (
        <Spinner />
      );
    }

    if (friendRequests.length === 0) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 sm:p-6 md:p-8">
          <HeartCrack className="w-12 h-12 mb-4 sm:w-16 sm:h-16 md:w-20 md:h-20" />
          <p className="text-base sm:text-lg md:text-xl font-semibold text-center">
            You have no friend requests
          </p>
        </div>
      );
    }

    return friendRequests.map(({ request, sender }) => (
      <Request
        key={request._id}
        id={request._id}
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
