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

  if (loading) return <Loading />;

  if (error) {
    return (
      <p className="text-red-500">Something went wrong. Please try again.</p>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  );
}
