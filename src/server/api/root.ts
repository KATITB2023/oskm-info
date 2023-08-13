import { createTRPCRouter } from '~/server/api/trpc';
import { messageRouter } from '~/server/api/routers/message';
import { showcaseRouter } from '~/server/api/routers/showcase';
import { interactiveMapRouter } from '~/server/api/routers/interactive-map';
import { cmsRouter } from '~/server/api/routers/cms';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  message: messageRouter,
  showcase: showcaseRouter,
  interactiveMap: interactiveMapRouter,
  cms: cmsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
