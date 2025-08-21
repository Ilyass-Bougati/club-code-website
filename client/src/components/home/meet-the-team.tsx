"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { members } from "@/data";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";

const firstHalf = members.slice(0, Math.ceil(members.length / 2));
const secondHalf = members.slice(Math.ceil(members.length / 2));

export default function MeetTheTeam() {
  return (
    <section
      id="meet-the-team"
      className="w-full py-20 md:py-32  relative overflow-hidden  isolate"
    >

      
       
  
      <div className="container mx-auto px-4 md:px-6 relative">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
            variant="secondary"
          >
            <span className="mr-1 text-primary">✦</span> Our Leadership Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Meet the people driving the club forward
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            A diverse team of passionate students making things happen — from
            events to training and beyond.
          </p>
        </motion.div>

        {/* <div className="relative mx-auto grid  divide-x divide-y divide-foreground border border-foreground *:p-12 sm:grid-cols-2 lg:grid-cols-3 ">
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center space-y-4 "
            >
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary shadow-lg">
                  <AvatarImage src={member.avatar} alt={member.author} />
                  <AvatarFallback>{member.fallback}</AvatarFallback>
                </Avatar>
                <div
                  className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"
                  style={{
                    animationDuration: "3s",
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold">{member.author}</h3>
              <p className="text-muted-foreground">{member.shortBio}</p>
            </motion.div>
          ))}
        </div>*/}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5 size-full items-center justify-center "
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 w-full items-center justify-center"
          >
            <Marquee>
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
              <MarqueeContent speed={30}>
                {firstHalf.map((member, index) => (
                  <MarqueeItem
                    key={index}
                    className="flex flex-col items-center gap-2 transform transition-transform duration-300  cursor-pointer"
                  >
                    <a
                      href={member.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group"
                    >
                      <Avatar className="size-20 md:size-40 border-2 border-primary shadow-lg">
                        <AvatarImage src={member.avatar} alt={member.author} />
                        <AvatarFallback className="text-4xl  lg:text-7xl">{member.fallback}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-sm font-semibold text-center transition-all duration-300  group-hover:underline underline-offset-2">
                        {member.author}
                      </h3>
                      <p className="text-xs text-muted-foreground text-center">
                        {member.role}
                      </p>
                    </a>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>

            <Marquee>
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
              <MarqueeContent speed={30} direction="right">
                {secondHalf.map((member, index) => (
                  <MarqueeItem
                    key={index}
                    className="flex flex-col items-center gap-2 transform transition-transform duration-300 "
                  >
                    <a
                      href={member.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group"
                    >
                      <Avatar className="size-20 md:size-40 border-2 border-primary shadow-lg">
                        <AvatarImage src={member.avatar} alt={member.author} />
                        <AvatarFallback>{member.fallback}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-sm font-semibold text-center transition-all duration-300  group-hover:underline underline-offset-2">
                        {member.author}
                      </h3>
                      <p className="text-xs text-muted-foreground text-center">
                        {member.role}
                      </p>
                    </a>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
