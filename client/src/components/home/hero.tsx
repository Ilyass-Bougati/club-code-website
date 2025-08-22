"use client";

import { motion } from "motion/react";
import React from "react";
import Spotlight from "@/components/effects/spotlight";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { FlipWords } from "../effects/flip-words";
import { Code2, SquareArrowOutUpRight, Terminal } from "lucide-react";
import {
  Cursor,
  CursorBody,
  CursorMessage,
  CursorPointer,
} from "@/components/ui/cursor";
import Image from "next/image";
import { useTheme } from "next-themes";

const words = ["better", "stronger", "smarter", "creative"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section className="relative isolate container mx-auto w-full py-20 md:py-32 lg:py-40 ">
      {/* Decorative SVGs */}
      <motion.div
        drag
        dragSnapToOrigin
        whileDrag={{ scale: 0.9 }}
        dragMomentum={false} // optional, disables inertia
        dragConstraints={{ top: -100, bottom: 100, left: -200, right: 0 }} // optional
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1, duration: 2 } }}
        className="absolute top-20 left-10 -z-10 md:z-50"
      >
        {/* Rotating circle */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-24 h-24 text-primary/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </motion.svg>

        {/* Cursor on top */}
        <div className="absolute inset-0 left-[120%] top-1/5 flex items-center justify-center">
          <Cursor className=" hidden md:block">
            <CursorPointer />
            <CursorBody>
              <CursorMessage className="text-primary">
                <span className="text-primary mr-1">✦</span> That looks great!
              </CursorMessage>
            </CursorBody>
          </Cursor>
        </div>
        <div
          className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"
          style={{
            animationDuration: "3s",
            animationDelay: `${1 * 0.5}s`,
          }}
        ></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at center, var(--muted), transparent 70%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          opacity: 1,
          transition: { delay: 0.5, duration: 2 },
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="absolute bottom-30 right-20 w-32 h-32 -z-10 cursor-grab md:z-50"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 2, ease: "easeOut", delay: 1 },
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
        }}
        drag
        dragSnapToOrigin
        whileDrag={{ scale: 0.9 }}
        dragMomentum={false} // optional, disables inertia
        dragConstraints={{ top: -100, bottom: 100, left: -200, right: -100 }} // optional
      >
        <defs>
          {/* Glow / Blur filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <polygon
          points="100,20 180,180 20,180"
          fill="currentColor"
          filter="url(#glow)"
          className="text-primary/10"
        />
      </motion.svg>

      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      {/* Spotlight effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Spotlight
          className="top-0 left-0 -translate-x-1/3 -translate-y-1/3 opacity-50"
          fill="white"
        />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="mb-12 flex flex-col items-start md:items-center justify-center space-y-4 text-left md:text-center"
        >
          {/* Badge / Intro */}
          <motion.div
            variants={item}
            className="justify-left relative flex flex-col items-start gap-4"
          >
            <Badge
              className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
              variant="secondary"
            >
              <span className="text-primary mr-1">
                <Code2 size={17} />
              </span>{" "}
              Let&apos;s code together!
            </Badge>
          </motion.div>
          <motion.h1
            variants={item}
            className="  from-foreground via-foreground/90 to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl max-w-5xl"
          >
            Welcome to the{" "}
            <span className="font-serif text-primary  font-light italic inline-flex items-center gap-2">
              CODE club
              <span className="ml-2 inline-flex items-center justify-center gap-2 align-bottom bg-primary/10 rounded-full p-1  bg-gradient-to-br from-primary to-primary/10 text-primary-foreground text-xl font-bold shadow-lg relative">
                {theme === "light" ? (
                  <Image
                    alt=""
                    className="size-8 overflow-hidden rounded-full sm:size-10  md:size-12 lg:size-14"
                    height={56}
                    src={`/icons/favicon-black.svg`}
                    width={56}
                  />
                ) : (
                  <Image
                    alt=""
                    className="size-8 overflow-hidden rounded-full sm:size-10  md:size-12 lg:size-14"
                    height={56}
                    src={`/icons/favicon-black.svg`}
                    width={56}
                  />
                )}{" "}
                <div
                  className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"
                  style={{
                    animationDuration: "3s",
                    animationDelay: `${1 * 0.5}s`,
                  }}
                ></div>
              </span>{" "}
            </span>{" "}
            — learn, create, and innovate
          </motion.h1>

          {/* Description with flip words */}
          <motion.div
            variants={item}
            className="text-muted-foreground mb-8 text-lg leading-relaxed md:text-xl max-w-3xl"
          >
            Join our university{" "}
            <strong className="text-primary  ">code club</strong> for
            <strong className="text-primary"> hackathons</strong>,
            <strong className="text-primary"> competitions</strong>, and
            <strong className="text-primary"> training</strong>. Stay updated on
            <strong className="text-primary"> events</strong>, meet the{" "}
            <strong className="text-primary"> team</strong>, and become a{" "}
            <FlipWords
              className="inline font-semibold text-primary"
              words={words}
            />{" "}
            member.
          </motion.div>

          {/* Animated buttons */}
          <motion.div variants={container} className="flex gap-4 flex-row">
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/events">
                <Button
                  size="lg"
                  className="h-12 rounded-full px-8 text-base shadow-md transition-transform"
                >
                  Browse Events
                  <SquareArrowOutUpRight className="size-4 animate-pulse" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:border-primary/50 h-12 rounded-full px-8 text-base"
                >
                  Learn More
                </Button>
              </a>
            </motion.div>
          </motion.div>
          {/* Animated features list */}
          <motion.div
            variants={container}
            className=" mt-4 flex flex-wrap items-center gap-6 cursor-pointer"
          >
            {[
              "Collaborative Projects",
              "Learn Modern Tech",
              "Hands-on Coding Sessions",
            ].map((text, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <Terminal className="text-primary size-5  animate-pulse" />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle radial backgrounds */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_30%,var(--muted),transparent_35%)] blur-3xl"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_70%,var(--muted),transparent_10%)] blur-3xl"></div>
    </section>
  );
}
