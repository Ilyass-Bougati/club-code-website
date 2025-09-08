import { getSession } from "@/actions/getSession";
import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const user = await getSession();
  if (user) {
    redirect("/");
  }
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
