import type { Metadata } from "next";
import { getNews } from "@/actions/news";

interface NewsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({
  params,
}: NewsLayoutProps): Promise<Metadata> {
  const news = await getNews();
  const newsItem = news.find((item) => item.id === params.id);

  if (!newsItem) {
    return {
      title: "News not found - Code Club FST Settat",
      description: "The article you are looking for doesn’t exist.",
    };
  }

  return {
    title: `${newsItem.title} - Code Club FST Settat`,
    description: newsItem.description ?? newsItem.title,
    keywords: ["Code Club", "FST Settat", "News", newsItem.type],
    authors: [{ name: "Code Club FST Settat" }],
  };
}

export default function NewsLayout({ children }: NewsLayoutProps) {
  return <>{children}</>;
}
