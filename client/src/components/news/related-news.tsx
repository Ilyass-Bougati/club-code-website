"use client";

import { News } from "@/types/backendTypes";
import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


interface RelatedNewsProps {
  relatedNews: News[];
  recentNews: News[];
}

export default function RelatedNews({
  relatedNews,
  recentNews,
}: RelatedNewsProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="md:col-span-1 py-12"
    >
      <div className="sticky top-24 space-y-8">
        {/* Related News Section */}
        <Card className="hover:shadow-lg transition-shadow gap-2 duration-200">
          <CardHeader>
            <CardTitle className="font-medium text-xl underline underline-offset-4 text-primary">
              Related News
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {relatedNews.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className={cn(
                    "block   hover:text-primary py-2  transition-colors duration-200",
                    idx !== relatedNews.length - 1 &&
                      "border-b border-muted-foreground hover:border-primary transition-colors duration-300",
                    idx === 0 && "py-0 pb-2"
                  )}
                >
                  <p className="font-medium line-clamp-2">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(item.publishedAt, "MMM dd, yyyy")}
                  </p>
                </Link>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Recent News Section */}
        <Card className="hover:shadow-lg transition-shadow gap-2 duration-200">
          <CardHeader>
            <CardTitle className="font-medium text-xl underline underline-offset-4 text-primary">
              Recent News
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {recentNews.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className={cn(
                    "block  py-2 hover:text-primary  transition-colors duration-200",
                    idx !== recentNews.length - 1 &&
                      "border-b border-muted-foreground hover:border-primary transition-colors duration-300",
                    idx === 0 && "py-0 pb-2"
                  )}
                >
                  <p className="font-medium line-clamp-2">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(item.publishedAt, "MMM dd, yyyy")}
                  </p>
                </Link>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
