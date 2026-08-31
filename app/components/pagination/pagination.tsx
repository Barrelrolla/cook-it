"use client";

import { Pagination as Pages } from "barrelrolla-ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  pageCount: number;
};
export default function Pagination({ pageCount }: PaginationProps) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${path}?${params.toString()}`, { scroll: true });
  }

  if (pageCount <= 1) return null;

  return (
    <Pages
      currentPage={currentPage}
      onPageChange={changePage}
      pageCount={pageCount}
      nextAriaLabel="next"
      previousAriaLabel="prev"
    />
  );
}
