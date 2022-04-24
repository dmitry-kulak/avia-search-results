import type {
  CurrencyCodes,
  GenericField,
  GenericPriceField,
  TariffNames,
} from "./commonTypes";

export interface FlightResult {
  flightToken: string;
  hasExtenderFare: boolean;
  flight: Flight;
}

export interface FlightResultFetched {
  result: { flights: FlightResult[] };
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
  ADULT: {
    refundableAfterDeparture: boolean;
    refundableBeforeDeparture: boolean;
  };
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
