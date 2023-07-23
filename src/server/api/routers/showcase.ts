import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { Lembaga } from '~/utils/file';

export const showcaseRouter = createTRPCRouter({
  getGotTalentTime: publicProcedure.query(async ({ ctx }) => {
    const gotTalentTime = await ctx.prisma.iTBGotTalent.findMany({
      where: {
        registrant: null
      }
    });

    return {
      gotTalentTime
    };
  }),

  registerGotTalent: publicProcedure
    .input(
      z.object({
        teamName: z.string(),
        teamMember: z.string().array(),
        ktmPath: z.string(),
        musicPath: z.string().optional(),
        property: z.string().optional(),
        scheduleId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const schedule = await ctx.prisma.iTBGotTalent.findUnique({
        where: {
          id: input.scheduleId
        }
      });

      if (!schedule) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Schedule already taken'
        });
      }

      await ctx.prisma.iTBGotTalent.update({
        where: {
          id: input.scheduleId
        },
        data: {
          registrant: {
            create: {
              teamName: input.teamName,
              teamMember: input.teamMember,
              ktmPath: input.ktmPath,
              musicPath: input.musicPath,
              property: input.property
            }
          }
        }
      });

      return {
        message: 'Booking success'
      };
    }),

  registerUnit: publicProcedure
    .input(
      z.object({
        name: z.string(),
        nim: z.string(),
        lembaga: z.nativeEnum(Lembaga),
        lembagaName: z.string(),
        position: z.string(),
        lineId: z.string(),
        waNumber: z.string(),
        mouPath: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.showcaseBooking.create({
        data: {
          name: input.name,
          nim: input.nim,
          lembaga: input.lembaga,
          lembagaName: input.lembagaName,
          position: input.position,
          lineId: input.lineId,
          waNumber: input.waNumber,
          mouPath: input.mouPath
        }
      });

      return {
        message: 'Register success'
      };
    })
});
