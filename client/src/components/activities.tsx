import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Code, Lightbulb, Users, Github, BookOpen, Monitor, Handshake } from "lucide-react";

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

export function Activities() {
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "150px", transition: { duration: 1 } },
  };

  return (
    <section className="relative w-full py-10 md:py-20">
      <div className="flex flex-col items-center mt-10">
        <motion.p
          className="text-xl leading-relaxed max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Our Activities
        </motion.p>
        <motion.div
          variants={underlineVariants}
          initial="hidden"
          animate="visible"
          className="h-1 bg-gradient-to-l from-primary mt-2"
        />
      </div>

      <motion.p
        className="text leading-relaxed max-w-4xl mx-auto text-center mt-2 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Our activities are designed to inspire creativity, enhance technical skills, and encourage teamwork through hands-on projects, workshops, and collaborative challenges.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
                  <activity.icon className="w-7 h-7 text-secondary rounded-full bg-primary p-1" />
                  <p className="text-xl font-bold text-white">{activity.title}</p>
                </div>
                <ul className="list-none mt-2 space-y-2 text-neutral-200">
                  {activity.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon />
                      <p>{step}</p>
                    </li>
                  ))}
                </ul>
                <p className="text-neutral-300 mt-4 text-sm">{activity.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
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
      d="M12 2c-.218 0-.432.002-.642.005l-.616.017l-.299.013l-.579.034l-.553.046c-4.785.464-6.732 2.411-7.196 7.196l-.046.553l-.034.579c-.005.098-.01.198-.013.299l-.017.616l-.004.318l-.001.324c0 .218.002.432.005.642l.017.616l.013.299l.034.579l.046.553c.464 4.785 2.411 6.732 7.196 7.196l.553.046l.579.034c.098.005.198.01.299.013l.616.017l.642.005l.642-.005l.616-.017l.299-.013l.579-.034l.553-.046c4.785-.464 6.732-2.411 7.196-7.196l.046-.553l.034-.579c.005-.098.01-.198.013-.299l.017-.616l.005-.642l-.005-.642l-.017-.616l-.013-.299l-.034-.579l-.046-.553c-.464-4.785-2.411-6.732-7.196-7.196l-.553-.046l-.579-.034a28.058 28.058 0 0 0-.299-.013l-.616-.017l-.318-.004l-.324-.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083.094l-4 4a1 1 0 0 1-1.32.083l-.094-.083l-2-2a1 1 0 0 1 1.32-1.497l.094.083l1.293 1.292l3.293-3.292z"
      fill="currentColor"
      strokeWidth="0"
    />
  </svg>
);
