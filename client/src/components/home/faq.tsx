"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { TableOfContents } from "lucide-react";
import { motion } from "motion/react";
import { FaQuestion } from "react-icons/fa";

const faqs = [
  {
    question: "How can I join the CODE club?",
    answer:
      "You can register directly online on our website. Registration opens at the beginning of the academic year. If registrations are closed, a message will be displayed on the dedicated page.",
  },
  {
    question: "Is membership free?",
    answer:
      "Yes, joining the CODE club is completely free. However, some activities or competitions may require a separate registration.",
  },
  {
    question: "What kind of events does the club organize?",
    answer:
      "The club hosts hackathons, programming competitions (ICPC, MCPC), technical training sessions, and workshops on new technologies.",
  },
  {
    question: "Do I need a specific level to join?",
    answer:
      "Not at all 🙂 All motivated students are welcome, whether you are a beginner or advanced. The club offers sessions adapted to different levels.",
  },
  {
    question: "How can I contact the leadership team?",
    answer:
      "You can find the list of board members in the 'Team' section. You can also reach out via the Contact page or through our social media channels.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full py-20 md:py-32 relative isolate  ">
<div
  className="
    absolute inset-0 -z-10
    bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
    bg-[size:20px_20px]
    bg-fixed
    [--pattern-fg:var(--muted)]
  "
/>


      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.8, duration: 1.5 } }}
        viewport={{ once: true }}
        className="absolute top-20 left-10 lg:left-52 -z-10"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-20 h-20 text-primary/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center text-primary">
          <TableOfContents className="w-10 h-10" />

          <div
            className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"
            style={{
              animationDuration: "3s",
              animationDelay: `${1 * 0.5}s`,
            }}
          ></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.8, duration: 1.5 } }}
        viewport={{ once: true }}
        className="absolute bottom-10 right-10 lg:right-52 -z-10"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-20 h-20 text-primary/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center text-primary">
          <FaQuestion className="w-10 h-10" />
          <div
            className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"
            style={{
              animationDuration: "3s",
              animationDelay: `${1 * 0.5}s`,
            }}
          ></div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
            variant="secondary"
          >
            <span className="text-primary mr-1">✦</span> FAQ
          </Badge>
          <h2 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-lg">
            Find answers to the most common questions about the CODE club.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.15 }}
                className="group"
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:underline underline-offset-2 transition-all duration-300 hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
