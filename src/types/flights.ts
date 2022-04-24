import type {
  CurrencyCodes,
  GenericField,
  GenericPriceField,
  TariffNames,
} from "./commonTypes";

export type FlightResult = {
  flightToken: string;
  hasExtenderFare: boolean;
  flight: Flight;
};

export type FlightResultFetched = {
  result: { flights: FlightResult[] };
};

export type Flight = {
  carrier: Carrier;
  exchange: GenericPriceField;
  international: boolean;
  isTripartiteContractDiscountApplied: boolean;
  legs: LegType[];
  price: Price;
  refund: Refund;
  seats: Seats;
  servicesStatuses: ServicesStatuses;
};

export type Carrier = GenericField & {
  airlineCode: string;
};

export type LegType = {
  duration: number;
  segments: Segment[];
};

export type Price = {
  passengerPrices: PassengerPrice[];
  rates: { totalEur: Rate; totalUsd: Rate };
  total: GenericPriceField;
  totalFeeAndTaxes: GenericPriceField;
};

export type Refund = {
  ADULT: {
    refundableAfterDeparture: boolean;
    refundableBeforeDeparture: boolean;
  };
};

export type Seats = {
  count: number;
  type: GenericField;
};

export type ServicesStatuses = {
  baggage: GenericField;
  exchange: GenericField;
  refund: GenericField;
};

export type Segment = {
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
};

export type Airline = GenericField & {
  airlineCode: string;
};

export type ServiceDetails = {
  fareBasis: { ADULT: string };
  freeCabinLuggage: Record<string, never>;
  freeLuggage: { ADULT: { nil: boolean; pieces: number; unit: "шт" } };
  paidCabinLuggage: Record<string, never>;
  paidLuggage: Record<string, never>;
  tariffName: TariffNames;
};

export type PassengerPrice = {
  feeAndTaxes: GenericPriceField;
  passengerCount: number;
  passengerType: GenericField;
  tariff: GenericPriceField;
  total: GenericPriceField;
};

export type Rate = {
  amount: string;
  currencyCode: CurrencyCodes;
};
