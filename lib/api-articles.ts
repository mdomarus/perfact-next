import { Article } from "@/types";
import { CollectionResponse, fetchGraphQL } from "./api";

interface ArticleCollection {
  articleCollection: CollectionResponse<Article>;
}

export async function getArticle(
  slug: string,
  preview?: boolean,
): Promise<Article | undefined> {
  const entry = await fetchGraphQL<ArticleCollection>(
    `query {
      articleCollection(where: {slug: "${slug}"}) {
        items {
          title
          slug
          featureImage {
            url
            title
          }
          content {
            json
          }
        }
      }
    }`,
    preview,
  );

  if (entry?.data?.articleCollection?.items) {
    return entry.data.articleCollection.items[0];
  }
}
