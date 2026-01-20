import { SessionUser, ProfileDTO } from "@/lib/types";
import prisma from "./prisma";

export async function normalizeUser(
  sessionUser: SessionUser | undefined | null
): Promise<ProfileDTO | null> {
  if (!sessionUser?.email) return null;

  const db = await prisma.user.findUnique({
    where: { email: sessionUser.email },
  });

  if (!db) return null;

  return {
    id: db.id,
    email: db.email,
    role: db.role,
  };
}
