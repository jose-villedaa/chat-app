'use client';

import { useMutationState } from '@/hooks';
import { api } from '@convex/_generated/api';
import { useQuery } from 'convex/react';
import { useForm } from 'react-hook-form';
import React, { useMemo, useState } from 'react';
import { CreateGroupFormResolver, CreateGroupFormSchema } from '@/resolvers';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { CirclePlus, X } from 'lucide-react';
import {
  Form, FormControl, FormField, FormItem, FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

function AddGroupDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const friends = useQuery(api.friends.get);

  const { mutate, pending } = useMutationState(api.conversation.createGroup);

  const form = useForm<CreateGroupFormSchema>({
    resolver: CreateGroupFormResolver,
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = form.watch('members', []);

  const unselectedFriends = useMemo(
    () => (friends ? friends.filter((friend) => !members.includes(friend._id)) : []),
    [friends, members],
  );

  const noFriends = unselectedFriends.length === 0;

  const handleSubmit = async (data: CreateGroupFormSchema) => {
    await mutate({
      name: data.name,
      members: data.members,
    })
      .then(() => {
        form.reset();
        toast.success('Group created successfully');
        setIsOpen(false);
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.message
            : 'Failed to create group',
        );
      });
  };

  const handleOnCheckedChange = (checked: boolean, memberId: string) => {
    if (checked) {
      form.setValue('members', [...members, memberId]);
    }
  };

  const handleDeleteMember = (memberId: string) => {
    form.setValue('members', members.filter((id) => id !== memberId));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon">
            <DialogTrigger asChild>
              <CirclePlus />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create Group</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="block">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription className="pb-4">Add friends to get started!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Insert the name of the group..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={() => (
                <FormItem>
                  <FormLabel>Members of the group</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled={noFriends}>
                        <Button variant="outline" size="icon" className="w-full">
                          Select
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {unselectedFriends.map((friend) => (
                          <DropdownMenuCheckboxItem
                            className="flex items-center gap-2 w-full p-2"
                            key={friend._id}
                            onCheckedChange={(checked) => handleOnCheckedChange(
                              checked,
                              friend._id,
                            )}
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={friend.imageUrl} alt={friend.username} />
                              <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <h4 className="truncate">{friend.username}</h4>
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {members && members.length ? (
              <Card className="flex items-center gap-3 overflow-x-auto w-full h-24 p-2 no-scrollbar">
                {friends
                  ?.filter((friend) => members.includes(friend._id))
                  .map((friend) => (
                    <div
                      key={friend._id}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={friend.imageUrl} alt={friend.username} />
                          <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <X
                          className="text-muted-foreground w-4 h-4 absolute bottom-8 left-7 bg-muted rounded-full cursor-pointer"
                          onClick={() => handleDeleteMember(friend._id)}
                        />
                      </div>
                      <p className="truncate text-sm">
                        {friend.username.split(' ')[0]}
                      </p>
                    </div>
                  ))}
              </Card>
            ) : null}
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddGroupDialog;
