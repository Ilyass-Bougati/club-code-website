"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/mode-toggle";
import { FaUserPlus, FaLock } from "react-icons/fa";
import Logo from "./logo";
import { useRegistrationStatus } from "@/hooks/use-registration-status";
import { Loading } from "../loading";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isRegistrationOpen, loading } = useRegistrationStatus();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-lg border-b",
        isScrolled ? "bg-background/90 shadow-xs" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          href="/"
          className="md:border-r md:px-6 px-4 py-4 text-foreground md:w-[268px] lg:w-[286px] shrink-0 transition-colors"
        >
          <motion.div
            className="flex items-center gap-2 font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Logo />
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden h-full md:flex items-center justify-center capitalize">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
            >
              <Link
                href={link.href}
                className={cn(
                  "font-medium text-foreground transition-colors hover:text-primary relative group border-r h-full w-full block py-4 px-5",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                    pathname === link.href && "w-full"
                  )}
                ></span>
              </Link>
            </motion.div>
          ))}

          {/* Register button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            {loading ? (
               <Loading />
            ) : isRegistrationOpen ? (
              <Link
                href="/register"
                className="font-medium text-foreground transition-colors hover:text-primary relative group border-r h-full w-full flex items-center gap-2 py-4 px-5"
              >
                <FaUserPlus className="size-5 animate-pulse text-primary" />
                Register
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ) : (
              <div className="font-medium text-muted-foreground relative border-r h-full w-full flex items-center gap-2 py-4 px-5 opacity-70 cursor-not-allowed">
                <FaLock className="size-5" />
                Closed
              </div>
            )}
          </motion.div>

          {/* Theme toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <ModeToggle />
          </motion.div>
        </div>

        {/* Mobile nav toggle */}
        <div className="flex items-center gap-4 md:hidden px-4 md:px-6">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-14 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container mx-auto py-4 flex flex-col gap-4 px-4 capitalize">
              {navLinks.map((item, i) => (
                <motion.a
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-medium flex items-center gap-2 relative overflow-hidden group border-b box-border/30 pb-5"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="pt-2 mt-2"
              >
                {loading ? (
                  <Button
                    disabled
                    className="w-full justify-center gap-2 rounded-full opacity-70"
                  >
                    <Loading />
                  </Button>
                ) : isRegistrationOpen ? (
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full justify-center gap-2 rounded-full">
                      <FaUserPlus className="size-5 animate-pulse" />
                      Register
                    </Button>
                  </Link>
                ) : (
                  <Button
                    disabled
                    className="w-full justify-center gap-2 rounded-full opacity-70 cursor-not-allowed"
                  >
                    <FaLock className="size-5" />
                    Closed
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export const navLinks = [
  { name: "helo_", href: "/" },
  { name: "News", href: "/news" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
];
