"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DiscoverUI() {
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
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name || "User"}!</p>
      <p>Email: {user.email}</p>
      <Button
        variant={"destructive"}
        onClick={() => signOut()}
        className=" font-medium px-4 py-2"
      >
        Sign Out
      </Button>
    </main>
  );
}
