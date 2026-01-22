import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import OnboardingForm from "../_components/OnboardingForm";

export default async function OnboardingPage() {
  const user = await CurrentUser();

  // if (!user) {
  //   redirect("/auth/login");
  // }
  if (!user) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center py-12">
        Access Blocked, You need to be logged in!
      </div>
    );
  }

  const profile = await prisma.datingProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (profile) {
    redirect("/discover");
  }

  return <OnboardingForm />;
}
