import { createTRPCRouter } from '~/server/api/trpc';
import { messageRouter } from './routers/message';
import { showcaseRouter } from './routers/showcase';
import { chatbotRouter } from '~/server/api/routers/chatbot';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chatbot: chatbotRouter,
  message: messageRouter,
  showcase: showcaseRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
