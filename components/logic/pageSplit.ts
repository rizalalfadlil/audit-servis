import { Action, Problem } from "@/types/service";
import { paginateItems } from "@/utils/pagination";

// Inside your component:
export const getPageData = (pageIndex: number, problems: Problem[], actions: Action[], maxData: number) => {
  // First, get problems for this page
  const {
    currentPageData: problemsData,
  } = paginateItems(problems, pageIndex, maxData);

  // If we have space left after problems, fill with actions
  let actionsData: typeof actions = [];
  if (problemsData.length < maxData) {
    const actionsStartIndex = Math.max(
      0,
      pageIndex * maxData - problems.length
    );
    const remainingSpace = maxData - problemsData.length;

    actionsData = actions.slice(
      actionsStartIndex,
      actionsStartIndex + remainingSpace
    );
  }

  return { problemsData, actionsData };
};
