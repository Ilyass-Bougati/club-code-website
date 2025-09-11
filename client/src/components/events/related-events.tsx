"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays  } from "lucide-react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import events from "@/seed/events.json";

import { Link2 } from "lucide-react";
 import { Clock } from "lucide-react";
import { Event } from "@/types/backendTypes";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });



interface RelatedEventsProps {
    currentEventId: string;
    relatedEvents: Event[];
    recentEvents: Event[];
}

export default function RelatedEvents({ currentEventId }: RelatedEventsProps) {
  const currentEvent = events.find((e) => e.id === currentEventId);
  if (!currentEvent) return null;

  const related = events.filter(
    (e) => e.id !== currentEventId && e.eventType === currentEvent.eventType
  );

  const recent = events
    .filter((e) => e.id !== currentEventId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);


  const renderSection = (title: string, data: typeof events) => (
    <Card className="bg-card text-card-foreground border border-border hover:shadow-md transition-shadow duration-200 h-fit">
      <CardHeader>
      <CardTitle className="font-medium text-xl  flex items-center gap-2 ">
  {title === "Related Events" ? (
    <Link2 className="w-5 h-5 text-primary" />
  ) : (
    <Clock className="w-5 h-5 text-primary" />
  )}
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
            <Badge  className="text-xs">
              {event.eventType}
            </Badge>
          </div>

          <p className="font-medium text-sm text-foreground line-clamp-2">{event.title}</p>

          <p className="text-xs mt-1 text-muted-foreground flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            {formatDate(event.publishedAt)}
          </p>
        </div>
      </Link>
    </motion.div>

    {idx < data.length - 1 && (
      <Separator className="my-4 bg-border" />
    )}
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
      variants={container}
      className="w-full py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.length > 0 && renderSection("Related Events", related)}
        {recent.length > 0 && renderSection("Recent Events", recent)}
      </div>
    </motion.div>
  );
}
