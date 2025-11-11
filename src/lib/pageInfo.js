export function pageInfo(pageStr, pageSizeStr, itemCount) {
  const page = {
    currPage: parseInt(pageStr), // pqge in query
    totalPage: Math.ceil(itemCount / parseInt(pageSizeStr)),
    totalItemCount: itemCount,

    // start & end item in the current page
    startItem: (parseInt(pageStr) - 1) * parseInt(pageSizeStr),
    endItem: parseInt(pageStr) * parseInt(pageSizeStr) - 1,
  };
  return page;
}
