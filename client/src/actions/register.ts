import axios from "axios";

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  year: number;
  major: string;
  areaOfInterest: { id?: string; name: string }[]; 
}

export async function registerAction(data: RegisterInput) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // if backend sends cookies
      }
    );

    return res.data; // backend can return user or message
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Erreur d'inscription");
    }
    throw new Error("Erreur inconnue");
  }
}
