import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMutationState } from '@/hooks';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { Check, UserIcon, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

type RequestProps = {
  id: Id<'requests'>;
  imageUrl: string;
  username: string;
  email: string;
};

function Request({
  email, imageUrl, username, id,
}: RequestProps) {
  const {
    mutate: denyRequest,
    pending: loadingDenyReq,
  } = useMutationState(api.request.deny);

  const {
    mutate: acceptRequest,
    pending: loadingAcceptReq,
  } = useMutationState(api.request.accept);

  const loadingReq = loadingDenyReq || loadingAcceptReq;

  const handleAccept = () => {
    acceptRequest({ id })
      .then(() => {
        toast.success('Friend request accepted');
      })
      .catch(() => {
        toast.error('An error occurred');
      });
  };

  const handleDeny = () => {
    denyRequest({ id })
      .then(() => {
        toast.success('Friend request denied');
      })
      .catch(() => {
        toast.error('An error occurred');
      });
  };

  return (
    <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" disabled={loadingReq} onClick={handleAccept}>
          <Check />
        </Button>
        <Button size="icon" variant="destructive" onClick={handleDeny} disabled={loadingReq}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}

export default Request;
