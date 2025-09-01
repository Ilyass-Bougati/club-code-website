"use client";

import NewsCard from "@/components/news/news-card";
import { news } from "@/seed/news";
import { motion } from "motion/react";
import React from "react";
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
export default function NewsPage() {
  return (
    <main className="w-full flex-1 container mx-auto">
      {/* Hero Section */}
      <div className="relative bg-primary bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          {/* Title */}
          <h2 className=" text-primary-foreground  text-3xl md:text-5xl font-bold ">
            Stay Updated with the Code Club
          </h2>

          {/* Subtitle */}
          <p className="text-primary-foreground/80 max-w-[700px] md:text-lg">
            Check out the latest events, competitions, and announcements from
            our university club.
          </p>
        </motion.div>
      </div>

      {/* News Grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={container}
        viewport={{ once: true }}
        className="px-4 md:px-6 grid py-8 sm:py-12 md:py-16 gap-6 md:gap-8"
      >
        {news && news.length > 0 ? (
          news.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              variants={itemMotion}
            >
              <NewsCard news={item} />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news available at the moment.</p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
