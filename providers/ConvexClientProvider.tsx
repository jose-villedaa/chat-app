'use client';

import React from 'react';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { Authenticated, AuthLoading, ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import LoadingLogo from '@components/shared/LoadingLogo';

type ClientProviderProps = {
  children: React.ReactNode;
};

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL as string || '';

const convex = new ConvexReactClient(CONVEX_URL);

function ConvexClientProvider({ children }: ClientProviderProps) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>
          {children}
        </Authenticated>
        <AuthLoading>
          <LoadingLogo />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClientProvider;
