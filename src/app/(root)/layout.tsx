import { SidebarWrapper } from '@/components';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}

export default Layout;
