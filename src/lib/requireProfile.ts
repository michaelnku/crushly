import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function requireProfile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const profile = await prisma.datingProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile || !profile.isCompleted) {
    redirect("/onboarding/basics");
  }

  return { user, profile };
}
