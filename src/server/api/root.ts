import { createTRPCRouter } from "~/server/api/trpc";
import { showcaseRouter } from "~/server/api/routers/showcase";
import { interactiveMapRouter } from "~/server/api/routers/interactive-map";
import { cmsRouter } from "~/server/api/routers/cms";
import { chatbotRouter } from "~/server/api/routers/chatbot";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chatbot: chatbotRouter,
  showcase: showcaseRouter,
  interactiveMap: interactiveMapRouter,
  cms: cmsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
