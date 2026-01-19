import { betterAuth } from "better-auth";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prisma,

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});
