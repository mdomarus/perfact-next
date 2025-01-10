import Link from "next/link";

const Pagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <nav className="flex gap-2 my-4 justify-center">
      <Link
        style={{
          pointerEvents: isFirst ? "none" : "auto",
        }}
        href={{ query: { page: 1 } }}
        className="hover:underline"
      >
        First
      </Link>
      <Link
        style={{
          pointerEvents: isFirst ? "none" : "auto",
        }}
        href={{ query: { page: isFirst ? page : page - 1 } }}
        className="hover:underline"
      >
        Previous
      </Link>
      <Link
        style={{
          pointerEvents: isLast ? "none" : "auto",
        }}
        href={{ query: { page: isLast ? page : page + 1 } }}
        className="hover:underline"
      >
        Next
      </Link>
      <Link
        style={{
          pointerEvents: isLast ? "none" : "auto",
        }}
        href={{ query: { page: totalPages } }}
        className="hover:underline"
      >
        Last
      </Link>
    </nav>
  );
};

export default Pagination;
