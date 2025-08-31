// src/app/events/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import Events from "@/components/events/events"
import EventDetail from "@/components/events/[slug]/event-detail"

export default function EventsPage() {
  const searchParams = useSearchParams()
  const eventId = searchParams.get('id')
  
  if (eventId) {
    return <EventDetail />
  }
  
  return <Events />
}
