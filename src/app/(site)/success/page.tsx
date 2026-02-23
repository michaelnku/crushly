import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <div>Welcome to Crushly 💙</div>;
}
