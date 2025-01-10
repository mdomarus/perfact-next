import { getLatestNews } from "@/lib/api";
import { draftMode } from "next/headers";
import NewsPreview from "../components/news-preview";
import TypographyH1 from "../components/typography-h1";
import Link from "next/link";

// interface StaticParams {
//   slug: string;
// }

const Pagination = () => {
  return (
    <div>
      <Link href="/">First</Link>
    </div>
  );
};

export default async function ListNewsPage() {
  // {
  //   params,
  //   searchParams,
  // }: {
  //   params: Promise<StaticParams>;
  //   searchParams?: Promise<{
  //     query?: string;
  //     page?: string;
  //   }>;
  // }
  const { isEnabled } = await draftMode();
  const { data: news, total } = await getLatestNews({
    count: 6,
    preview: isEnabled,
  });
  console.log("total: ", total);

  if (!news) return null;

  return (
    <article>
      <TypographyH1>Aktualności</TypographyH1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {news.map((news) => (
          <NewsPreview key={news.slug} news={news} />
        ))}
        <Pagination />
      </div>
    </article>
  );
}
