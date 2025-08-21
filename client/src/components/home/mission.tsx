import React from 'react'
import { HoverEffect } from '../ui/card-hover-effect';
import { motion } from 'framer-motion';

const Mission = () => {

    const underlineVariants = {
        hidden: { width: 0 },
        visible: { width: "300px", transition: { duration: 1 } },
    };

    const missions = [
        {
            title: "Learning",
            description:
                "Provide workshops, tutorials, and coding challenges for all skill levels.",
        },
        {
            title: "Collaboration",
            description:
                "Encourage teamwork through hackathons, group projects, and study sessions.",
        },
        {
            title: "Mentorship",
            description:
                "Connect students with seniors and alumni for guidance and career advice.",
        },
        {
            title: "Innovation",
            description:
                "Promote creativity and problem-solving through real-world projects.",
        },

    ];

  return (
    <div>
        <div className='flex flex-col items-center mt-20'>
                <motion.p
                    className="text-xl leading-relaxed max-w-3xl mx-auto text-center "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Our Mission

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
                className="text leading-relaxed max-w-4xl mx-auto text-center mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                is to empower students to learn, experiment, and collaborate in technology
            </motion.p>

            <div className=" mx-auto ">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.4 }}                >
                    <HoverEffect items={missions} />
                </motion.div>
            </div>
    </div>
  )
}

export default Mission