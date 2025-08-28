"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { officeMembers } from "@/seed/office-members"
import OfficeMemberCard from "./office-member-card"

// Dynamically import the organizational chart with no SSR
const Tree = dynamic(() => import("react-organizational-chart").then(mod => ({ default: mod.Tree })), {
  ssr: false,
  loading: () => <div className="flex justify-center p-8">Loading chart...</div>
});

const TreeNode = dynamic(() => import("react-organizational-chart").then(mod => ({ default: mod.TreeNode })), {
  ssr: false
});

export default function TeamTreePage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Helpers
  const findMember = (position: string) =>
    officeMembers.find((m) => m.position.toLowerCase() === position.toLowerCase())

  const findMembers = (position: string) =>
    officeMembers.filter((m) => m.position.toLowerCase() === position.toLowerCase())

  // Main roles
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
  const projectManager = findMember("project manager")

  if (!president) return null

  if (!hasMounted) {
    return (
      <div className="container mx-auto my-10 min-h-screen flex justify-center items-center">
        <div className="text-lg text-muted-foreground">Loading team structure...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 min-h-screen flex justify-center">
      <div className="text-center">
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

        {/* Org Tree */}
        <Tree
          lineWidth="2px"
          lineColor="#6366f1"
          lineBorderRadius="10px"
          label={
            <div className="flex justify-center gap-5">
              <OfficeMemberCard member={president} />
              <OfficeMemberCard member={vp} />
              <OfficeMemberCard member={president} />
              <OfficeMemberCard member={vp} />
            </div>
          }
        >
          {/* VP + Media + Comms */}
          {vp && (
            <TreeNode
              label={
                <div className="flex justify-center">
                  <OfficeMemberCard member={vp} />
                </div>
              }
            >
              {media && (
                <TreeNode
                  label={
                    <div className="flex justify-center">
                      <OfficeMemberCard member={media} />
                    </div>
                  }
                />
              )}
              {communication && (
                <TreeNode
                  label={
                    <div className="flex justify-center">
                      <OfficeMemberCard member={communication} />
                    </div>
                  }
                />
              )}
            </TreeNode>
          )}

          {/* SG */}
          {sg && (
            <TreeNode
              label={
                <div className="flex justify-center">
                  <OfficeMemberCard member={sg} />
                </div>
              }
            />
          )}

          {rh && (
            <TreeNode
              label={
                <div className="flex justify-center">
                  <OfficeMemberCard member={rh} />
                </div>
              }
            />
          )}

          {/* Consultants */}
          {consultants.map((c) => (
            <TreeNode
              key={c.id}
              label={
                <div className="flex justify-center">
                  <OfficeMemberCard member={c} />
                </div>
              }
            />
          ))}

          {/* Treasurer */}
          {tresor && (
            <TreeNode
              label={
                <div className="flex justify-center">
                  <OfficeMemberCard member={tresor} />
                </div>
              }
            />
          )}
        </Tree>

        {/* Separate bottom row */}
        <div className="mt-20 flex flex-wrap justify-center gap-6">
          {frontendDevs.map((dev) => (
            <OfficeMemberCard key={dev.id} member={dev} />
          ))}
          {projectManager && <OfficeMemberCard member={projectManager} />}
          {backendDevs.map((b) => (
            <OfficeMemberCard key={b.id} member={b} />
          ))}
        </div>
      </div>
    </div>
  )
}