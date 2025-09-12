"use client";

import { motion } from "motion/react";
import React from "react";
import { News } from "@/types/backendTypes";
import NewsCard from "./news-card";
import { Newspaper } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0 },
};

interface NewsSectionProps {
  news: News[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <>
      <div className="relative bg-primary bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <h2 className="text-primary-foreground text-3xl md:text-5xl font-bold">
            Stay Updated with the Code Club
          </h2>
          <p className="text-primary-foreground/80 max-w-[700px] md:text-lg">
            Check out the latest events, competitions, and announcements from
            our university club.
          </p>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={container}
        viewport={{ once: true }}
        className="px-4 md:px-6 grid py-8 sm:py-12 md:py-16 gap-6 md:gap-8"
      >
        {news && news.length > 0 ? (
          news.map((item: News, idx: number) => (
            <motion.div key={item.id || idx} variants={itemMotion}>
              <NewsCard news={item} />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center text-center py-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Newspaper className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              No news available at the moment.
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
