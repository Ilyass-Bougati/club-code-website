"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    Github,
    ArrowRight
} from 'lucide-react';

const SecondFooter = () => {
    const socialLinks = [
        { icon: Twitter, href: '#' },
        { icon: Facebook, href: '#' },
        { icon: Instagram, href: '#' },
        { icon: Linkedin, href: '#' },
        { icon: Youtube, href: '#' },
        { icon: Github, href: '#' }
    ];

    const floatingShapes = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 80 + 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 3
    }));

    return (
        <footer className="relative bg-primary/87 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
                {floatingShapes.map((shape) => (
                    <motion.div
                        key={shape.id}
                        className="absolute rounded-full backdrop-blur-sm bg-secondary"
                        style={{
                            width: shape.size,
                            height: shape.size,
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                        }}
                        animate={{
                            y: [0, -150, 0],
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: shape.duration,
                            delay: shape.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Vertical Wave Animation */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent"
                animate={{
                    y: [-100, 100, -100]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    <div className="lg:col-span-2">
                        <h3 className="text-3xl font-bold text-secondary/90 mb-6">
                            C{"</>"}de
                        </h3>
                        <p className="text-secondary/80 text-lg leading-relaxed mb-8">
                            We inspire students to explore technology, collaborate on projects, and develop practical skills that make an impact.
                            Our club fosters creativity, and learning, .
                        </p>

                        {/* Social media */}
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="group relative w-12 h-12 bg-primary border border-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-secondary hover:border-primary"
                                    >
                                        <IconComponent
                                            size={20}
                                            className="text-secondary group-hover:text-primary transition-colors duration-300"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-semibold text-secondary/90 mb-6">
                            Contact Info
                        </h4>

                        <div className="flex items-center mb-4 group cursor-pointer">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300">
                                <Mail size={18} className="text-secondary group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <span className="text-secondary group-hover:text-secondary/80 transition-colors duration-300">
                                code@gmail.com
                            </span>
                        </div>

                        <div className="flex items-center mb-4 group cursor-pointer">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300">
                                <Phone size={18} className="text-secondary group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <span className="text-secondary group-hover:text-secondary/80 transition-colors duration-300">
                                +212 629291313
                            </span>
                        </div>

                        <div className="flex items-center group cursor-pointer">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300">
                                <MapPin size={18} className="text-secondary group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <span className="text-secondary group-hover:text-secondary/80 transition-colors duration-300">
                                FSTS, Settat<br />
                                Morocco
                            </span>
                        </div>
                    </div>

                    {/*  Links */}
                    <div>
                        <h4 className="text-xl font-semibold text-secondary/90 mb-6">
                            Quick Links
                        </h4>
                        <div className="space-y-3">
                            {['About Code', 'News', 'Events', 'Team'].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="block text-secondary hover:text-secondary/80 transition-all duration-300 group"
                                >
                                    <span className="group-hover:text-secondary/80 transition-colors duration-300 flex items-center">
                                        <ArrowRight className='h-5 w-5 mr-2' />
                                        <p>{link}</p>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-secondary">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-secondary text-sm mb-4 md:mb-0">
                            © 2024 CODE. All rights reserved.
                        </p>

                        <div className="flex space-x-6">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-secondary hover:text-secondary/80 text-sm transition-colors duration-300"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Particles - Vertical Movement */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-secondary rounded-full opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: '100%',
                        }}
                        animate={{
                            y: [-20, -800],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: Math.random() * 4 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </footer>
    );
};

export default SecondFooter;
