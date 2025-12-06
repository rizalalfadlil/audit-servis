import { Action, Problem } from "@/types/service";
import { paginateItems } from "@/utils/pagination";

export const getPageData = (pageIndex: number, problems: Problem[], actions: Action[], maxData: number) => {
  const {
    currentPageData: problemsData,
  } = paginateItems(problems, pageIndex, maxData);

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
