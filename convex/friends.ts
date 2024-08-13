/* eslint-disable */
import { ConvexError } from 'convex/values';
import { query } from './_generated/server';
import getUserByClerkId from './_utils';
export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const friendshipsUser = await ctx.db
      .query('friends')
      .withIndex('by_user', (q) => q.eq('user', currentUser._id))
      .collect();

    const friendshipsFriend = await ctx.db
      .query('friends')
      .withIndex('by_friend', (q) => q.eq('friend', currentUser._id))
      .collect();

    const friendships = [...friendshipsUser, ...friendshipsFriend];

    const friends = await Promise.all(
      friendships.map(async (friendship) => {
        const friend = await ctx.db.get(
          friendship.user === currentUser._id ? friendship.friend : friendship.user,
        );

        if (!friend) {
          throw new ConvexError('Friend not found');
        }

        return friend;
      }),
    );

    return friends;
  },
});
