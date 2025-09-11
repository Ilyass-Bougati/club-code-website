import { getEvents ,getNumPage } from "@/actions/events";
import EventsSection from "@/components/events/eventsSection";
import { Metadata } from "next";

interface EventsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Events - Code Club FST Settat",
  description:
    "Discover all the upcoming events, workshops, and activities organized by the Code Club at FST Settat. Stay tuned and participate!",
  keywords: [
    "Code Club",
    "FST Settat",
    "Events",
    "Workshops",
    "Hackathons",
    "Student Club",
  ],
  authors: [{ name: "Code Club FST Settat" }],
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;
  
  const events = await getEvents(pageNumber);
  const numberPage= await getNumPage();
  return (
    <main className="w-full flex-1 container mx-auto">
      <EventsSection events={events} currentPage={pageNumber} totalPages={numberPage} />
    </main>
  );
}
