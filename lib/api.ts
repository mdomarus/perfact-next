export interface FetchResponse<T> {
  data: T;
}

export interface CollectionResponse<T> {
  items?: T[];
  total?: number;
}

export async function fetchGraphQL<T = unknown>(
  query: string,
  preview = false,
): Promise<FetchResponse<T>> {
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
    },
  ).then((response) => response.json());
}
