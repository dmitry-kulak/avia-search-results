import React from "react";


interface GenericField {
  caption: string;
  uid: string;
}

interface GenericPriceField {
  amount: string;
  currency: Currencies;
  currencyCode: CurrencyCodes;
}

// TODO добавить остальные валюты
type Currencies = "руб."
type CurrencyCodes = "RUB" | "EUR" | "USD"
type TariffNames =
  "ECONOMY LITE"
  | "ECONOMY LITE2"
  | "ECONOMY GREEN"
  | "ECONOMY CLASSIC"
  | "ECONOMY STANDARD"
  | "ECONOMY SAVER"
  | "ECONOMY GREEN CLASSIC"
  | "BUSINESS CLASS"
  | "BUSINESS FLEX";


// FLIGHTS
export interface FlightResult {
  flightToken: string;
  hasExtenderFare: boolean;
  flight: Flight;
}

export interface Flight {
  carrier: Carrier;
  exchange: GenericPriceField;
  international: boolean;
  isTripartiteContractDiscountApplied: boolean;
  legs: LegInterface[];
  price: Price;
  refund: Refund;
  seats: Seats;
  servicesStatuses: ServicesStatuses;
}

export interface Carrier extends GenericField {
  airlineCode: string;
}

export interface LegInterface {
  duration: number;
  segments: Segment[];
}

export interface Price {
  passengerPrices: PassengerPrice[];
  rates: { totalEur: Rate; totalUsd: Rate };
  total: GenericPriceField;
  totalFeeAndTaxes: GenericPriceField;
}

export interface Refund {
  ADULT: { refundableAfterDeparture: boolean; refundableBeforeDeparture: boolean };
}

export interface Seats {
  count: number;
  type: GenericField;
}

export interface ServicesStatuses {
  baggage: GenericField;
  exchange: GenericField;
  refund: GenericField;
}

export interface Segment {
  aircraft: GenericField;
  airline: Airline;
  arrivalAirport: GenericField;
  arrivalCity: GenericField;
  arrivalDate: string;
  classOfService: GenericField;
  classOfServiceCode: number;
  departureAirport: GenericField;
  departureCity: GenericField;
  departureDate: string;
  flightNumber: number;
  serviceDetails: ServiceDetails;
  starting: boolean;
  stops: number;
  techStopInfos: [];
  travelDuration: number;
}

export interface Airline extends GenericField {
  airlineCode: string;
}

export interface ServiceDetails {
  fareBasis: { ADULT: string };
  freeCabinLuggage: {};
  freeLuggage: { ADULT: { nil: boolean; pieces: number; unit: "шт" } };
  paidCabinLuggage: {};
  paidLuggage: {};
  tariffName: TariffNames;
}

export interface PassengerPrice {
  feeAndTaxes: GenericPriceField;
  passengerCount: number;
  passengerType: GenericField;
  tariff: GenericPriceField;
  total: GenericPriceField;
}

export interface Rate {
  amount: string;
  currencyCode: CurrencyCodes;
}


// FILTERS
export interface Filters {
  sortBy: SortBy;
  transfers: Transfers;
  priceFrom: number;
  priceTo: number;
  carriers: Carriers;
}


export interface SortBy {
  value: SortByValue;
  dir: SortByDir;
}

export type SortByValue = "price" | "time";
export type SortByDir = "ASC" | "DESC";

export type Transfers = { [key: string]: boolean }
export type Carriers = { [key: string]: boolean }

export interface SearchFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  flights: FlightResult[] | null;
}

export type FilterBy = "transfers" | "carriers";

export interface CheckboxProps {
  filterBy: FilterBy;
  filter: string;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export interface FlightsProps {
  flights: FlightResult[] | null,
  numberOfFlightsToShow: number;
  setNumberOfFlightsToShow: React.Dispatch<React.SetStateAction<number>>
}

export interface FlightProps {
  carrier: string;
  price: string;
  legs: LegInterface[];
}
