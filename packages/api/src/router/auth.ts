import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { z } from "zod";

import { env } from "../../../../apps/nextjs/src/env.mjs";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      if (!email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Fields must not be empty",
        });
      }

      const user = await ctx.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect email or password",
        });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect email or password",
        });
      }

      const accessToken = JWT.sign(
        { id: user.id, email: user.email },
        env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      return {
        accessToken,
      };
    }),
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { name, username, email, password } = input;
      if (!name || !username || !email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Fields must not be empty",
        });
      }

      const userWithEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (userWithEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This email already exists.",
        });
      }

      const userWithUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (userWithUsername) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This email already exists.",
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: encryptedPassword,
        },
      });

      return user;
    }),
});
