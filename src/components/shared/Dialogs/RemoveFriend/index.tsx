'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutationState } from '@/hooks';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { ConvexError } from 'convex/values';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

type Props = {
  conversationId: Id<'conversations'>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function RemoveFriendDialog({ conversationId, open, setOpen }: Props) {
  const { mutate, pending } = useMutationState(api.friend.remove);

  const handleRemoveFriend = async () => {
    await mutate({ conversationId })
      .then(() => {
        toast.success('Friend removed');
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError ? error.message : 'An error occurred');
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove this friend?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will lose all messages and shared media with this
            friend
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveFriendDialog;
