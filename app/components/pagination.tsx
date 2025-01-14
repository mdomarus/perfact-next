import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ReactNode } from "react";

const PaginationLink = ({
  href,
  className,
  disabled,
  children,
}: {
  href: Url;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}) => {
  return (
    <Link
      style={{
        pointerEvents: disabled ? "none" : "auto",
      }}
      href={href}
      className={cn("hover:underline p-2", className)}
      prefetch
    >
      {children}
    </Link>
  );
};

const Pagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const isFirst = page === 1;
  const isLast = page === totalPages;

  if (totalPages === 1) {
    return null;
  }

  return (
    <nav className="flex gap-2 my-4 justify-center">
      <PaginationLink
        href={{ query: { page: 1 } }}
        disabled={isFirst}
      >{`<<`}</PaginationLink>

      <PaginationLink
        href={{ query: { page: isFirst ? page : page - 1 } }}
        disabled={isFirst}
      >
        {isFirst ? page : page - 1}
      </PaginationLink>

      <div className="p-2">{`Strona ${page} z ${totalPages}`}</div>

      <PaginationLink
        href={{ query: { page: isLast ? page : page + 1 } }}
        disabled={isLast}
      >
        {isLast ? page : page + 1}
      </PaginationLink>

      <PaginationLink
        href={{ query: { page: totalPages } }}
        disabled={isLast}
      >{`>>`}</PaginationLink>
    </nav>
  );
};

export default Pagination;
