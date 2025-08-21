import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Code, Lightbulb, Users, Github, BookOpen, Monitor, Handshake } from "lucide-react";
import { Badge } from "../ui/badge";

const activities = [
  {
    title: "Workshops & Bootcamps",
    icon: Code,
    steps: [
      "Hands-on coding sessions (C, Java, Python, Web, AI, etc.).",
      "Mini-projects to practice real-world skills.",
    ],
    description:
      "Learn programming by doing practical projects and applying your skills in real scenarios.",
  },
  {
    title: "Hackathons & Competitions",
    icon: Lightbulb,
    steps: [
      "Solve challenges in teams.",
      "Encourage innovation and problem-solving under time pressure.",
    ],
    description:
      "Enhance creativity and teamwork while tackling real-world coding challenges.",
  },
  {
    title: "Guest Talks & Seminars",
    icon: Users,
    steps: [
      "Invite alumni, professionals, or senior students.",
      "Share career advice, industry insights, and tech trends.",
    ],
    description:
      "Gain insights from experts and learn about the latest trends in technology.",
  },
  {
    title: "Open Source Contributions",
    icon: Github,
    steps: [
      "Collaborate on GitHub projects.",
      "Learn teamwork, version control, and community impact.",
    ],
    description:
      "Contribute to open source, improve coding practices, and make a global impact.",
  },
  {
    title: "Peer Learning & Mentorship",
    icon: BookOpen,
    steps: ["Study groups for courses.", "Senior students mentoring juniors."],
    description:
      "Learn collaboratively and receive guidance from experienced peers.",
  },
  {
    title: "Tech Showcases / Demos",
    icon: Monitor,
    steps: ["Members present their projects.", "Knowledge-sharing within the community."],
    description:
      "Showcase your work and exchange ideas with fellow students.",
  },
  {
    title: "Community Events & Networking",
    icon: Handshake,
    steps: ["Team-building activities.", "Collaborations with other clubs."],
    description:
      "Connect, collaborate, and grow your network within the tech community.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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

export function Activities() {
  

  return (
    <section className="relative w-full py-20 md:py-32 isolate">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0">
          {/* Floating orbs using primary and secondary colors */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl "
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-48 h-48 bg-secondary/15 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 70, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-primary/8 rounded-full blur-3xl"
            animate={{
              x: [0, 120, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Animated floating squares */}
          <motion.div
            className="absolute top-1/6 left-1/5 w-6 h-6 bg-primary/20 rounded-sm"
            animate={{
              rotate: [0, 90, 180, 270, 360],
              x: [0, 50, 0, -30, 0],
              y: [0, -30, 20, 0, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/6 w-8 h-8 bg-secondary/15 rounded-sm"
            animate={{
              rotate: [360, 270, 180, 90, 0],
              x: [0, -40, 0, 60, 0],
              y: [0, 40, -20, 0, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-primary/25 rounded-sm"
            animate={{
              rotate: [0, 180, 360],
              x: [0, 80, -40, 0],
              y: [0, -50, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-2/3 w-4 h-4 bg-secondary/20 rounded-sm"
            animate={{
              rotate: [90, 180, 270, 360, 90],
              x: [0, 70, 0, -50, 0],
              y: [0, 25, -40, 0, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/5 right-1/4 w-7 h-7 bg-primary/15 rounded-sm"
            animate={{
              rotate: [180, 90, 0, 270, 180],
              x: [0, -60, 30, 0, 0],
              y: [0, -35, 45, -10, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Subtle pattern overlay using primary color */}
          <div className="absolute inset-0 opacity-5 " style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-10">
          <div className="mx-auto lg:mx-0">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={container}
               className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
            >
              <motion.div
                variants={item}
                className=" relative flex flex-col items-center gap-4"
              >
                {" "}
                <Badge
                  className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
                  variant="secondary"
                >
                  <span className="text-primary mr-1">✦</span> Our Activities
                </Badge>
              </motion.div>

              <motion.h2
                variants={item}
                className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
              >
                Are designed to inspire creativity
              </motion.h2>
              <motion.p
                variants={item}
                className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed"
              >
                <span className="font-medium text-foreground font-serif">
                  Code
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
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {activities.map((activity, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="group h-full  overflow-hidden bg-gradient-to-b from-card to-card/50 border-border hover:border-primary/20 hover:shadow-lg transition-all border ">
                <CardContent className="flex flex-col p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <activity.icon className="w-10 h-8 p-1 bg-primary/10 text-primary group-hover:bg-primary/20  flex items-center justify-center rounded-full transition-colors duration-300" />
                    <p className="text-xl font-bold text-primary">{activity.title}</p>
                  </div>
                  <ul className="list-none mt-2 space-y-2 text-primary/90">
                    {activity.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckIcon />
                        <p>{step}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="text-primary/70 mt-4 text-sm">{activity.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4 text-primary mt-1 shrink-0"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 2c-.218 0-.432.002-.642.005l-.616.017l-.299.013l-.579.034l-.553.046c-4.785.464-6.732 2.411-7.196 7.196l-.046.553l-.034.579c-.005.098-.01.198-.013.299l-.017.616l-.004.318l-.001.324c0 .218.002.432.005.642l.017.616l.013.299l.034.579l.046.553c.464 4.785 2.411 6.732 7.196 7.196l.553.046l.579.034c.098.005.198.01.299.013l.616.017l.642.005l.642-.005l.616-.017l.299-.013l.579-.034l-.553-.046c-4.785-.464-6.732-2.411-7.196-7.196l-.046-.553l-.034-.579c-.005-.098-.01-.198-.013-.299l-.017-.616l-.005-.642l.005-.642l.017-.616l.013-.299l.034-.579l.046-.553c.464-4.785 2.411-6.732 7.196-7.196l.553-.046l.579-.034a28.058 28.058 0 0 0 .299-.013l.616-.017l.318-.004l.324-.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083.094l-4 4a1 1 0 0 1-1.32.083l-.094-.083l-2-2a1 1 0 0 1 1.32-1.497l.094.083l1.293 1.292l3.293-3.292z"
      fill="currentColor"
      strokeWidth="0"
    />
  </svg>
);