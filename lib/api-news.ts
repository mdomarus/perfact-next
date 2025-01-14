import { News } from "@/types";
import { CollectionResponse, fetchGraphQL, FetchResponse } from "./api";

const NEWS_GRAPHQL_FIELDS = `
  title
  slug
  date
  featureImage {
    url
  }
  content {
    json
  }
  project {
    name
    slug
  }
  galleryCollection {
    items {
      url
      width
      height
      title
    }
  }
`;

interface NewsCollection {
  newsCollection: CollectionResponse<News>;
}

function extractNewsEntries(
  fetchResponse: FetchResponse<NewsCollection>,
): News[] {
  return fetchResponse?.data?.newsCollection?.items ?? [];
}

function extractNews(
  fetchResponse: FetchResponse<NewsCollection>,
): News | undefined {
  return extractNewsEntries(fetchResponse)[0];
}

export async function getAllNews(showDrafts: boolean): Promise<News[]> {
  const entries = await fetchGraphQL<NewsCollection>(
    `query {
        newsCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
          showDrafts ? "true" : "false"
        }) {
          items {
            ${NEWS_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractNewsEntries(entries);
}

export async function getNews(
  slug: string,
  preview: boolean,
): Promise<News | undefined> {
  const entry = await fetchGraphQL<NewsCollection>(
    `query {
        newsCollection(where: { slug: "${slug}" }, preview: ${
          preview ? "true" : "false"
        }, limit: 1) {
          items {
            ${NEWS_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
  );

  return extractNews(entry);
}

export async function getNewsAndMoreNews(
  slug: string,
  preview: boolean,
): Promise<{ news: News | undefined; moreNews: News[] }> {
  const news = await getNews(slug, preview);

  const entries = await fetchGraphQL<NewsCollection>(
    `query {
        newsCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
          preview ? "true" : "false"
        }, limit: 3) {
          items {
            ${NEWS_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
  );
  return {
    news,
    moreNews: extractNewsEntries(entries),
  };
}

interface GetLatestNewsResponse extends CollectionResponse<News> {
  page: number;
}

export const getLatestNews = async ({
  count = 3,
  page = 1,
  preview = false,
}: {
  count?: number;
  page?: number;
  preview?: boolean;
}): Promise<GetLatestNewsResponse> => {
  const entries = await fetchGraphQL<{
    newsCollection: CollectionResponse<News>;
  }>(
    `query {
        newsCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
          preview ? "true" : "false"
        }, limit: ${count}, skip: ${(page - 1) * count}) {
            items {
                ${NEWS_GRAPHQL_FIELDS}
            }
            total
            }
        }`,
    preview,
  );

  return {
    items: extractNewsEntries(entries) ?? [],
    total: entries?.data?.newsCollection?.total ?? 0,
    page,
  };
};
