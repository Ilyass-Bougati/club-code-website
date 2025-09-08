"use server";

import api from "@/lib/axios";
import { cookies } from "next/headers";

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader.includes("access_token")) return null; // pas de token → pas de session

    const res = await api.get<SessionUser>("/api/v1/member", {
      headers: {
        Cookie: cookieHeader, // ⚡ envoie explicitement cookies HttpOnly
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Erreur getSession:", err);
    return null;
  }
}
