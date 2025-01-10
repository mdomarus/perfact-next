"use client";

import Image from "next/image";

interface ContentfulImageProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  quality?: number;
  [key: string]: unknown; // For other props that might be passed
}

const contentfulLoader = ({
  src,
  width,
  quality,
}: Partial<ContentfulImageProps>) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props: ContentfulImageProps) {
  return <Image loader={contentfulLoader} {...props} />;
}
