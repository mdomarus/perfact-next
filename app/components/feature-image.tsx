import ContentfulImage from "@/lib/contentful-image";
import clsx from "clsx";
import Link from "next/link";

export default function FeatureImage({
  title,
  url,
  slug,
}: {
  title: string;
  url: string;
  slug?: string;
}) {
  const image = (
    <ContentfulImage
      alt={`Feature Image for ${title}`}
      priority
      width={2000}
      height={1000}
      className={clsx("aspect-[3/2] object-cover", {
        "hover:drop-shadow-md transition-shadow duration-200 ": slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/aktualnosci/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
