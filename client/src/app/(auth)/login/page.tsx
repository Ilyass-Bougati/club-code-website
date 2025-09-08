"use client";
import { LoginForm } from "@/components/auth/login-form";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {user} = useUser();
  const router = useRouter();

  if (user) {
    router.push("/");
  }
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
