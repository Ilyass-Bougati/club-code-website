

import { getSession, SessionUser } from "@/actions/getSession";

export default async function TestPage() {
  // ⚡ Appel côté serveur
  const user: SessionUser | null = await getSession();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Test Session</h1>

      {user ? (
        <div className="p-4 border rounded shadow-sm">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-red-500">No user logged in. Please login first.</p>
      )}
    </div>
  );
}
