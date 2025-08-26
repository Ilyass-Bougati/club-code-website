"use client";

import { News } from "@/types/backendTypes";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import { AspectRatio } from "../ui/aspect-ratio";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function NewsDetail({ news }: { news: News }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="container flex flex-col md:col-span-2 mx-auto md:my-12   "
    >
      {/* Breadcrumb */}
      <motion.div variants={item}>
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/news">News</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/news/${news.id}`}>{news.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      {/* News Card */}
      <div className="flex flex-col gap-8 md:gap-5 ">
        {/* Title */}
        <motion.h1 variants={item} className="text-3xl md:text-4xl font-bold">
          {news.title}
        </motion.h1>

        <Separator />

        {/* Type + Date */}
        <motion.div variants={item} className="flex items-center gap-3">
          <Badge className="px-3 py-1 text-sm" variant="secondary">
            {news.type}
          </Badge>
          <span className="text-muted-foreground text-sm">
            {format(news.publishedAt, "MMMM dd, yyyy")}
          </span>
        </motion.div>

        {/* Image */}
        {news.image?.uri && (
          <motion.div variants={item}>
            <AspectRatio
              ratio={16 / 9}
              className=" overflow-hidden w-full bg-muted-foreground"
            >
              <Image
                src={news.image.uri}
                alt={news.title}
                fill
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </AspectRatio>
          </motion.div>
        )}

        {/* Description */}
        <motion.p
          variants={item}
          className="text-base text-muted-foreground leading-relaxed"
        >
          {news.description}
        </motion.p>
      </div>
    </motion.div>
  );
}
