import { requireProfile } from "@/lib/requireProfile";
import OnboardingBasicsForm from "../../_components/OnboardingBasicsForm";

export default async function OnboardingBasicsPage() {
  await requireProfile();
  return <OnboardingBasicsForm />;
}
