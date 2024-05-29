import React, { useMemo } from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@convex/_generated/api';

const useNavigation = () => {
  const pathname = usePathname();
  const requestsCount = useQuery(api.requests.count);

  return useMemo(() => [
    {
      name: 'Conversations',
      href: '/conversations',
      icon: <MessageSquare />,
      active: pathname.startsWith('/conversations'),
    },
    {
      name: 'Friends',
      href: '/friends',
      icon: <Users />,
      active: pathname === '/friends',
      count: requestsCount,
    },
  ], [pathname, requestsCount]);
};

export default useNavigation;
