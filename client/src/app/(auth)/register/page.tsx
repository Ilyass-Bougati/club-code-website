import { redirect } from "next/navigation";
import { isDateRegistration } from "@/actions/is-date-registration";
import RegisterClientPage from "@/components/register/register-client";
import Header from "@/components/layouts/header";


export default async function RegisterPage() {
  const allowed = await isDateRegistration();

  if (!allowed) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <RegisterClientPage />
      </main>
    </div>
  )
}
