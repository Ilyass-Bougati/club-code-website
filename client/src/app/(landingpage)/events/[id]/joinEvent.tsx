"use server";

import api from "@/lib/axios";
import { AxiosError } from "axios";

export async function joinEventAction(eventId: string) {
    try {
        const res = await api.post(`/api/v1/event/register/${eventId}`);
        return { success: true, data: res.data };
    } catch (err: unknown) {
        console.error("Server join event error:", err);

        if (err instanceof AxiosError) {
            return { success: false, error: err.response?.data?.message || "Failed to join event" };
        }

        return { success: false, error: "Failed to join event" };
    }
}
