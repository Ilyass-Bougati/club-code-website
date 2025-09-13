import { redirect } from "next/navigation";
import { Metadata } from "next";
import EventsSection from "@/components/events/eventsSection";
import { getEvents, getNumPage } from "@/actions/events";

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

interface EventsPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
    const params = await searchParams; 

  

    const currentPage = Number(params.page) || 1;
    const events = await getEvents(currentPage);
    const totalPages = await getNumPage();

    return (
        <main className="w-full flex-1 container mx-auto">
            <EventsSection
                events={events}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </main>
    );
}
