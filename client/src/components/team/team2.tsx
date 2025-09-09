"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import OfficeMemberCard from "./office-member-card"
import { fetchMembers, OfficeMember } from "@/actions/fetchMembers"
import { devs } from "@/seed/office-members"
import { Skeleton } from "../ui/skeleton"

export default function TeamTreePage2() {
    const [hasMounted, setHasMounted] = useState(false)
    const [officeMembers, setOfficeMembers] = useState<OfficeMember[]>([]);

    useEffect(() => {
        fetchMembers().then(setOfficeMembers);
    }, []);

    useEffect(() => {
        setHasMounted(true)
    }, [])

    // Helpers
    const findMember = (position: string) =>
        officeMembers.find((m) => m.position.toLowerCase() === position.toLowerCase())

    const findMembers = (position: string) =>
        officeMembers.filter((m) => m.position.toLowerCase() === position.toLowerCase())

    const findDevs = (position: string) =>
        devs.filter((m) => m.position.toLowerCase() === position.toLowerCase())

    // Roles
    const president = findMember("President")
    const vp = findMember("Vice President")
    const rh = findMember("Human Resources")
    const consultants = findMembers("Consultant")
    const tresor = findMember("Treasury")
    const sg = findMember("Secretary General")
    const devChef = findMember("Chief Development Officer")
    const media = findMember("Chief Media Officer")
    const communication = findMember("Chief Communication Officer")
    const logistic = findMember("Chief Logistics Officer")
    const vRh = findMember("Vice HR")
    const vSg = findMember("Vice SG")
    const vsT = findMember("Vice Treasury")

    //devs
    const front = findDevs("frontend developer")
    const back = findDevs("backend developer")
    const devops = findDevs("devops")

    if (!president) return null

    if (!hasMounted) {
        return (
            <div className="container mx-auto my-10 min-h-screen flex justify-center px-4">
            <div className="text-center w-full">
                {/* Title Skeleton */}
                <div className="mb-12">
                    <Skeleton className="h-12 w-80 mx-auto mb-2" />
                    <Skeleton className="h-1 w-80 mx-auto rounded-full" />
                </div>

                {/* Office Members */}
                <div className="flex flex-col items-center gap-8">

                    {/* Top Level - President, VP, SG, HR, Treasury */}
                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-3 p-4 rounded-lg border bg-card">
                                <Skeleton className="w-20 h-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Connecting Line */}
                    <Skeleton className="w-1 h-12 rounded-full" />

                    {/* Second Level - Vice positions */}
                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-3 p-4 rounded-lg border bg-card">
                                <Skeleton className="w-20 h-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Connecting Line */}
                    <Skeleton className="w-1 h-12 rounded-full" />

                    {/* Third Level - Chiefs */}
                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-3 p-4 rounded-lg border bg-card">
                                <Skeleton className="w-20 h-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Connecting Line */}
                    <Skeleton className="w-1 h-12 rounded-full" />

                    {/* Fourth Level - Consultants */}
                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-3 p-4 rounded-lg border bg-card">
                                <Skeleton className="w-20 h-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Developers Section */}
                <div className="mt-20">
                    {/* Developers Title Skeleton */}
                    <div className="mb-12">
                        <Skeleton className="h-12 w-96 mx-auto mb-2" />
                        <Skeleton className="h-1 w-96 mx-auto rounded-full" />
                    </div>

                    {/* Frontend & DevOps Row */}
                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5 mb-5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-3 p-4 rounded-lg border bg-card">
                                <Skeleton className="w-20 h-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Backend Row */}
                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-3 p-4 rounded-lg border bg-card">
                                <Skeleton className="w-20 h-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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
                    Office Members
                    <motion.span
                        className="absolute bottom-0 left-0 h-1 rounded-full bg-primary"
                        style={{ width: "100%" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </motion.h2>

                {/* Office Members */}
                <div className="flex flex-col items-center gap-8">

                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        <OfficeMemberCard member={president} />
                        <OfficeMemberCard member={vp} />
                        <OfficeMemberCard member={sg} />
                        <OfficeMemberCard member={rh} />
                        <OfficeMemberCard member={tresor} />
                    </div>


                      <motion.div
                        className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        <OfficeMemberCard member={devChef} />
                        <OfficeMemberCard member={logistic} />
                        <OfficeMemberCard member={media} />
                        <OfficeMemberCard member={communication} />
                    </div>

                    {/* Line */}
                    <motion.div
                        className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        <OfficeMemberCard member={vSg} />
                        <OfficeMemberCard member={vRh} />
                        <OfficeMemberCard member={vsT} />
                    </div>

                  

                    {/* Line */}
                    <motion.div
                        className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        {consultants.map((c) => (
                            <OfficeMemberCard key={c.id} member={c} />
                        ))}
                    </div>
                </div>

                {/*Our devs */}
                <motion.h2
                    className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text 
                                text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl 
                                relative mt-20 mb-12 inline-block"
                >
                    Big Thanks to our Developers 
                    <motion.span
                        className="absolute bottom-0 left-0 h-1 rounded-full bg-primary"
                        style={{ width: "100%" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </motion.h2>
                <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5">
                        {front.map((c) => (
                            <OfficeMemberCard key={c.id} member={c} />
                        ))}
                        
                        {devops.map((c) => (
                            <OfficeMemberCard key={c.id} member={c} />
                        ))}
                    </div>
                <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-5 mt-5">
                    {back.map((c) => (
                            <OfficeMemberCard key={c.id} member={c} />
                        ))}
                </div>
            </div>
        </div>
    )
}