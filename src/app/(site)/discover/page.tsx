import { requireProfile } from "@/lib/requireProfile";

export default async function DiscoverPage() {
  await requireProfile();

  return <div>Discover users 💘</div>;
}
