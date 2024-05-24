import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(
    () => params?.conversationId || '',
    [params?.conversationId],
  );

  const isActive = useMemo(() => !!conversationId, [conversationId]);

  return {
    conversationId,
    isActive,
  };
};

export default useConversation;
