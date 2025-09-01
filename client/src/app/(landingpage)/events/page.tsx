// app/events/page.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Newspaper } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import events from "@/seed/events.json"
import { getEventTypeBadgeVariant } from "@/lib/utils"

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

const truncateTitle = (title: string, maxLength: number = 50) => {
  if (title.length <= maxLength) {
    return title
  }
  return title.substring(0, maxLength) + "..."
}

export default function Events() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const subtitle = "Discover what’s happening at CODE Club"

  useEffect(() => {
    setMounted(true)
 
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setTypedText(subtitle.slice(0, i))
      if (i >= subtitle.length) {
        clearInterval(interval)
        setTypingDone(true)
      }
    }, 25)
    return () => clearInterval(interval)
   
  }, [])

  const buttonVariant = mounted && resolvedTheme === "dark" ? "secondary" : "default"
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
  
  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-xl" />
        <div className="relative bg-gradient-to-r from-background/80 via-background/90 to-background/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 text-center">
          <motion.h1
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            initial={false}
          >
            Explore Our Tech Events
          </motion.h1>
          <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-primary/60" />
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {typedText}
          </motion.p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
      {sortedEvents.map((event: any, i: number) => (

          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: typingDone ? 1 : 0, 
              y: typingDone ? 0 : 50, 
              scale: typingDone ? 1 : 0.9 
            }}
            transition={{ 
              duration: 0.6, 
              delay: typingDone ? i * 0.2 : 0,
              ease: "easeOut"
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
                <Badge 
  variant="secondary"
  className="absolute top-3 left-3"
>
  {event.eventType}
</Badge>

               <div className="absolute bottom-3 left-3 z-10 opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                  <Button size="sm" variant={buttonVariant} >Learn More</Button>
                </div>

                </div>
                <CardHeader className="">
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
    </div>
  )
}


