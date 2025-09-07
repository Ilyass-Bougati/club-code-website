"use client"

import { useUser } from "@/hooks/use-user"

export default function TestPage() {
  const { user, loading, mutate } = useUser()

  if (loading) return <p>Chargement...</p>
  return (
    <div>
      <h1>Bonjour {user?.firstName} {user?.lastName}</h1>
      <p>Email: {user?.email}</p>
      <button onClick={() => mutate()}>Rafraîchir</button>
    </div>
  )
}
