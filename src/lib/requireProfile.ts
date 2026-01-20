import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";

export async function requireProfile() {
  const user = await CurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const profile = await prisma.datingProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!profile) {
    redirect("/onboarding");
  }

  return { user, profile };
}
