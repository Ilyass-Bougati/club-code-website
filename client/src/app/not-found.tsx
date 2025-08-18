"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-background flex min-h-screen flex-col items-center justify-center px-4"
    >
      <span className="text-muted-foreground mb-6 text-[6rem] leading-none font-extrabold select-none">
        404
      </span>
      <h1 className="text-foreground mb-2 text-3xl font-bold">
        Oops, Lost in Space?
      </h1>
      <p className="text-muted-foreground mb-4 max-w-lg text-center text-lg">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary/80 mb-10 rounded-md px-6 py-2 font-semibold shadow transition-colors"
      >
        Back to Home
      </Link>
    </motion.div>
  );
}
