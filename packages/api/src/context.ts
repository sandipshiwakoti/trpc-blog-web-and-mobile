import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import JWT from "jsonwebtoken";

import { prisma } from "@acme/db";

import { env } from "../../../apps/nextjs/src/env.mjs";

const getUserFromToken = (token: string) => {
  const jwtSecret = env.JWT_SECRET;
  const user = JWT.verify(token, jwtSecret) as {
    id: string;
  };
  return user;
};

export const createContext = ({ req }: CreateNextContextOptions) => {
  function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = getUserFromToken(req.headers.authorization);
      return user;
    }
    return null;
  }
  const user = getUserFromHeader();
  return {
    user,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
