/* eslint-disable */
import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import getUserByClerkId from './_utils';

export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    if (args.email === identity.email) {
      throw new ConvexError('Cannot send a friend request to yourself');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const receiver = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (!receiver) {
      throw new ConvexError('Receiver not found');
    }

    const queryAlreadySent = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', (q) => q.eq('receiver', receiver._id).eq('sender', currentUser._id))
      .unique();

    if (queryAlreadySent) {
      throw new ConvexError('Request already sent');
    }

    const queryAlreadyReceived = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', (q) => q.eq('receiver', currentUser._id).eq('sender', receiver._id));

    if (queryAlreadyReceived) {
      throw new ConvexError('Request already received');
    }

    const request = ctx.db.insert('requests', {
      sender: currentUser._id,
      receiver: receiver._id,
    });

    return request;
  },
});
