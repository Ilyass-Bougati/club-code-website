"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  ArrowRight,
  SquareArrowOutUpRight,
} from "lucide-react";
import Logo from "../layouts/logo";
import Link from "next/link";

// ✅ Define types
interface FloatingShape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface Particle {
  id: number;
  left: number;
  duration: number;
  delay: number;
}

export const navLinks = [
  {
    name: "helo_",
    href: "/",
  },
  {
    name: "News",
    href: "/news",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Team",
    href: "/team",
  },
];

const SecondFooter = () => {
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random shapes
    const shapes: FloatingShape[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 80 + 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 3,
    }));
    setFloatingShapes(shapes);

    // Generate random particles
    const parts: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
    setParticles(parts);
  }, []);

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Github, href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-background/95 w-full border-t backdrop-blur-sm">
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
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vertical Wave Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent"
        animate={{ y: [-100, 100, -100] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative container mx-auto flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo + Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <motion.div
                className="flex items-center  gap-2 font-bold "
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Logo />
              </motion.div>
            </Link>
            <p className="text-lg leading-relaxed mb-8">
              We inspire students to explore technology, collaborate on
              projects, and develop practical skills that make an impact. Our
              club fosters creativity and learning.
            </p>

            {/* Social media */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="group relative w-12 h-12 bg-primary border border-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-secondary hover:border-primary"
                  >
                    <IconComponent
                      size={20}
                      className="group-hover:text-primary transition-colors duration-300"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>

            <div className="flex items-center mb-4 group cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300">
                <Mail
                  size={18}
                  className="group-hover:text-primary transition-colors duration-300"
                />
              </div>
              <span className="transition-colors duration-300">
                code@gmail.com
              </span>
            </div>

            <div className="flex items-center mb-4 group cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300">
                <Phone
                  size={18}
                  className="group-hover:text-primary transition-colors duration-300"
                />
              </div>
              <span className="transition-colors duration-300">
                +212 629291313
              </span>
            </div>

            <div className="flex items-center group cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300">
                <MapPin
                  size={18}
                  className="group-hover:text-primary transition-colors duration-300"
                />
              </div>
              <span className="transition-colors duration-300">
                FSTS, Settat
                <br />
                Morocco
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              {navLinks.map(({ name, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="flex items-center mb-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300">
                    <SquareArrowOutUpRight className="h-5 w-5 " />
                  </div>
                  <span className="transition-colors duration-300">{name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className=" pt-8 border-t border-secondary">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © 2025 CODE. All rights reserved.
            </p>

            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                    className="hover:text-primary text-sm transition-colors duration-300"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-secondary rounded-full opacity-40"
            style={{ left: `${p.left}%`, top: "100%" }}
            animate={{ y: [-20, -800], opacity: [0, 0.6, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default SecondFooter;
