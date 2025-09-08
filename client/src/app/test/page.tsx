
"use client"
import { useUser } from "@/hooks/use-user"

export default function TestPage() {
  const {user} = useUser()

  if (!user) {
    return <div>Vous devez être connecté.</div>
  }

  return (
    <div>
      <h1>Bienvenue {user.firstName} {user.lastName} 👋</h1>
      <p>Email: {user.email}</p>
      <p>Téléphone: {user.phoneNumber}</p>
      <p>Créé le: {new Date(user.createdAt).toLocaleString()}</p>
    </div>
  )
}
