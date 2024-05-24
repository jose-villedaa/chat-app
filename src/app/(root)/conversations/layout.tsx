import { ItemList } from '@/components';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

function ConversationsLayout({ children }: Props) {
  return (
    <>
      <ItemList title="Conversations">
        Conversations Page
      </ItemList>
      {children}
    </>
  );
}

export default ConversationsLayout;
