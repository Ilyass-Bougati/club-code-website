"use client";

import { redirect } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import RegisterForm from "@/components/register/register-form";

export default function RegisterClientPage() {
  const { user } = useUser();


  if (user) {
    redirect("/");
  }

  return <RegisterForm />;
}
