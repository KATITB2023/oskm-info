import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import GhostContentAPI from "@tryghost/content-api";
import { env } from "~/env.cjs";

const contentApi = new GhostContentAPI({
  url: "https://blog.oskmitb.com",
  key: env.GHOST_CONTENT_API,
  version: "v5.0"
});

export const cmsRouter = createTRPCRouter({
  getArticlesList: publicProcedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
        sortBy: z.string().optional(),
        currentPage: z.number(),
        limitPerPage: z.number()
      })
    )
    .query(async ({ input }) => {
      const data = await contentApi.posts.browse({
        limit: input.limitPerPage,
        page: input.currentPage,
        fields: [
          "id",
          "slug",
          "title",
          "html",
          "reading_time",
          "feature_image"
        ],
        filter: input.searchQuery ? `title:~'${input.searchQuery}'` : undefined,
        order: input.sortBy,
        formats: ["html", "plaintext"]
      });

      return { data, meta: data.meta };
    }),

  getArticlesBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const content = await contentApi.posts.read(
        { slug: input.slug },
        {
          fields: [
            "id",
            "slug",
            "title",
            "html",
            "feature_image",
            "reading_time"
          ]
        }
      );

      await ctx.prisma.article.update({
        where: {
          id: content.id
        },
        data: {
          views: {
            increment: 1
          }
        }
      });

      const metadata = await ctx.prisma.article.findUnique({
        where: {
          id: content.id
        }
      });

      return {
        content: content,
        metadata: metadata
      };
    }),

  addArticleLike: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.article.update({
          where: {
            id: input.id
          },
          data: {
            likes: {
              increment: 1
            }
          }
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add like"
        });
      }
    }),

  addArticleDislike: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.article.update({
          where: {
            id: input.id
          },
          data: {
            likes: {
              decrement: 1
            }
          }
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add like"
        });
      }
    })
});
