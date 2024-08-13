'use client';

import { ConversationFallback } from '@/components';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type ErrorPageProps = {
  error: Error;
};

export default function Error({ error }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    router.push('/conversations');
  }, [error, router]);

  return <ConversationFallback />;
}
