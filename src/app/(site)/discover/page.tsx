import { redirect } from "next/navigation";
import DiscoverUI from "@/components/discover/DiscoverUI";
import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";

export default async function DiscoverPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const profile = await prisma.datingProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile || !profile.isCompleted) {
    redirect("/onboarding/basics");
  }

  return <DiscoverUI />;
}
