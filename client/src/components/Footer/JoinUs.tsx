"use client";

import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export function JoinUs() {
  const router = useRouter();
  const goToLogin = () => router.push("/login");

  return (
    <section id="join" className="py-24 bg-black text-white relative overflow-hidden">
     
      <div className="absolute inset-0  opacity-60 animate-pulse" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerStagger}
        >
        
          <motion.h3
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Join us now
          </motion.h3>

          <motion.p
            variants={fadeInUp}
            className="mt-4 text-gray-300 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          >
            Be part of our community and start your journey today.
          </motion.p>

       
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Button
                size="lg"
                onClick={goToLogin} 
                className="rounded-3xl relative overflow-hidden bg-white
                           text-black px-12 py-5 text-lg font-bold shadow-white/50 
                           transition duration-500 hover:shadow-white/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-transparent opacity-20 animate-pulse" />
                <span className="relative flex items-center gap-3">
                  Get Started
                  <Rocket className="h-6 w-6 text-black animate-bounce" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
