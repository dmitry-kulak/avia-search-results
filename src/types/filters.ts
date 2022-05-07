export type Filters = {
  sortBy: SortBy;
  transfers: Transfers;
  priceFrom: number;
  priceTo: number;
  carriers: Carriers;
};

export type SortBy = {
  value: SortByValue;
  dir: SortByDirection;
};

export type SortByValue = "price" | "time";
export type SortByDirection = "ASC" | "DESC";
export type Transfers = { [key: string]: boolean };
export type Carriers = { [key: string]: boolean };

export type FilterBy = "transfers" | "carriers";
