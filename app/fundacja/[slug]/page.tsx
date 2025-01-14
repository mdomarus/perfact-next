import FeatureImage from "@/app/components/feature-image";
import TypographyH1 from "@/app/components/typography-h1";
import { getArticle } from "@/lib/api-articles";
import { Markdown } from "@/lib/markdown";
import { draftMode } from "next/headers";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { isEnabled } = await draftMode();
  const { slug } = await params;
  const article = await getArticle(slug, isEnabled);

  if (!article) return null;

  return (
    <article>
      <TypographyH1>{article.title}</TypographyH1>
      {article.featureImage && (
        <div className="max-w-md m-auto">
          <FeatureImage
            title={article.featureImage?.title || ""}
            url={article.featureImage?.url}
            square
          />
        </div>
      )}
      <div className="prose">
        <Markdown content={article.content?.json} />
      </div>
    </article>
  );
}
