// src/actions/getSession.ts
"use server"

import { cookies } from "next/headers"

export interface SessionUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  createdAt: string
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    // ⚡ cookies() est async → il faut await
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ")

    if (!cookieHeader.includes("accessToken")) {
      return null
    }

    // Appel au backend pour récupérer l’utilisateur courant
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/member`,
      {
        method: "GET",
        headers: {
          Cookie: cookieHeader,
        },
        credentials: "include",
        cache: "no-store",
      }
    )

    if (!res.ok) {
      return null
    }

    const data = (await res.json()) as SessionUser
    return data
  } catch (err) {
    console.error("Erreur getSession:", err)
    return null
  }
}
