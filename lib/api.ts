import { News } from "@/types";

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

interface Collection<T> {
  total: number;
  data: T[];
  page: number;
}

async function fetchGraphQL<T = unknown>(
  query: string,
  preview = false,
): Promise<T> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    },
  ).then((response) => response.json());
}

interface NewsCollection {
  data: {
    newsCollection: {
      items: News[];
      total: number;
      page: number;
    };
  };
}

function extractNewsEntries(fetchResponse: NewsCollection): News[] {
  return fetchResponse?.data?.newsCollection?.items ?? [];
}

function extractNews(fetchResponse: NewsCollection): News | undefined {
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

export const getLatestNews = async ({
  count = 3,
  page = 0,
  preview = false,
}: {
  count?: number;
  page?: number;
  preview?: boolean;
}): Promise<Collection<News>> => {
  const entries = await fetchGraphQL<NewsCollection>(
    `query {
      newsCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: ${count}, skip: ${page * count}) {
        items {
          ${NEWS_GRAPHQL_FIELDS}
        }
        total
      }
    }`,
    preview,
  );
  return {
    data: extractNewsEntries(entries),
    total: entries?.data?.newsCollection?.total,
    page,
  };
};
