import * as process from 'process';

// Convex URL
export const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || '';

// Clerk URL
export const CLERK_URL = process.env.NEXT_PUBLIC_CLERK_URL || '';

// Publishable Key
export const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

// Webhook Secret
export const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || '';
