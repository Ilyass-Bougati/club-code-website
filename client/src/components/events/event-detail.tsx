"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CalendarDays,
    ArrowLeft,
    Clock,
    Users,
    Award,
    Tag,
    FileText,
    Info,
} from "lucide-react";
import { Loader2 } from "lucide-react";

import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";

import { Event } from "@/types/backendTypes";
import { toast } from "sonner";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

interface EventDetailProps {
    event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
    const [loading, setLoading] = useState(false);
    const { user, loading: userLoading } = useUser();

    if (!event) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold">Event not found</h2>
                <p className="text-muted-foreground mt-2">
                    {`The event you are looking for doesn't exist or could not be loaded.`}
                </p>
                <Link href="/events">
                    <Button className="mt-4">Back to Events</Button>
                </Link>
            </div>
        );
    }

    const handleJoin = async () => {
        try {
            setLoading(true);
            const res = await api.post(`/api/v1/event/register/${event.id}`);
            toast.success("You have successfully joined the event!");
            return { success: true, data: res.data };
        } catch (err: unknown) {
            toast.error("Server join event error:" + err);
            if (err instanceof AxiosError) {
                return {
                    success: false,
                    error: err.response?.data?.message || "Failed to join event",
                };
            }
            return { success: false, error: "Failed to join event" };
        } finally {
            setLoading(false);
        }
    };

    const isRegistrationAvailable =
        event.registrationOpen && new Date(event.registrationDeadline) > new Date();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="container mx-auto  min-h-screen ">
            <div className="container mx-auto px-4 py-8">
        
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Link
                            href="/events"
                            className="hover:text-primary transition-colors"
                        >
                            Events
                        </Link>
                        <span>{" > "}</span>
                        <span className="text-foreground font-medium">{event.title}</span>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid lg:grid-cols-3 gap-8"
                >
              
                    <motion.div
                        variants={containerVariants}
                        className="lg:col-span-2 space-y-6"
                    >
                     
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-2xl shadow-2xl"

                        >
                            <img
                                src={event.image.uri}
                                alt={event.title}
                                className="w-full max-h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary">{event.eventType}</Badge>
                                </div>
                                <h1 className="text-3xl font-bold text-white text-lg leading-tight line-clamp-3">{event.title}</h1>

                                
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} whileHover={{ y: -2, scale: 1.02 }}>
                            <Card className="p-5 hover:shadow-md transition-all">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Description
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    {event.description.split("\n\n").map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="mb-4 text-muted-foreground leading-relaxed"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                        {event.areaOfInterests.length > 0 && (
                        <motion.div variants={itemVariants} whileHover={{ y: -2, scale: 1.02 }}>
                            <Card className="p-5 hover:shadow-md transition-all">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-primary" />
                                    Areas of interest
                                </h2>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-wrap gap-2"
                                >
                                    {event.areaOfInterests.map((interest) => (
                                        <motion.span
                                            key={interest.id}
                                            variants={itemVariants}
                                            className="text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm bg-muted"
                                        >
                                            <span className="text-primary">{"/> "}</span> {interest.name}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </Card>
                            </motion.div>
                        )}
                    </motion.div>

                  
                    <motion.div variants={containerVariants} className="space-y-6">
                      
                        <motion.div variants={itemVariants} whileHover={{ y: -2, scale: 1.02 }}>
                            <Card className="p-5 hover:shadow-md transition-all">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Info className="w-5 h-5 text-primary" />
                                    Key information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <CalendarDays className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Published at</p>
                                            <p className="font-medium">{formatDate(event.publishedAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Registration deadline
                                            </p>
                                            <p className="font-medium">
                                                {formatDate(event.registrationDeadline)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Status</p>
                                            <p
                                                className={`font-medium ${isRegistrationAvailable
                                                        ? "text-success"
                                                        : "text-destructive"
                                                    }`}
                                            >
                                                {isRegistrationAvailable
                                                    ? "Registration open"
                                                    : "Registration closed"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                     
                        {isRegistrationAvailable && (
                            <motion.div variants={itemVariants}>
                                <Button
                                    onClick={handleJoin}
                                    disabled={loading || userLoading || !user}
                                    className={cn(
                                        "group w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl cursor-pointer flex items-center justify-center gap-2",
                                        !user && "cursor-not-allowed"
                                    )}
                                >
                                    {loading ? (
                                        <>
                                            Joining...
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            Join Event
                                            <motion.div
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                            </motion.div>
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        )}

                        {event.sponsors.length > 0 && (
                            <motion.div variants={itemVariants} whileHover={{ y: -2, scale: 1.02 }}>
                                <Card className="p-5 hover:shadow-md transition-all">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Award className="w-5 h-5 text-primary" />
                                        Sponsors
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {event.sponsors.map((sponsor) => (
                                            <div
                                                key={sponsor.id}
                                                className="rounded-xl border bg-muted/60 px-3 py-2 hover:bg-muted transition-colors w-full"
                                            >
                                                <div className="flex items-center gap-2 text-sm font-medium text-foreground whitespace-nowrap">
                                                    <span className="text-primary">{"/> "}</span> {sponsor.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
