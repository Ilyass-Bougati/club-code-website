"use client";

import useSWR from "swr";
import { publicApi } from "@/lib/axios"; // instance axios sans credentials

const fetcher = async (url: string) => {
  const res = await publicApi.get(url);
  return res.data;
};

export function useRegistrationStatus() {
  const { data, error, isLoading } = useSWR<{ isRegistrationOpen: boolean }>(
    "/api/v1/auth/registration", // ⚡ pas besoin du full URL
    fetcher,
    {
      dedupingInterval: 3600 * 1000, // 1h
      revalidateOnFocus: false,
    }
  );

  return {
    isRegistrationOpen: data?.isRegistrationOpen ?? null,
    loading: isLoading,
    error,
  };
}
