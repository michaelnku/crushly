import { redirect } from "next/navigation";
import DiscoverUI from "@/components/discover/DiscoverUI";
import { requireProfile } from "@/lib/requireProfile";

export default async function DiscoverPage() {
  const { user, profile } = await requireProfile();
  if (!user) redirect("/auth/login");

  if (!profile || !profile.isCompleted) {
    redirect("/onboarding/basics");
  }

  return <DiscoverUI />;
}
