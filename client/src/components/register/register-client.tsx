"use client";

import  {Loading}  from "@/components/loading";
import { redirect } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import RegisterForm from "@/components/register/register-form";

export default function RegisterClientPage() {
  const { user, loading } = useUser();

  if (loading) return <Loading className="flex-1" />

  if (user) {
    redirect("/");
  }

  return <RegisterForm />;
}
