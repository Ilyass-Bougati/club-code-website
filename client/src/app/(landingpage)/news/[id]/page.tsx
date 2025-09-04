
import NewsDetail from "@/components/news/news-detail";
import RelatedNews from "@/components/news/related-news";
import { News } from "@/types/backendTypes";
import React from "react";

interface NewsIdPageProps {
  params: Promise<{ id: string }>; 
}


async function getNews(): Promise<News[]> {
  const res = await fetch("https://api.code.sefault.com/api/v1/news", {
    next: { revalidate: 300 }, 
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}

export default async function NewsIdPage({ params }: NewsIdPageProps) {
  const { id } = await params;
  const news = await getNews();

  const newsItem = news.find((item) => item.id === id);

  if (!newsItem) {
    return (
      <main className="container py-12 text-center">
        <h2 className="text-2xl font-bold">News not found</h2>
        <p className="text-muted-foreground mt-2">
          The article you are looking for doesn’t exist.
        </p>
      </main>
    );
  }

  const relatedNews = news.filter(
    (item) => item.type === newsItem.type && item.id !== newsItem.id
  );

  const recentNews = news
    .slice() 
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .filter((item) => item.id !== newsItem.id)
    .slice(0, 5);

  return (
    <main className="container py-8 md:py-12 px-4 md:px-6 md:mx-auto grid gap-5 md:grid-cols-3">
      <NewsDetail news={newsItem} />
      <RelatedNews relatedNews={relatedNews} recentNews={recentNews} />
    </main>
  );
}
