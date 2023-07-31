import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const interactiveMapRouter = createTRPCRouter({
  getInteractiveMap: publicProcedure
    .input(
      z.object({
        campus: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const interactiveMap = await ctx.prisma.map.findUnique({
        where: {
          campus: input.campus
        },
        select: {
          id: true
        }
      });

      if (!interactiveMap) return undefined;

      return await ctx.prisma.mapLocation.findMany({
        include: {
          MapPhoto: true
        },
        where: {
          mapId: interactiveMap.id
        }
      });
    })
});
