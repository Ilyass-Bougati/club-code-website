"use client";

import { motion } from "motion/react";
import React from "react";
import { Badge } from "../ui/badge";

export default function MeetTheTeam() {
  return (
    <section className="relative isolate w-full py-20 md:py-32">
      <div className="mx-auto container px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <Badge
              className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
              variant="secondary"
            >
              <span className="text-primary mr-1">✦</span> Meet Our Team
            </Badge>
          </div>
          <h2 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            The people behind the code, design, and magic.
          </h2>
          <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
            We’re a diverse group of developers, designers, and dreamers working
            together to build meaningful experiences. Get to know the team that
            makes it all happen.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
