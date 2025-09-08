
"use server";

import api from "@/lib/axios";

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
    const res = await api.get<SessionUser>("/api/v1/member", {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Erreur getSession:", err);
    return null;
  }
}
