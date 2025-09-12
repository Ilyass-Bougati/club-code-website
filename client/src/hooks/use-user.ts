"use client";

import useSWR from "swr";
import api from "@/lib/axios";
import type { AxiosError } from "axios";
import { UUID } from "crypto";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  activated: boolean;
  joinedEvents: UUID[];
  createdAt: string;
}

const fetcher = async (url: string): Promise<User | null> => {
  try {
    const res = await api.get<User>(url); // ⚡ typage direct
    return res.data;
  } catch (err: unknown) {
    if (err && typeof err === "object" && "isAxiosError" in err) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response?.status === 403) {
        return null; // ⚡ utilisateur non connecté
      }
    }
    throw err; // ⚡ laisse SWR gérer les autres erreurs
  }
};

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User | null>(
    "/api/v1/member",
    fetcher,
    {
      shouldRetryOnError: true,
      dedupingInterval: 3600 * 1000, // 1h
      revalidateOnFocus: false,
      onError: (err: AxiosError) => {
        // ⚡ ignorer les 403
        if (err.response?.status === 403) return;
        // sinon tu peux logger si tu veux
        console.error("SWR error:", err);
      },
    }
  );

  return {
    user: data ?? null,
    loading: isLoading,
    error,
    mutate,
  };
}
