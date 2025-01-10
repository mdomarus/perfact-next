import { getLatestNews } from "@/lib/api";
import { News } from "@/types";
import { draftMode } from "next/headers";
import Link from "next/link";
import LatestNews from "./components/latest-news";
import Date from "./components/date";
import FeatureImage from "./components/feature-image";

function HeroNews({
  news: { title, featureImage, date, excerpt, slug },
}: {
  news: News;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <FeatureImage title={title} slug={slug} url={featureImage?.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl font-bold lg:text-6xl leading-tight">
            <Link href={`/aktualnosci/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        {excerpt && (
          <div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled: showDrafts } = await draftMode();
  const { data: allNews } = await getLatestNews({
    count: 4,
    preview: showDrafts,
  });
  const heroNews = allNews[0];
  const moreNews = allNews.slice(1);

  if (!heroNews) return null;

  return (
    <>
      <HeroNews news={heroNews} />
      <LatestNews news={moreNews} />
    </>
  );
}
