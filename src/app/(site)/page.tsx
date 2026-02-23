import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function Home() {
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

  redirect("/discover");
}

function LandingPage() {
  return (
    <main className="min-h-screen bg-crushly flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-crushly-primary">
        Find your crush 💘
      </h1>
      <p className="mt-3 text-crushly-muted">Real connections. Real vibes.</p>

      <div className="mt-6 flex gap-4">
        <a
          href="/auth/register"
          className="bg-crushly-gradient text-white px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </a>

        <a
          href="/auth/login"
          className="border border-crushly px-6 py-3 rounded-lg"
        >
          Sign In
        </a>
      </div>
    </main>
  );
}
