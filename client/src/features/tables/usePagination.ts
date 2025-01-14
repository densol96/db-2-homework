import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function usePagination(pagesTotal: number) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? +searchParams.get("page") : 1;
  const [isLimitError, setIsLimitError] = useState(false);

  const next = useCallback(
    function () {
      if (currentPage == pagesTotal) {
        setIsLimitError(true);
      } else {
        searchParams.set("page", `${currentPage + 1}`);
        setSearchParams(searchParams);
      }
    },
    [currentPage, "page", pagesTotal]
  );

  const prev = useCallback(
    function () {
      if (currentPage == 1) {
        setIsLimitError(true);
      } else {
        searchParams.set("page", `${currentPage - 1}`);
        setSearchParams(searchParams);
      }
    },
    [currentPage, "page", pagesTotal]
  );

  return { currentPage, prev, next };
}

export default usePagination;
