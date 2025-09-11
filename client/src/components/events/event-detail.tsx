"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ArrowLeft, Clock, Users, Award, Tag, FileText, Info } from "lucide-react"
import { joinEventAction } from "@/app/(landingpage)/events/[id]/joinEvent";
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import Link from "next/link"

import { Event  } from "@/types/backendTypes"
import { toast } from "sonner"; 
import { useUser } from "@/hooks/use-user";

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
    const { user, loading: userLoading } = useUser(); 

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    if (!event) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold">Event not found</h2>
                <p className="text-muted-foreground mt-2">
                    {`The event you are looking for doesn't exist or could not be loaded.` }
                </p>
                <Link href="/events">
                    <Button className="mt-4">Back to Events</Button>
                </Link>
            </div>
        );
    }
    const handleJoin = async () => {
        setLoading(true);
        if (!event.id) {
            toast.error("error ");
            return;
        }
        const result = await joinEventAction(event.id);

        if (result.success) {
            toast.success("You successfully joined this event");
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };





  const isRegistrationAvailable = event.registrationOpen && new Date(event.registrationDeadline) > new Date()

    return (

    <div className="container mx-auto py-10 min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/events" className="hover:text-primary transition-colors">
              Events
            </Link>
            <span>{' > '}</span>
            <span className="text-foreground font-medium">{event.title}</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
      
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <img src={event.image.uri} alt={event.title} className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{event.eventType}</Badge>
                </div>
                <h1 className="text-3xl font-bold text-white">{event.title}</h1>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <Card className="p-5 hover:shadow-md transition-all">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Description
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {event.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <Card className="p-5 hover:shadow-md transition-all">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Areas of interest
                </h2>
                <div className="flex flex-wrap gap-2">
                  {event.areaOfInterests.map((interest) => (
                    <span key={interest.id} className="text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm bg-muted ">
                  <span className="text-primary">     {'/> '}</span> {interest.name}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
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
                      <p className="text-sm text-muted-foreground">Registration deadline</p>
                      <p className="font-medium">{formatDate(event.registrationDeadline)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className={`font-medium ${isRegistrationAvailable ? 'text-success' : 'text-destructive'}`}>
                        {isRegistrationAvailable ? "Registration open" : "Registration closed"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {isRegistrationAvailable && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
         

        
                                <Button
                                    onClick={handleJoin}
                                    disabled={loading || !user}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl"
                                >
                                    {loading ? "Joining..." : "Join Event"}
                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                </Button>

      
 
              </motion.div>
            )}

            {event.sponsors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <Card className="p-5 hover:shadow-md transition-all">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Sponsors
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {event.sponsors.map((sponsor) => (
                      <div key={sponsor.id} className="rounded-xl border bg-muted/60 px-3 py-2 hover:bg-muted transition-colors w-full">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground whitespace-nowrap">
                          {'</> '} {sponsor.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
  
    </div>
  )
}
