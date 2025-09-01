"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, ArrowLeft, MapPin, Clock, Users, Award, Tag, FileText, Info, CalendarCheck, Code2 } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import events from "@/seed/events.json"
import  RelatedEvents  from "@/components/events/related-events"


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export default function EventDetail() {
  const params = useParams()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const eventId = params.id as string
  const event = events.find(e => e.id === eventId)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const buttonVariant = mounted && resolvedTheme === "dark" ? "secondary" : "default"
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link href="/events">
            <Button>Back to events</Button>
          </Link>
        </div>
      </div>
    )
  }
  
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
              <img
                src={event.image.uri}
                alt={event.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge   variant="secondary">
                    {event.eventType}
                  </Badge>
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
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
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
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                >
                  {event.areaOfInterests.map((interest) => (
                    <motion.span
                      key={interest.id}
                      variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm bg-muted text-foreground">
                        <span className="w-4 h-4 text-primary"> {'/> '}</span>
                        {interest.name}
                      </span>
                    </motion.span>
                  ))}
                </motion.div>
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
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                  className="flex justify-center"
                >
                  <Button className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground inline-flex items-center justify-center gap-3 rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                    </motion.div>
                    <span className="font-semibold text-lg">Join Event</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </motion.div>
                  </Button>
                </motion.div>
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
                      <motion.div
                        key={sponsor.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-xl border bg-muted/60 px-3 py-2 hover:bg-muted transition-colors w-full"
                      >
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground whitespace-nowrap">
                        <span className="w-4 h-4 text-primary"> {'</> '}</span>
                          <span className="truncate">{sponsor.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

          </div>
        </div>
      </div>
      <RelatedEvents currentEventId={eventId}  />

    </div>

  )
}
