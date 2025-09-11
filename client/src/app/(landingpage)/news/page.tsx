import { getNews } from "@/actions/news";
import NewsSection from "@/components/news/news-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News - Code Club FST Settat",
  description:
    "Stay updated with the latest news, events, and projects from the Code Club at FST Settat. Discover what our students are building and learning.",
  keywords: [
    "Code Club",
    "FST Settat",
    "News",
    "Events",
    "Projects",
    "Student Club",
  ],
  authors: [{ name: "Code Club FST Settat" }],
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="w-full flex-1 container mx-auto">
      <NewsSection news={news} />
    </main>
  );
}
