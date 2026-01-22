import { PrismaClient } from "@/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaAuthClient = () => {
  return new PrismaClient({
    accelerateUrl: process.env.ACCELERATE_URL!,
  }).$extends(withAccelerate());
};

type PrismaAuthClient = ReturnType<typeof prismaAuthClient>;

const globalForPrisma = globalThis as unknown as {
  prismaAuth?: PrismaAuthClient;
};

export const prismaAuth: PrismaAuthClient =
  globalForPrisma.prismaAuth ?? prismaAuthClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaAuth = prismaAuth;
}
