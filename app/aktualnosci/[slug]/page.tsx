import DateComponent from "@/app/components/date";
import FeatureImage from "@/app/components/feature-image";
import Gallery from "@/app/components/gallery";
import LatestNews from "@/app/components/latest-news";
import TypographyH1 from "@/app/components/typography-h1";
import { getAllNews, getNewsAndMoreNews } from "@/lib/api-news";
import { Markdown } from "@/lib/markdown";
import { draftMode } from "next/headers";

interface StaticParams {
  slug: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  const allNews = await getAllNews(false);

  return allNews.map(({ slug }) => ({
    slug,
  }));
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<StaticParams>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const { news, moreNews } = await getNewsAndMoreNews(slug, isEnabled);

  if (!news) return null;

  return (
    <>
      <article>
        <TypographyH1>{news.title}</TypographyH1>
        <div className="mb-6 text-lg">
          <DateComponent dateString={news.date} />
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <FeatureImage title={news?.title} url={news.featureImage?.url} />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="prose">
            <Markdown content={news.content?.json} />
          </div>
        </div>
        <div className="my-8">
          <Gallery images={news.galleryCollection?.items} />
        </div>
      </article>
      <LatestNews news={moreNews} />
    </>
  );
}
