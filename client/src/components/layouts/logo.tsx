"use client";

import { jetBrainsMono } from "@/lib/fonts";
import { Code2 } from "lucide-react";

export default function Logo() {
  return (
    <div
      className={`flex items-center gap-0.5 text-lg md:text-xl font-extrabold italic ${jetBrainsMono.className}`}
    >
      <span>C</span>
      <span className="flex items-center text-primary">
        <Code2 size={32} strokeWidth={2} />
      </span>
      <span >DE</span>
    </div>
  );
}
