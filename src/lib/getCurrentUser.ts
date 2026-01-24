import { normalizeUser } from "@/lib/normalizeUser";
import prisma from "./prisma";
import { auth } from "./auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  return normalizeUser(user);
};

export const getCurrentUserId = async () => {
  const user = await getCurrentUser();
  return user?.id ?? null;
};

export const getCurrentRole = async () => {
  const user = await getCurrentUser();
  return user?.role ?? null;
};
