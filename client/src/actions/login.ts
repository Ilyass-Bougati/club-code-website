"use server"
import axios from "axios";

interface LoginInput {
  email: string;
  password: string;
}

export async function loginAction({ email, password }: LoginInput) {
  try {
    const res = await axios.post(
     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // if backend sets cookies
      }
    );

    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Erreur de connexion");
    }
    throw new Error("Erreur inconnue");
  }
}
