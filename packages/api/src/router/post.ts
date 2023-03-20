import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { title, content } = input;
      if (!title || !content) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Fields must not be empty",
        });
      }

      const userId = ctx.user?.id;
      const post = await ctx.prisma.post.create({
        data: { title, content, authorId: userId },
      });
      return post;
    }),
  editPost: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, title, content } = input;
      if (!id || !title || !content) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Fields must not be empty",
        });
      }

      const userId = ctx.user?.id;
      const post = await ctx.prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      if (userId !== post.authorId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authorized",
        });
      }

      await ctx.prisma.post.update({
        data: { title, content },
        where: { id },
      });
      return post;
    }),
  deletePost: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Field must not be empty",
        });
      }

      const userId = ctx.user?.id;
      const post = await ctx.prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      if (userId !== post.authorId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authorized",
        });
      }

      await ctx.prisma.post.delete({
        where: { id },
      });
      return post;
    }),
  posts: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  }),
  getPostById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }
      return post;
    }),
});
