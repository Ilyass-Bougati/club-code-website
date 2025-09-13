"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion"; 
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Link2, Clock } from "lucide-react";
import { Event } from "@/types/backendTypes";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};


const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });



interface RelatedEventsProps {
    currentEventId: string;
    relatedEvents: Event[];
    recentEvents: Event[];
}

export default function RelatedEvents({
    currentEventId,
    relatedEvents,
    recentEvents,
}: RelatedEventsProps) {

    const renderSection = (title: string, data: Event[]) => (

        <Card className="bg-card text-card-foreground border border-border hover:shadow-md transition-shadow duration-200 h-fit">
            <CardHeader>
                
                <CardTitle className="font-medium text-xl flex items-center gap-2 line-clamp-3">
                    {title === "Related Events" ? <Link2 className="w-5 h-5 text-primary" /> : <Clock className="w-5 h-5 text-primary" />}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map((event, idx) => (
                    <div key={event.id}>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                            <Link href={`/events/${event.id}`}>
                                <div className="rounded-lg p-3 bg-muted hover:bg-accent transition-colors duration-300 cursor-pointer">
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge className="text-xs">{event.eventType}</Badge>
                                    </div>
                                    <p className="font-medium text-sm text-foreground line-clamp-2">{event.title}</p>
                                    <p className="text-xs mt-1 text-muted-foreground flex items-center gap-1">
                                        <CalendarDays className="w-3 h-3" />
                                        {formatDate(event.publishedAt)}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                        {idx < data.length - 1 && <Separator className="my-4 bg-border" />}
                    </div>
                ))}
            </CardContent>
        </Card>
    );

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="w-full py-12"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-8 px-4 md:px-0"
            >
                <h2 className="text-2xl font-bold text-primary mb-2">
                    Explore More Events
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Discover related events you might like or check out the latest events happening near you.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {relatedEvents.length > 0 && renderSection("Related Events", relatedEvents)}
                {recentEvents.length > 0 && renderSection("Recent Events", recentEvents)}
            </div>
        </motion.div>
    );
}


