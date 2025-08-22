"use client";

import { motion } from "motion/react";
import React from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Code, Rocket, Sparkles, Terminal, Users } from "lucide-react";
import { Ripple } from "../effects/ripple";

const cards = [
  {
    title: "C",
    desc: "Coding workshops and hands-on projects to boost your programming skills.",
    icon: Code,
  },
  {
    title: "O",
    desc: "Opportunities to collaborate in hackathons, competitions, and team projects.",
    icon: Users,
  },
  {
    title: "D",
    desc: "Development guidance from senior students, mentors, and alumni.",
    icon: Rocket,
  },
  {
    title: "E",
    desc: "Engaging events and community activities to connect with other tech enthusiasts.",
    icon: Sparkles,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section
      id="about"
      className="bg-muted/35 relative isolate w-full overflow-hidden pt-20 md:pt-32"
    >
      <div className="relative isolate">
        <div className="relative z-10 container mx-auto w-full px-4 md:px-6">
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
                className="justify-left relative flex flex-col items-start gap-4"
              >
                <motion.div
                  variants={item}
                  className="justify-left relative flex flex-col items-start gap-4"
                >
                  {" "}
                  <Badge
                    className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
                    variant="secondary"
                  >
                    <span className="text-primary mr-1">✦</span> About CODE
                  </Badge>
                </motion.div>

                <motion.h2
                  variants={item}
                  className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent"
                >
                  A university club for coding & collaboration
                </motion.h2>
                <motion.p
                  variants={item}
                  className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed"
                >
                  <span className="font-medium text-foreground font-serif">
                    CODE
                  </span>
                  {"  "}
                  is a student-driven club dedicated to nurturing programming
                  skills, promoting collaboration, and building real-world
                  projects. We organize{" "}
                  <span className="font-medium text-foreground">
                    workshops, hackathons, and mentorship programs
                  </span>{" "}
                  to empower students and help them grow in the world of
                  technology.
                </motion.p>
                <motion.div
                  variants={container}
                  className="flex flex-wrap items-center gap-6"
                >
                  {["Workshops", "Hackathons", "Mentorship"].map((feature) => (
                    <motion.div
                      variants={item}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      key={feature}
                      className="text-muted-foreground flex items-center gap-2 text-base font-medium cursor-pointer"
                    >
                      <Terminal className="text-primary size-6" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  className="absolute inset-0 pointer-events-none z-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                  }}
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 70%, oklch(0.44 0 0), transparent 30%)",
                    filter: "blur(80px)",
                    mixBlendMode: "screen",
                  }}
                />
              </motion.div>
            </div>

            <div className="relative hidden md:flex items-center justify-center">
              <motion.img
                variants={item}
                src="/about.svg"
                alt="About illustration"
                className="w-[90%] max-w-[500px] object-contain drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                  transition: {
                    y:{
                      duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    }
                  },
                }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotate: 3,
                  transition: { type: "spring", stiffness: 250 },
                }}
                whileTap={{ scale: 0.97 }}
              />
              <Ripple />
            </div>
          </div>
        </div>

        <div className="relative mt-16 mx-auto grid divide-x divide-y divide-foreground/50 border-y border-foreground/50 sm:grid-cols-2 lg:grid-cols-4 container  w-full ">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 + 0.5 }}
              className="relative z-10 flex flex-col items-center text-center space-y-4 p-10 
                 transition-all duration-300 hover:shadow-xl hover:bg-muted/30"
            >
              <div
                className="flex items-center justify-center w-16 h-16 rounded-2xl 
                      bg-gradient-to-tr from-primary/20 via-primary/10 to-primary/30 
                      text-primary shadow-md"
              >
                <card.icon className="size-8" />
              </div>

              <h3
                className="text-3xl font-extrabold tracking-wider capitalize 
                   bg-gradient-to-r from-primary to-foreground 
                   bg-clip-text text-transparent drop-shadow-sm font-serif"
              >
                {card.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          className={cn(
            "-skew-12 mask-b-from-60% mask-l-from-40% mask-l-to-75%",
            "absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(from_var(--primary)_r_g_b_/_0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--primary)_r_g_b_/_0.25)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"
          )}
        />

        {/* Top Right - Primary */}
        <div
          className={cn(
            "-skew-12 animate-pulse [mask-composite:intersect]",
            "absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(from_var(--primary)_r_g_b_/_0.20)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--primary)_r_g_b_/_0.20)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]",
            "[mask-image:linear-gradient(to_bottom,transparent_0%,transparent_25%,#000_25%,#000_50%,transparent_50%),linear-gradient(to_right,transparent_0%,transparent_50%,#000_50%,#000_100%)]"
          )}
        />

        {/* Bottom Left - Muted */}
        <div
          className={cn(
            "-skew-12",
            "absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(from_var(--muted)_r_g_b_/_0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted)_r_g_b_/_0.25)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]",
            "[mask-image:linear-gradient(to_bottom,transparent_0%,transparent_50%,#000_50%,#000_75%,transparent_75%),linear-gradient(to_right,#000_0%,#000_50%,transparent_50%)]",
            "[mask-composite:intersect]"
          )}
        />
        {/* ----- Background effects ----- */}
      </div>
    </section>
  );
}
