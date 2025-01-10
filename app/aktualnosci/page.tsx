import { getLatestNews } from "@/lib/api";
import { draftMode } from "next/headers";
import NewsPreview from "../components/news-preview";
import Pagination from "../components/pagination";
import TypographyH1 from "../components/typography-h1";
interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PAGE_SIZE = 6;

export default async function ListNewsPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = Number.parseInt(searchParams.page?.toString() || "", 10) || 1;

  const { isEnabled } = await draftMode();
  const { data: news, total } = await getLatestNews({
    count: PAGE_SIZE,
    page,
    preview: isEnabled,
  });

  if (!news) return null;

  return (
    <article>
      <TypographyH1>Aktualności</TypographyH1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {news.map((news) => (
          <NewsPreview key={news.slug} news={news} />
        ))}
      </div>
      <Pagination page={page} totalPages={Math.ceil(total / PAGE_SIZE)} />
    </article>
  );
}
