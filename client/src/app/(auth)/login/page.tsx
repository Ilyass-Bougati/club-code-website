"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { useUser } from "@/hooks/use-user";
import { Loading } from "@/components/loading";

export default function LoginPage() {
  const { user, error, loading } = useUser();
  const router = useRouter();

  // Redirect if logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/"); // replace avoids back button loop
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loading />
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
