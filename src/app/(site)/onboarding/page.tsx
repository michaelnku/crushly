// import { redirect } from "next/navigation";
// import prisma from "@/lib/prisma";
// import { CurrentUser } from "@/lib/currentUser";
// import OnboardingForm from "../_components/OnboardingForm";

// export default async function OnboardingPage() {
//   const user = await CurrentUser();

//   // if (!user) {
//   //   redirect("/auth/login");
//   // }
//   if (!user) {
//     return (
//       <div className="max-w-5xl mx-auto flex items-center justify-center py-12">
//         Access Blocked, You need to be logged in!
//       </div>
//     );
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
"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/auth/login");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name || "User"}!</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => signOut()}
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
    </main>
  );
}
