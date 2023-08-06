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
        contact: z.string(),
        teamMember: z.string().array(),
        ktmPath: z.string(),
        musicPath: z.string().optional(),
        property: z.string().array().optional(),
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
              contact: input.contact,
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

  addTokenToShowcase: publicProcedure
    .input(
      z.object({
        showcaseId: z.string().uuid(),
        token: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.showcaseBooking.update({
        where: {
          id: input.showcaseId
        },
        data: {
          token: input.token
        }
      });

      return {
        message: 'Added token'
      };
    }),

  registerUnit: publicProcedure
    .input(
      z.object({
        name: z.string(),
        nim: z.string(),
        fakultas: z.string(),
        jurusan: z.string(),
        angkatan: z.string(),
        lineId: z.string(),
        waNumber: z.string(),
        lembaga: z.nativeEnum(Lembaga),
        lembagaName: z.string(),
        position: z.string(),
        noise: z.boolean(),
        mouPath: z.string(),
        kaos: z
          .object({
            size: z.string(),
            sleeve: z.string()
          })
          .array(),
        total: z.number(),
        method: z.string(),
        proofPath: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const registered = await ctx.prisma.showcaseBooking.findFirst({
        where: {
          nim: input.nim
        }
      });

      if (registered) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This NIM has already been registered'
        });
      }

      const pastDeadline =
        new Date('Aug 10, 2023 23:59:59 GMT+0700').getTime() <
        new Date().getTime();
      if (pastDeadline) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Registration deadline has passed'
        });
      }

      await ctx.prisma.showcaseBooking.create({
        data: {
          name: input.name,
          nim: input.nim,
          fakultas: input.fakultas,
          jurusan: input.jurusan,
          angkatan: input.angkatan,
          lineId: input.lineId,
          waNumber: input.waNumber,
          lembaga: input.lembaga,
          lembagaName: input.lembagaName,
          position: input.position,
          noise: input.noise,
          mouPath: input.mouPath,
          kaos: input.kaos,
          total: input.total,
          method: input.method,
          proofPath: input.proofPath
        }
      });

      return {
        message: 'Register success'
      };
    }),

  getLocation: publicProcedure
    .input(
      z.object({
        token: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const location = await ctx.prisma.locationBooking.findFirst({
        where: {
          token: input.token
        }
      });

      if (!location) {
        return undefined;
      }

      return location;
    }),

  bookLocation: publicProcedure
    .input(
      z.object({
        token: z.string(),
        location: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const bookedLocation = await ctx.prisma.bookedLocation.findFirst({
        where: {
          token: input.token
        }
      });

      if (bookedLocation) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Token has been used'
        });
      }

      try {
        await ctx.prisma.bookedLocation.create({
          data: {
            token: input.token,
            location: input.location
          }
        });

        return {
          message: 'Location successfully booked'
        };
      } catch (e) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Location have been booked, please select different location'
        });
      }
    })
});
