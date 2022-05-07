import { curry, pipe, sort } from "ramda";

import type { Filters, SortByDirection } from "../types/filters";
import type { FlightResult } from "../types/flights";

export const findCarriers = (flights: FlightResult[]) => {
  const carriers = new Set();
  for (const flight of flights) {
    carriers.add(flight.flight.carrier.caption);
  }

  return [...carriers] as string[];
};

export const countTransfers = (flights: FlightResult[]) => {
  let transfers = 0;
  for (const flight of flights) {
    for (const leg of flight.flight.legs) {
      if (leg.segments.length - 1 > transfers) {
        transfers = leg.segments.length - 1;
      }
    }
  }

  return transfers;
};

export const sortByPrice = (direction: SortByDirection, flights: FlightResult[]) => {
  switch (direction) {
    case "ASC":
      return sort(
        (a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount,
        flights
      );
    case "DESC":
      return sort(
        (a, b) => +b.flight.price.total.amount - +a.flight.price.total.amount,
        flights
      );
  }
};

export const sortByTime = (direction: SortByDirection, flights: FlightResult[]) => {
  switch (direction) {
    case "ASC":
      return sort(
        (a, b) =>
          +a.flight.legs[0].duration +
          +a.flight.legs[1].duration -
          (+b.flight.legs[0].duration + +b.flight.legs[1].duration),
        flights
      );
    case "DESC":
      return sort(
        (a, b) =>
          +b.flight.legs[0].duration +
          +b.flight.legs[1].duration -
          (+a.flight.legs[0].duration + +a.flight.legs[1].duration),
        flights
      );
  }
};

export const sortFlights = (flights: FlightResult[], filters: Filters) => {
  const { value, dir } = filters.sortBy;
  switch (value) {
    case "price":
      return sortByPrice(dir, flights);

    case "time":
      return sortByTime(dir, flights);
  }
};

export const filterByTransfers = curry((filters: Filters, flights: FlightResult[]) => {
  const { transfers } = filters;
  let filteredFlights: FlightResult[] = [...flights];
  const activeTransfersFilters: number[] = [];

  for (const transfer in transfers) {
    if (transfers[transfer]) {
      activeTransfersFilters.push(Number.parseInt(transfer));
    }
  }

  // edge case for zero-transfers
  if (activeTransfersFilters[0] === 0 && activeTransfersFilters.length === 1) {
    activeTransfersFilters.forEach(() => {
      filteredFlights = filteredFlights.filter((flight) => {
        return flight.flight.legs.every(
          (leg) => leg.segments.length - 1 === activeTransfersFilters[0]
        );
      });
    });
  }

  activeTransfersFilters.forEach(() => {
    filteredFlights = filteredFlights.filter((flight) => {
      for (const leg of flight.flight.legs) {
        if (activeTransfersFilters.includes(leg.segments.length - 1)) {
          return true;
        }
      }

      return false;
    });
  });

  return filteredFlights;
});

export const filterByCarriers = curry((filters: Filters, flights: FlightResult[]) => {
  const { carriers } = filters;
  let filteredFlights: FlightResult[] = [...flights];
  const activeFilters: string[] = [];

  for (const carrier in carriers) {
    if (carriers[carrier]) {
      activeFilters.push(carrier);
    }
  }

  if (activeFilters.length === 0) {
    return filteredFlights;
  }

  activeFilters.forEach(() => {
    filteredFlights = filteredFlights.filter((flight) =>
      activeFilters.includes(flight.flight.carrier.caption)
    );
  });

  return filteredFlights;
});

export const filterByPrice = curry((filters: Filters, flights: FlightResult[]) => {
  const { priceFrom: min, priceTo: max } = filters;
  return flights.filter(
    (flight) =>
      +flight.flight.price.total.amount >= min && +flight.flight.price.total.amount <= max
  );
});

// TODO revisit when sober
type FilterFlightsByAll = (
  filters: Filters
) => (flights: FlightResult[]) => FlightResult[];
export const filterFlightsByAll: FilterFlightsByAll = (filters) =>
  pipe(filterByCarriers(filters), filterByPrice(filters), filterByTransfers(filters));
