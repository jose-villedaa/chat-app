'use client';

import { Card } from '@/components/ui/card';
import {
  Form, FormControl, FormField, FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useConversation, useMutationState } from '@/hooks';
import { ChatMessageResolver, ChatMessageSchema } from '@/resolvers';
import TextAreaAutoSize from 'react-textarea-autosize';
import { api } from '@convex/_generated/api';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

function Input() {
  const { conversationId } = useConversation();
  const { mutate: createMessage, pending: loadingMessage } = useMutationState(api.message.create);

  const form = useForm<ChatMessageSchema>({
    resolver: ChatMessageResolver,
    defaultValues: {
      content: '',
    },
  });

  const handleSubmit = async (data: ChatMessageSchema) => {
    await createMessage({
      conversationId,
      type: 'text',
      content: [data.content],
    }).then(() => {
      form.reset();
    }).catch(() => {
      toast.error('Failed to send message');
    });
  };

  const handleOnKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        <Form {...form}>
          <form
            className="flex gap-2 items-end w-full"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem className="h-full w-full">
                  <FormControl>
                    <TextAreaAutoSize
                      onKeyDown={handleOnKeyDown}
                      rows={1}
                      maxRows={3}
                      placeholder="Type a message..."
                      className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loadingMessage} size="icon" type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}

export default Input;
