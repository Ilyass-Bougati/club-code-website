import { redirect } from "next/navigation";
import { getSession } from "@/actions/getSession";
import { isDateRegistration } from "@/actions/is-date-registration";
import RegisterForm from "@/components/register/register-form";

export default async function RegisterPage() {
  const session = await getSession();
  if (session) {
    redirect("/"); 
  }

  const allowed = await isDateRegistration();
  if (!allowed) {
    redirect("/"); 
  }

  return <RegisterForm />;
}
