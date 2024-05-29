import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Id } from '@convex/_generated/dataModel';
import { User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type DmConversationProps = {
  id: Id<'conversations'>;
  imageUrl: string;
  username: string;
};

function DmConversation({ id, imageUrl, username }: DmConversationProps) {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center gap-4 truncate">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">
              {username}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              Start the conversation!
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default DmConversation;
