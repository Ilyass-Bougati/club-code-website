'use client'

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram } from "lucide-react";
import { OfficeMember } from "@/types/backendTypes";

interface OfficeMemberCardProps {
  member: OfficeMember | undefined;
}

const OfficeMemberCard: React.FC<OfficeMemberCardProps> = ({ member }) => {
  if (!member) {
    return (
      <Card className="group relative overflow-hidden border-0 shadow-md">
        <CardContent className="flex flex-col items-center justify-center h-80 text-center p-6">
          <div className="text-muted-foreground text-sm">Member not found</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group md:w-56  relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Background hover accent */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="relative p-6 flex flex-col items-center text-center">
        {/* Avatar Section */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300 scale-110" />
          <Avatar className="relative w-28 h-28 ring-4 ring-background shadow-xl">
            <AvatarImage
              src={member.image.uri}
              alt={`${member.firstName} ${member.lastName}`}
              className="object-cover"
            />
            <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
              {member.firstName[0] + member.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name and Position */}
        <div className="mb-6 space-y-1">
          <h3 className="text-xl font-bold tracking-tight">
            {member.firstName} {member.lastName}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            {member.position}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-2">
          {member.linkedin && (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="h-10 w-10 p-0 rounded-full hover:scale-110 transition-all duration-200"
            >
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
          )}
          {member.instagram && (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="h-10 w-10 p-0 rounded-full hover:scale-110 transition-all duration-200"
            >
              <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
};

export default OfficeMemberCard;
