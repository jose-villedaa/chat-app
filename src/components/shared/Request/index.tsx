import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, UserIcon, X } from 'lucide-react';
import React from 'react';

type RequestProps = {
  imageUrl: string;
  username: string;
  email: string;
};

function Request({
  email, imageUrl, username,
}: RequestProps) {
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
        <Button size="icon" onClick={() => {}}><Check /></Button>
        <Button size="icon" variant="destructive" onClick={() => {}}><X className="h-5 w-5" /></Button>
      </div>
    </Card>
  );
}

export default Request;
