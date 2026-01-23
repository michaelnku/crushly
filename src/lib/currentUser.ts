import { normalizeUser } from "@/lib/normalizeUser";
import prisma from "./prisma";
import { auth } from "./auth";
import { headers } from "next/headers";

export const CurrentUser = async () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  const { data: session } = await aut;

  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  return normalizeUser(user);
};

export const CurrentUserId = async () => {
  const user = await CurrentUser();
  return user?.id ?? null;
};

export const CurrentRole = async () => {
  const user = await CurrentUser();
  return user?.role ?? null;
};
