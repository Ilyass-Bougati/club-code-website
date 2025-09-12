import { getEventById, getEvents } from "@/actions/events";
import EventDetail from "@/components/events/event-detail";
import RelatedEvents from "@/components/events/related-events";

import React from "react";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventIdPage({ params }: EventPageProps) {
  const { id } = await params;

  const event = await getEventById(id);

  if (event) {
    const allEvents = await getEvents(1);

    const relatedEvents = allEvents
      .filter((e) => e.eventType === event.eventType && e.id !== event.id)
      .slice(0, 5);

    const recentEvents = allEvents
      .filter((e) => e.id !== event.id)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, 5);

    return (
      <main className="w-full flex-1 container mx-auto">
        <EventDetail event={event} />

        <RelatedEvents
          currentEventId={event.id!}
          relatedEvents={relatedEvents}
          recentEvents={recentEvents}
        />
      </main>
    );
  }
}
