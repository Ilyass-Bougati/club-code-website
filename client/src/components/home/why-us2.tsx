"use client"

import React from 'react';
import { motion, TargetAndTransition, Variants } from "framer-motion";
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Code, Users, Trophy, Rocket, Lightbulb, HeartHandshake } from 'lucide-react';


const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

// Single item animation
const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

// Floating motion 
const floatAnimation: TargetAndTransition = {
    y: [0, -10, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

// Rotate animation
const rotateAnimation: TargetAndTransition = {
    rotate: [0, 5, -5, 0],
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
    },
};


const CreativeWhyUs = () => {
    const leftFeatures = [
        {
            title: "Hands-on Learning",
            description: "Boost your programming skills through practical workshops, coding sessions, and real projects.",
            icon: <Code className="w-5 h-5" />,
            color: "from-primary to-secondary"
        },
        {
            title: "Networking & Community",
            description: "Meet like-minded students, collaborate on ideas, and build long-lasting friendships in tech.",
            icon: <Users className="w-5 h-5" />,
            color: "from-primary to-secondary"
        },
        {
            title: "Career Growth",
            description: "Gain mentorship from seniors, alumni, and professionals to strengthen your portfolio and career path.",
            icon: <Rocket className="w-5 h-5" />,
            color: "from-primary to-secondary"
        },
    ];

    const rightFeatures = [
        {
            title: "Competitions & Hackathons",
            description: "Challenge yourself with hackathons and coding contests to sharpen your problem-solving skills.",
            icon: <Trophy className="w-5 h-5" />,
            color: "from-primary to-secondary"
        },
        {
            title: "Innovation & Collaboration",
            description: "Work together on exciting ideas, share knowledge, and build impactful solutions as a team.",
            icon: <Lightbulb className="w-5 h-5" />,
            color: "from-primary to-secondary"
        },
        {
            title: "Supportive Environment",
            description: "Be part of a community that encourages growth, learning, and mutual support at every step.",
            icon: <HeartHandshake className="w-5 h-5" />,
            color: "from-primary to-secondary"
        },
    ];


    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center py-16 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-l from-secondary/20 to-primary/20 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="mx-auto lg:mx-0 mb-10">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={container}
                    className=" relative flex flex-col items-center gap-6"
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
                            <span className="text-primary mr-1">✦</span> Join Us
                        </Badge>
                    </motion.div>

                    <motion.h2
                        variants={item}
                        className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent"
                    >
                        Why you should to be one of CODE ?
                    </motion.h2>
                    <motion.p
                        variants={item}
                        className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed"
                    >
                        <span className="font-medium text-foreground font-serif">
                            Code
                        </span>
                        {"  "}
                        is a student-driven club{" "}
                        <span className="font-medium text-foreground">
                            ocused on skill-building, collaboration, and real-world projects.
                        </span>{" "}

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


            <div className="relative w-full max-w-7xl mx-auto px-4 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                    {/* Left Column Cards */}
                    <motion.div
                        className="space-y-6"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {leftFeatures.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={item}
                                className="group relative"
                                whileHover={{ x: 10, transition: { duration: 0.3 } }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity duration-300`}></div>
                                <div className="relative bg-secondary  backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Center Column  */}
                    <motion.div
                        className="relative flex flex-col items-center space-y-12 py-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >

                        <motion.div
                            className="w-48 h-48 relative"
                            animate={floatAnimation}
                        >
                            {/* Floating background blur */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>

                            {/* Image Coder*/}
                            <div className="relative  w-full h-full  rounded-3xl  ">
                                <Image
                                    src="/about.svg"
                                    alt="About"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>

                        {/* Line */}
                        <motion.div
                            className="w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full"
                            animate={{ scaleY: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>

                        <motion.div
                            className="w-48 h-48 relative"
                            animate={rotateAnimation}
                        >
                            {/* Floating background blur */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-xl"></div>

                            <div className="relative w-full h-full  rounded-3xl   ">
                                <Image
                                    src="/student.svg"
                                    alt="Student"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>

                    </motion.div>

                    {/* Right Cards */}
                    <motion.div
                        className="space-y-6"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {rightFeatures.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={item}
                                className="group relative"
                                whileHover={{ x: -10, transition: { duration: 0.3 } }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-l ${feature.color} opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity duration-300`}></div>
                                <div className="relative bg-secondary  backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <div className="flex justify-end mb-4">
                                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-l ${feature.color} text-white mb-4 ml-auto `}>
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2 text-right">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed text-right">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Floating accent elements */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full"
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            ></motion.div>
            <motion.div
                className="absolute top-3/4 right-1/4 w-2 h-2 bg-secondary rounded-full"
                animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            ></motion.div>
            <motion.div
                className="absolute top-1/2 left-1/6 w-1 h-1 bg-primary rounded-full"
                animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            ></motion.div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </section>
    );
};

export default CreativeWhyUs;