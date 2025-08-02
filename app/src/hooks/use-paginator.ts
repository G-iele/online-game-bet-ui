import { useCallback, useState } from "react";

export const usePagination = (initialPage: number = 1, initialLimit: number = 5) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const onPageChange = useCallback((newPage: number, totalPages: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, []);

  return {
    page,
    limit,
    setLimit,
    onPageChange,
  };
};
