"use client";

import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch registration status");
  }
  return res.json();
};

export function useRegistrationStatus() {
  const { data, error, isLoading } = useSWR<{ isRegistrationOpen: boolean }>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/registration`,
    fetcher,
    {  
      refreshInterval: 5 * 60 * 1000,
    }
  );

  return {
    isRegistrationOpen: data?.isRegistrationOpen ?? null,
    loading: isLoading,
    error,
  };
}
