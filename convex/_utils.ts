import { QueryCtx, MutationCtx } from './_generated/server';

type ClerkUserProps = {
  ctx: QueryCtx | MutationCtx;
  clerkId: string;
};

const getUserByClerkId = async ({ clerkId, ctx }: ClerkUserProps) => ctx.db
  .query('users')
  .withIndex('by_clerk_id', (q) => q.eq('clerkId', clerkId))
  .unique();

export default getUserByClerkId;
