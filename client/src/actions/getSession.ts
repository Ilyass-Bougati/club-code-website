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
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) return null;

    const res = await api.get<SessionUser>("/api/v1/member", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Erreur getSession:", err);
    return null;
  }
}
