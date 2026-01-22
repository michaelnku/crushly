// import { PrismaClient } from "@/generated/prisma";
// import { PrismaPg } from "@prisma/adapter-pg";

// const globalForPrisma = globalThis as unknown as {
//   prisma?: PrismaClient;
// };

// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter: new PrismaPg({
//       connectionString: process.env.DATABASE_URL!,
//     }),
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// export default prisma;

import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
