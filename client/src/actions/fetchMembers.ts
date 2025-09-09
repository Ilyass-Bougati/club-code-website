import { UUID } from "crypto"

export interface Image  {
    id?: UUID | string,
    uri: string,
    host: "CLOUDINARY" | "S3"
}

export interface OfficeMember  {
    id?: string,
    image: Image,
    firstName: string,
    lastName: string,
    position: string,
    linkedin: string,
    instagram: string,
    addedAt: Date
}

export async function fetchMembers(): Promise<OfficeMember[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/office`, {
            next: { revalidate: 300 },
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: OfficeMember[] = await res.json()
        return data;
    } catch (err: unknown) {
        console.error("Erreur fetchMembers:", err);
        return [];
    }
}