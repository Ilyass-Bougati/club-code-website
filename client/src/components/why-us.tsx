import { Card, CardContent } from "@/components/ui/card";
import { Users, Rocket, Code, Trophy, Lightbulb, HeartHandshake } from "lucide-react";

import { motion } from "motion/react";

const features = [
  {
    title: "Hands-on Learning",
    description:
      "Boost your programming skills through practical workshops, coding sessions, and real projects.",
    icon: <Code className="size-5" />,
  },
  {
    title: "Networking & Community",
    description:
      "Meet like-minded students, collaborate on ideas, and build long-lasting friendships in tech.",
    icon: <Users className="size-5" />,
  },
  {
    title: "Career Growth",
    description:
      "Gain mentorship from seniors, alumni, and professionals to strengthen your portfolio and career path.",
    icon: <Rocket className="size-5" />,
  },
  {
    title: "Competitions & Hackathons",
    description:
      "Challenge yourself with hackathons and coding contests to sharpen your problem-solving skills.",
    icon: <Trophy className="size-5" />,
  },
  {
    title: "Innovation & Collaboration",
    description:
      "Work together on exciting ideas, share knowledge, and build impactful solutions as a team.",
    icon: <Lightbulb className="size-5" />,
  },
  {
    title: "Supportive Environment",
    description:
      "Be part of a community that encourages growth, learning, and mutual support at every step.",
    icon: <HeartHandshake className="size-5" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
    const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "300px", transition: { duration: 1 } },
  };

  return (
    <section id="features" className="relative isolate w-full py-10 md:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(from_var(--primary)_r_g_b_/_0.03),transparent_70%)]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mt-10">
                <motion.p
                  className="text-xl leading-relaxed max-w-3xl mx-auto text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Why Join US ?
                </motion.p>
                <motion.div
                  variants={underlineVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-1 bg-gradient-to-l from-primary mt-2"
                  style={{ maxWidth: "150px" }}
                />

              </div>

              <motion.p
                      className="text leading-relaxed max-w-4xl mx-auto text-center mt-2 mb-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      to unlock your potential, connect with passionate innovators, and transform ideas into impactful projects that shape the future of technology.
                    </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="border-border/40 from-card to-card/50 hover:border-primary/20 group h-full overflow-hidden bg-gradient-to-b backdrop-blur transition-all hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-4 flex size-12 items-center justify-center rounded-full transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
                    {feature.title}
                    
                  </h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}