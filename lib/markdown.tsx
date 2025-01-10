import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

export function Markdown({ content }: { content: Document }) {
  return documentToReactComponents(content);
}
