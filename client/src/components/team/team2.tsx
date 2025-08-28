"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { officeMembers } from "@/seed/office-members"
import OfficeMemberCard from "./office-member-card"

export default function TeamTreePage2() {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    // Helpers
    const findMember = (position: string) =>
        officeMembers.find((m) => m.position.toLowerCase() === position.toLowerCase())

    const findMembers = (position: string) =>
        officeMembers.filter((m) => m.position.toLowerCase() === position.toLowerCase())

    // Roles
    const president = findMember("president")
    const vp = findMember("vp")
    const consultants = findMembers("consultant")
    const tresor = findMember("tresor")
    const rh = findMember("rh")
    const sg = findMember("sg")
    const media = findMember("media")
    const communication = findMember("communication")
    const frontendDevs = findMembers("frontend dev")
    const backendDevs = findMembers("backend dev")

    if (!president) return null

    if (!hasMounted) {
        return (
            <div className="container mx-auto my-10 min-h-screen flex justify-center items-center">
                <div className="text-lg text-muted-foreground">Loading team structure...</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto my-10 min-h-screen flex justify-center px-4">
            <div className="text-center w-full">
                {/* Title */}
                <motion.h2
                    className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text 
          text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl 
          relative mb-12 inline-block"
                >
                    Meet Our Team
                    <motion.span
                        className="absolute bottom-0 left-0 h-1 rounded-full bg-primary"
                        style={{ width: "100%" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </motion.h2>

                {/* Team */}
                <div className="flex flex-col items-center gap-8">

                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        <OfficeMemberCard member={president} />
                        <OfficeMemberCard member={vp} />
                        <OfficeMemberCard member={tresor} />
                        {consultants.map((c) => (
                            <OfficeMemberCard key={c.id} member={c} />
                        ))}
                    </div>

                    {/* Line */}
                    <motion.div
                        className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        <OfficeMemberCard member={rh} />
                        <OfficeMemberCard member={sg} />
                        <OfficeMemberCard member={communication} />
                        <OfficeMemberCard member={media} />
                    </div>

                    {/* Line */}
                    <motion.div
                        className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        {frontendDevs.map((c) => (
                            <OfficeMemberCard key={c.id} member={c} />
                        ))}
                        {backendDevs.map((c) => (
                            <OfficeMemberCard key={c.id} member={c} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}