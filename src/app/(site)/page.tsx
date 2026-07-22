import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { LandingPage } from "./_components/LandingPage";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return <LandingPage />;
  }

  const profile = await prisma.datingProfile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile || !profile.isCompleted) {
    redirect("/onboarding/basics");
  }

  redirect("/discover");
}
