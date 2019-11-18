import React from "react";

const range = (start, length) =>
  new Array(length).fill(null).map((v, i) => i + start);

export const PagesButtons = ({
  currentPage,
  itemsPerPage,
  totalCount,
  pagesAround = 3,
  renderPage
}) => {
  const lastPageNumber = Math.floor(totalCount / itemsPerPage);
  let pageStart = Math.max(currentPage - pagesAround, 1);
  const pageEnd = Math.min(pageStart + 2 * pagesAround, lastPageNumber);
  pageStart = Math.max(pageEnd - 2 * pagesAround);
  const numberOfPages = pageEnd - pageStart + 1;

  return (
    <div>
      {range(pageStart, numberOfPages).map(page => {
        return renderPage(page);
      })}
    </div>
  );
};
