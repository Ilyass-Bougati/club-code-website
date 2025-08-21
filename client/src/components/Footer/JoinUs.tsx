"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export function JoinUs() {
  return (
    <section
      id="join-us"
      className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden isolate"
    >
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-foreground/15 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-24 -right-24 w-64 h-64 bg-foreground/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={container}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight relative  "
          >
            Ready to Join the{" "}
            <span className=" bg-primary-foreground text-primary px-1.5 font-serif italic ">
              CODE
            </span>{" "}
            club?
            <div className="absolute -top-8 right-28 w-16 h-16 border-2 border-primary-foreground/30 rounded-full animate-ping"></div>
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl"
          >
            Share your ideas, learn from your peers, and work on{" "}
            <span className="font-semibold">real programming projects</span>.
            The CODE Club is a community of students passionate about tech,
            innovation, and collaboration.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-4 md:px-12 px-8 md:py-6 py-4 bg-primary-foreground text-primary rounded-full font-bold text-lg hover:scale-105 transition-all duration-300"
            >
              <span>JOIN THE CLUB TODAY</span>
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>

          <motion.p
            variants={item}
            className="text-sm text-primary-foreground/80 mt-4"
          >
            Open to all students. Free to join. No prior experience required.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
