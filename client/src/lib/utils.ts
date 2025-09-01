import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Mappe le type d'événement à la variante de badge appropriée selon le thème
 */
export function getEventTypeBadgeVariant(eventType: string): "default" | "secondary" | "destructive" | "outline" | "success" | "info" | "warning" {
  const type = eventType.toLowerCase()
  
  // Événements de formation et apprentissage
  if (type.includes("workshop") || type.includes("training") || type.includes("course")) {
    return "info"
  }
  
  // Événements de compétition et hackathon
  if (type.includes("hackathon") || type.includes("competition") || type.includes("contest")) {
    return "warning"
  }
  
  // Événements de networking et conférence
  if (type.includes("conference") || type.includes("meetup") || type.includes("networking")) {
    return "success"
  }
  
  // Événements de projet et collaboration
  if (type.includes("project") || type.includes("collaboration") || type.includes("team")) {
    return "secondary"
  }
  
  // Par défaut
  return "default"
}
