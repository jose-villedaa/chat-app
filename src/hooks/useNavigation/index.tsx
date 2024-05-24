import React, { useMemo } from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();

  const paths = useMemo(() => [
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
    },
  ], [pathname]);

  return paths;
};
export default useNavigation;
