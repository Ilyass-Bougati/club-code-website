import NewsDetail from "@/components/news/news-detail";
import RelatedNews from "@/components/news/related-news";
import { news } from "@/seed/news";
import React from "react";

interface NewsIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsIdPage({ params }: NewsIdPageProps) {
  const { id } = await params;

  const newsItem = news.find((item) => item.id === id);
  const relatedNews = news.filter((item) => item.type === newsItem?.type && item.id !== newsItem.id);
  const recentNews = news
    .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime())
    .filter((item,idx) => idx < 5 && item.id !== newsItem?.id);

  return (
    <main className="container py-8 md:py-12 px-4 md:px-6 md:mx-auto grid gap-5   md:grid-cols-3">
      <NewsDetail news={newsItem!} />
      <RelatedNews relatedNews={relatedNews} recentNews={recentNews} />
    </main>
  );
}
