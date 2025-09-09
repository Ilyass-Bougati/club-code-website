"use client";

import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { useUser } from "@/hooks/use-user";
import { Loading } from "@/components/loading";

export default function LoginPage() {
  const { user, loading, error } = useUser();
  if (user) {
    redirect("/");
  }

  if (loading)
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loading />
      </div>
    );

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-red-500">Something went wrong. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-[80vh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
