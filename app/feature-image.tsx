import Link from "next/link";
import ContentfulImage from "../lib/contentful-image";

function cn(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

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
      className={cn("shadow-small aspect-[3/2] object-cover", {
        "hover:shadow-medium transition-shadow duration-200 ": slug,
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
