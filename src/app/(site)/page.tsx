import { requireProfile } from "@/lib/requireProfile";

export default async function Home() {
  await requireProfile();
}
