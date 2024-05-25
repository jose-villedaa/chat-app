'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { AddFriendFormResolver, AddFriendFormSchema } from '@/resolvers';
import { useMutationState } from '@/hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import { TooltipContent } from '@radix-ui/react-tooltip';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';
import { api } from 'convex/_generated/api';

function FriendDialog() {
  const { mutate: createRequest, pending } = useMutationState(
    api.request.create,
  );

  const requestForm = useForm<AddFriendFormSchema>({
    resolver: AddFriendFormResolver,
    defaultValues: { email: '' },
  });

  const handleSubmit = async (data: AddFriendFormSchema) => {
    await createRequest({ email: data.email })
      .then(() => {
        requestForm.reset({ email: '' });
        toast.success('Friend request sent');
      })
      .catch((err) => {
        toast.error(
          err instanceof ConvexError ? err.data : 'An error occurred',
        );
      });
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="outline">
            <DialogTrigger>
              <UserPlus size={24} />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Friend</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            Send a request to connect with your friends!
          </DialogDescription>
        </DialogHeader>
        <Form {...requestForm}>
          <form onSubmit={requestForm.handleSubmit(handleSubmit)} className="">
            <FormField
              control={requestForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage>
                    {requestForm.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                Add Friend
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default FriendDialog;
