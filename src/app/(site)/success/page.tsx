import { redirect } from "next/navigation";
import { CurrentUser } from "@/lib/getCurrentUser";

export default async function ProtectedPage() {
  const user = await CurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <div>Welcome to Crushly 💙</div>;
}
