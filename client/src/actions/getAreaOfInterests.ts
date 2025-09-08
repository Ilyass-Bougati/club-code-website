import axios from "axios";

export interface AreaOfInterest {
  id: string;
  name: string;
}

export async function fetchAreaOfInterests(): Promise<AreaOfInterest[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/areaOfInterest`);
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erreur fetchAreasOfInterest:", err.response?.data || err.message);
    } else {
      console.error("Erreur inconnue fetchAreasOfInterest:", err);
    }
    return [];
  }
}
