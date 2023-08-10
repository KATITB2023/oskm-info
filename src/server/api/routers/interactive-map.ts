import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const interactiveMapRouter = createTRPCRouter({
  getCampuses: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.map.findMany({
      select: {
        id: true,
        campus: true
      }
    });
  }),

  getCampusInfo: publicProcedure
    .input(
      z.object({
        campus: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.map.findUnique({
        where: {
          campus: input.campus
        }
      });
    }),

  getLocations: publicProcedure
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

      if (!interactiveMap) return [];

      return await ctx.prisma.mapLocation.findMany({
        include: {
          MapPhoto: true
        },
        where: {
          mapId: interactiveMap.id
        }
      });
    }),

  getLocationInfo: publicProcedure
    .input(
      z.object({
        title: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.mapLocation.findUnique({
        include: {
          MapPhoto: true
        },
        where: {
          title: input.title
        }
      });
    })
});
