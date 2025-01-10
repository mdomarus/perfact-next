import { News } from "@/types";
import NewsPreview from "./news-preview";

export default function LatestNews({ news }: { news: News[] }) {
  if (!news) return null;

  return (
    <section className="border-t my-8">
      <h4 className="mt-8 mb-8 text-2xl md:text-3xl font-bold tracking-tight leading-tight">
        Dzieje się
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-16 lg:gap-x-32 gap-y-8 md:gap-y-32 mb-8">
        {news.map((news) => (
          <NewsPreview key={news.slug} news={news} />
        ))}
      </div>
    </section>
  );
}
