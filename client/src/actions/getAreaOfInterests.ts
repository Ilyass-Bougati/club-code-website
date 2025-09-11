export interface AreaOfInterest {
    id: string;
    name: string;
}

export async function fetchAreaOfInterests(): Promise<AreaOfInterest[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/areaOfInterest`, {
            next: { revalidate: 300 }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: AreaOfInterest[] = await res.json();
        return data;
    } catch (err: unknown) {
        console.error("Erreur fetchAreasOfInterest:", err);
        return [];
    }
}
