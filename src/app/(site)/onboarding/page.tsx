// import { redirect } from "next/navigation";
// import prisma from "@/lib/prisma";
// import { CurrentUser } from "@/lib/currentUser";
// import OnboardingForm from "../_components/OnboardingForm";

// export default async function OnboardingPage() {
//   const user = await CurrentUser();

//   if (!user) {
//     redirect("/auth/login");
//   }

//   const profile = await prisma.datingProfile.findUnique({
//     where: { userId: user.id },
//     select: { id: true },
//   });

//   if (profile) {
//     redirect("/discover");
//   }

//   return <OnboardingForm />;
// }
import { CurrentUser } from "@/lib/currentUser";

const page = async () => {
  const user = await CurrentUser();

  if (!user) {
    return "Unauthorized access";
  }

  return <div>just confirm</div>;
};

export default page;
