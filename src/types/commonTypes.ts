export interface GenericField {
  caption: string;
  uid: string;
}

export interface GenericPriceField {
  amount: string;
  currency: Currencies;
  currencyCode: CurrencyCodes;
}

// TODO добавить остальные валюты
export type Currencies = "руб.";
export type CurrencyCodes = "RUB" | "EUR" | "USD";
export type TariffNames =
  | "ECONOMY LITE"
  | "ECONOMY LITE2"
  | "ECONOMY GREEN"
  | "ECONOMY CLASSIC"
  | "ECONOMY STANDARD"
  | "ECONOMY SAVER"
  | "ECONOMY GREEN CLASSIC"
  | "BUSINESS CLASS"
  | "BUSINESS FLEX";
