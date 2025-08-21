"use client";

import { Sparkles, Mail, Linkedin, Instagram, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function Footer() {
  return (
    <footer className="bg-white text-black dark:bg-zinc-900 dark:text-white border-t border-gray-200 dark:border-gray-800 py-16">
      <motion.div
        className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerStagger}
      >
      
        <motion.div
          variants={fadeUp}
          custom={0}
          className="flex flex-col gap-4 p-6 rounded-xl 
                     bg-gray-100 text-black dark:bg-black dark:text-white
                     transition-all duration-300 ease-in-out
                     hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-black dark:text-white animate-pulse" />
              <span className="text-2xl font-bold">CodeClub</span>
            </div>
          
          </div>
          <p className="text-sm opacity-80">
            Idea proposed by students of the Engineering cycle in Computer Science at FST Settat.
          </p>
        </motion.div>

        {/* Bloc Contacts */}
        <motion.div variants={fadeUp} custom={1} className="flex flex-col gap-4">
          {[
            {
              icon: <Mail className="h-5 w-5 text-blue-400" />,
              label: "Email",
            },
            {
              icon: <Phone className="h-5 w-5 text-green-400" />,
              label: "+212 6 00 00 00 00",
            },
            {
              icon: <Linkedin className="h-5 w-5 text-blue-500" />,
              label: "LinkedIn",
              link: "https://www.linkedin.com/company/code-club-of-development-enthusiasts/",
            },
            {
              icon: <Instagram className="h-5 w-5 text-pink-500" />,
              label: "Instagram",
              link: "https://www.instagram.com/code.club12/",
            },
            {
              icon: <MapPin className="h-5 w-5 text-red-500" />,
              label: "FST Settat",
              link: "https://maps.google.com/?q=FST+Settat+Morocco",
            },
          ].map((contact, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              custom={idx}
              className="flex flex-col gap-1 p-4 rounded-xl 
                         bg-gray-100 text-black dark:bg-black dark:text-white
                         transition-all duration-300 ease-in-out
                         hover:scale-105"
            >
              <div className="flex items-center gap-3">
                {contact.icon}
                {contact.link ? (
                  <Link
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {contact.label}
                  </Link>
                ) : (
                  <span>{contact.label}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bloc Formulaire */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="flex flex-col gap-4 p-6 rounded-xl 
                     bg-gray-100 text-black dark:bg-black dark:text-white
                     transition-all duration-300 ease-in-out
                     hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded bg-white text-black placeholder-gray-500 
                         dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400
                         border border-gray-300 dark:border-gray-700 
                         focus:border-blue-500 outline-none transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded bg-white text-black placeholder-gray-500 
                         dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400
                         border border-gray-300 dark:border-gray-700 
                         focus:border-blue-500 outline-none transition"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="p-3 rounded bg-white text-black placeholder-gray-500 
                         dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400
                         border border-gray-300 dark:border-gray-700 
                         focus:border-blue-500 outline-none transition resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white dark:bg-white dark:text-black 
                         px-6 py-3 rounded-2xl transition-all duration-300 ease-in-out
                         font-semibold flex items-center justify-center 
                         hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Send Message
              <Mail className="h-5 w-5 ml-2" />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400"
      >
        © {new Date().getFullYear()} CodeClub. All rights reserved.
      </motion.div>
    </footer>
  );
}
