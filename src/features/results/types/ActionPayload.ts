type ChangeCategoriesFacetPayload = {
  value: string,
}

type NextPagePayload = {
  page: number,
}

type ActionPayload = (
  ChangeCategoriesFacetPayload |
  NextPagePayload
);

export {
  ActionPayload,
}