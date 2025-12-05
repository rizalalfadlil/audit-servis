// utils/pagination.ts
export interface PaginationResult<T> {
  currentPageData: T[];
  remainingItems: number;
}

export function paginateItems<T>(
  items: T[],
  page: number,
  itemsPerPage: number
): PaginationResult<T> {
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = items.slice(startIndex, endIndex);
  const remainingItems = Math.max(0, items.length - endIndex);

  return { currentPageData, remainingItems };
}
