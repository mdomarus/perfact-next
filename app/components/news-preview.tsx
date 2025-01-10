import Link from "next/link";
import FeatureImage from "../feature-image";
import { News } from "@/types";
import DateComponent from "../date";

function NewsPreview({
  news: { title, featureImage, date, excerpt, slug },
}: {
  news: News;
}) {
  return (
    <div>
      {featureImage && (
        <div className="mb-5">
          <FeatureImage title={title} slug={slug} url={featureImage?.url} />
        </div>
      )}
      <h3 className="text-lg mb-3 leading-snug">
        <Link href={`/aktualnosci/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  );
}

export default NewsPreview;
