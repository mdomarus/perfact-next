import { getLatestNews } from "@/lib/api-news";
import { draftMode } from "next/headers";
import NewsPreview from "../components/news-preview";
import Pagination from "../components/pagination";
import TypographyH1 from "../components/typography-h1";
import { SearchParams } from "next/dist/server/request/search-params";

const PAGE_SIZE = 6;

export default async function ListNewsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const page =
    Number.parseInt((await searchParams)?.strona?.toString() || "", 10) || 1;

  const { isEnabled } = await draftMode();
  const { items: news, total } = await getLatestNews({
    count: PAGE_SIZE,
    page,
    preview: isEnabled,
  });

  if (!news || !total) return null;

  return (
    <>
      <TypographyH1>Aktualności</TypographyH1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {news.map((news) => (
          <NewsPreview key={news.slug} news={news} />
        ))}
      </div>
      <Pagination page={page} totalPages={Math.ceil(total / PAGE_SIZE)} />
    </>
  );
}
