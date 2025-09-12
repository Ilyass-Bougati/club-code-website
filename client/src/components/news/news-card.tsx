"use client";

import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { type News } from "@/types/backendTypes";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
export default function NewsCard({ news }: { news: News }) {
  // Vérification de sécurité pour éviter les erreurs de rendu
  if (!news || !news.title || !news.type) {
    return (
      <Card className="shadow-xs">
        <CardContent className="p-6">
          <p className="text-muted-foreground">News data not available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Card className="shadow-xs">
        <CardContent className="flex flex-col md:grid md:grid-cols-6 md:divide-x-2 divide-foreground gap-6 ">
          <div className="md:col-span-2 xl:col-span-1">
            <h1 className="font-bold md:mt-1">{news.type || "Unknown"}</h1>
            <p className="text-muted-foreground">
              {news.publishedAt ? format(news.publishedAt, "MMM dd, yyyy") : "Date not available"}
            </p>
          </div>
          <div className="md:col-span-4 xl:col-span-5">
            <Link href={`/news/${news.id}`} className="group">
              <h1 className="text-2xl mb-2 font-medium  transition-colors duration-200  hover:text-primary/90 break-all">
                {news.title}
              </h1>
            </Link>
            <p className="text-base text-muted-foreground line-clamp-3 md:line-clamp-2  leading-relaxed break-all">
              {news.description}
            </p>
            <Link
              href={`/news/${news.id}`}
              className="inline-flex items-center gap-2 mt-4 text-primary font-medium transition-all duration-200 hover:gap-3 hover:text-primary/90 hover:underline"
            >
              Learn More <ArrowRight size={18} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
