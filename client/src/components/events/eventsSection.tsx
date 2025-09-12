"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CalendarDays, Newspaper } from "lucide-react";
import { Event } from "@/types/backendTypes"; 
import Pagination from "./pagination";



interface EventProps {
    events: Event[];
  currentPage: number;
  totalPages: number;
}


export default function EventsSection({ events, currentPage, totalPages }: EventProps) {
    const [mounted, setMounted] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [typingDone, setTypingDone] = useState(false);
    const { resolvedTheme } = useTheme();

    const subtitle = "Discover what's happening at CODE Club";

    useEffect(() => {
        setMounted(true);
        let i = 0;
        const interval = setInterval(() => {
            i += 1;
            setTypedText(subtitle.slice(0, i));
            if (i >= subtitle.length) clearInterval(interval), setTypingDone(true);
        }, 25);
        return () => clearInterval(interval);
    }, []);

    const buttonVariant = mounted && resolvedTheme === "dark" ? "secondary" : "default";
    const sortedEvents = [...events].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    const numpages = totalPages >= 1;

    return (
        <div className="container mx-auto p-4">
            <div className="relative bg-primary bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 md:px-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center space-y-4 text-center"
                >
                    <h2 className="text-primary-foreground text-3xl md:text-5xl font-bold">
                        Explore Our Tech Events
                    </h2>
                    <p className="text-primary-foreground/80 max-w-[700px] md:text-lg">{typedText}</p>
                </motion.div>
            </div>

            {sortedEvents.length > 0 ? (
                <>
                    <div className="grid md:grid-cols-3 gap-6">
                        {sortedEvents.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{
                                    opacity: typingDone ? 1 : 0,
                                    y: typingDone ? 0 : 50,
                                    scale: typingDone ? 1 : 0.9,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: typingDone ? i * 0.2 : 0,
                                    ease: "easeOut",
                                }}
                            >
                                <Link href={`/events/${event.id}`}>
                                    <Card className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 cursor-pointer p-0">
                                        <div className="h-48 w-full overflow-hidden relative rounded-t-2xl">
                                            <img
                                                src={event.image.uri}
                                                alt={event.title}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            <div className="absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded">
                                                {event.eventType}
                                            </div>

                                            <div className="absolute bottom-3 left-3 z-10 opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                                                <Button size="sm" variant={buttonVariant}>
                                                    Learn More
                                                </Button>
                                            </div>
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="group-hover:text-primary transition-colors text-lg min-h-[3.5rem] leading-tight">
                                                {truncateTitle(event.title, 60)}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground space-y-2">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="w-4 h-4 text-primary" />
                                                {formatDate(event.publishedAt)}
                                            </div>
                                            <div className="flex items-center gap-2 my-4">
                                                <Newspaper className="w-4 h-4 text-primary" />
                                                <span className={event.registrationOpen ? "text-success" : "text-destructive"}>
                                                    {event.registrationOpen ? "Registration Open" : "Registration Closed"}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {numpages && <Pagination currentPage={currentPage} totalPages={totalPages} />}
                </>
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    <Newspaper className="mx-auto mb-4 w-12 h-12 text-primary" />
                    <p className="text-lg font-semibold">No events available at the moment.</p>
                    <p className="text-sm">Please check back later for upcoming tech events.</p>
                </div>
            )}
        </div>
    );
}

function truncateTitle(title: string, maxLength: number) {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength) + "...";
}


const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

