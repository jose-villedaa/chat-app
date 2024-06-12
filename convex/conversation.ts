import { ConvexError, v } from 'convex/values';
import { query } from './_generated/server';
import getUserByClerkId from './_utils';

export const get = query({
  // Define the arguments for the query
  args: {
    id: v.id('conversations'),
  },

  // Define the handler function for the query
  handler: async (ctx, args) => {
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

    const conversation = await ctx.db.get(args.id);
    if (!conversation) {
      throw new ConvexError('Conversation not found');
    }

    const membership = await ctx.db
      .query('conversationMembers')
      .withIndex('by_member_conversationId', (q) => q.eq('memberId', currentUser._id)
        .eq('conversationId', conversation._id)).unique();

    if (!membership) {
      throw new ConvexError('You are not a member of this conversation');
    }

    const allConversationMemberships = await ctx.db.query('conversationMembers')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.id)).collect();

    if (!conversation.isGroup) {
      const otherMembership = allConversationMemberships
        .filter((membershipMember) => membershipMember.memberId !== currentUser._id)[0];

      const otherMemberDetails = await ctx.db.get(otherMembership.memberId);

      return {
        ...conversation,
        otherMember: {
          ...otherMemberDetails,
          lastSeenMessageId: otherMembership.lastSeenMessage,
        },
        otherMembers: null,
      };
    }
    const otherMembers = await Promise.all(
      allConversationMemberships
        .filter((membershipUser) => membershipUser.memberId !== currentUser._id)
        .map(async (membershipUser) => {
          const member = await ctx.db.get(membershipUser.memberId);

          if (!member) {
            throw new ConvexError('Member could not be found');
          }

          return {
            _id: member._id,
            username: member.username,
            lastSeenMessageId: membershipUser.lastSeenMessage,
          };
        }),
    );

    return { ...conversation, otherMembers, otherMember: null };
  },
});

export default get;
