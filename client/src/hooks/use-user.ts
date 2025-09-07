"use client"

import useSWR from "swr"

import { toast } from "sonner"
import api from "@/lib/axios"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  createdAt: string
}

// fetcher avec axios
const fetcher = async (url: string) => {
  const res = await api.get<User>(url)
  return res.data
}

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR("/api/v1/member", fetcher, {
    shouldRetryOnError: true, 
  })
  
  if (error) {
    toast.error(error?.response?.data?.message || "Erreur lors de la récupération de l'utilisateur")
  }

  return {
    user: data ?? null,
    loading: isLoading,
    error,
    mutate, 
  }
}
