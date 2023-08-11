import { createTRPCRouter } from '~/server/api/trpc';
import { messageRouter } from './routers/message';
import { showcaseRouter } from './routers/showcase';
import { interactiveMapRouter } from './routers/interactive-map';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  message: messageRouter,
  showcase: showcaseRouter,
  interactiveMap: interactiveMapRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
