"use client";

import useSWR from "swr";
import api from "@/lib/axios"; // ⚡ seulement api, pas publicApi

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
}

const fetcher = async (url: string) => {
  const res = await api.get(url); // ⚡ utilise api => envoie cookies HttpOnly
  return res.data;
};

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User | null>(
    "/api/v1/member", // ⚡ pas besoin du full URL, api a déjà baseURL
    fetcher,
    {
      shouldRetryOnError: true,
      dedupingInterval: 3600 * 1000, // 1h: évite les re-fetch répétés
      revalidateOnFocus: false, // pas de revalidation en revenant sur la page
    }
  );

  return {
    user: data ?? null,
    loading: isLoading,
    error,
    mutate,
  };
}
