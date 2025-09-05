export async function isDateRegistration() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/registration`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      next: { revalidate: 300 }, 
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération de l'état de l'inscription");
  }

  const data: { isRegistrationOpen: boolean } = await res.json();
  return data.isRegistrationOpen;
}
