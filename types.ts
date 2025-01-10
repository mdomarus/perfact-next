import { Document } from "@contentful/rich-text-types";

export interface Asset {
  url: string;
  title: string;
  width: number;
  height: number;
}

export interface Content {
  json: Document;
}

export interface News {
  title: string;
  slug: string;
  date: string;
  content: Content;
  excerpt: string;
  project: unknown;
  galleryCollection?: {
    items: Asset[];
  };
  featureImage: Asset;
}
