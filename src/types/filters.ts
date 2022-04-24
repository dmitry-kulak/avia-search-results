export type Filters = {
  sortBy: SortBy;
  transfers: Transfers;
  priceFrom: number;
  priceTo: number;
  carriers: Carriers;
};

export type SortBy = {
  value: SortByValue;
  dir: SortByDir;
};

export type SortByValue = "price" | "time";
export type SortByDir = "ASC" | "DESC";
export type Transfers = { [key: string]: boolean };
export type Carriers = { [key: string]: boolean };

export type FilterBy = "transfers" | "carriers";
