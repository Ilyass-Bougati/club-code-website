import { getNews } from "@/actions/news";
import NewsSection from "@/components/news/news-section";

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="w-full flex-1 container mx-auto">
      <NewsSection news={news} />
    </main>
  );
}
