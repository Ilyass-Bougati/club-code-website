
import NewsSection from "@/components/news/news-section";
import { News } from "@/types/backendTypes";

async function getNews(): Promise<News[]> {
  const res = await fetch("https://api.code.sefault.com/api/v1/news", {
    cache: "force-cache", 
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="w-full flex-1 container mx-auto">
      <NewsSection news={news} />
    </main>
  );
}
