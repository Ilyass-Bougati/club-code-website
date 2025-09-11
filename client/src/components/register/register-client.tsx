"use client";

import { redirect } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import RegisterForm from "@/components/register/register-form";
import { Loading } from "../loading";

export default function RegisterClientPage() {
  const { user, loading } = useUser();


  if (user) {
    redirect("/");
  }

  if(loading) return <Loading />

  return <RegisterForm />;
}
