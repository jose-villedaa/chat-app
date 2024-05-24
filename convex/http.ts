import { httpRouter } from 'convex/server';
import { WebhookEvent as WebEvent } from '@clerk/nextjs/dist/types/server';
import { Webhook } from 'svix';
import { internal } from './_generated/api';
import { httpAction } from './_generated/server';

type WebhookEvent = WebEvent | undefined;

const validatePayload = async (
  req: Request,
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();

  const svixHeaders = {
    'svix-id': req.headers.get('svix-id')!,
    'svix-timestamp': req.headers.get('svix-timestamp')!,
    'svix-signature': req.headers.get('svix-signature')!,
  };

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;

    return event;
  } catch (err) {
    throw new Error(`Could not validate Clerk payload: ${err}`);
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req);

  if (!event) {
    return new Response('Could not validate Clerk payload', {
      status: 400,
    });
  }

  switch (event.type) {
    case 'user.created': {
      await ctx.runMutation(internal.user.createUser, {
        username: `${event.data.first_name} ${event.data.last_name}`,
        imageUrl: event.data.image_url,
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
      });
      break;
    }
    case 'user.updated': {
      await ctx.runMutation(internal.user.createUser, {
        username: `${event.data.first_name} ${event.data.last_name}`,
        imageUrl: event.data.image_url,
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
      });
      break;
    }
    default: {
      throw new Error(`Unhandled Clerk webhook event: ${event.type}`);
    }
  }
  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: handleClerkWebhook,
});

export default http;
