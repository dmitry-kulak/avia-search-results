import type {
  Carriers,
  Filters,
  SortByDir,
  SortByValue,
  Transfers,
} from "../types/filters";
import type { FlightResult } from "../types/flights";

export const findCarriers = (flights: FlightResult[]) => {
  const carriers = new Set();
  for (const flight of flights) {
    carriers.add(flight.flight.carrier.caption);
  }

  return Array.from(carriers) as string[];
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

export const sortByPrice = (flights: FlightResult[], dir: SortByDir) => {
  const sortByPriceAsc = (flights: FlightResult[]) => {
    return [...flights].sort((a, b) => {
      return +a.flight.price.total.amount - +b.flight.price.total.amount;
    });
  };

  const sortByPriceDesc = (flights: FlightResult[]) => {
    return [...flights].sort((a, b) => {
      return +b.flight.price.total.amount - +a.flight.price.total.amount;
    });
  };

  switch (dir) {
    case "ASC":
      return sortByPriceAsc(flights);

    case "DESC":
      return sortByPriceDesc(flights);
  }
};

export const sortByTime = (flights: FlightResult[], dir: SortByDir) => {
  const sortByTimeAsc = (flights: FlightResult[]) => {
    return [...flights].sort((a, b) => {
      return (
        +a.flight.legs[0].duration +
        +a.flight.legs[1].duration -
        (+b.flight.legs[0].duration + +b.flight.legs[1].duration)
      );
    });
  };

  const sortByTimeDesc = (flights: FlightResult[]) => {
    return [...flights].sort((a, b) => {
      return (
        +b.flight.legs[0].duration +
        +b.flight.legs[1].duration -
        (+a.flight.legs[0].duration + +a.flight.legs[1].duration)
      );
    });
  };

  switch (dir) {
    case "ASC":
      return sortByTimeAsc(flights);

    case "DESC":
      return sortByTimeDesc(flights);
  }
};

export const sortFlights = (
  flights: FlightResult[],
  { value, dir }: { value: SortByValue; dir: SortByDir }
) => {
  switch (value) {
    case "price":
      return sortByPrice(flights, dir);

    case "time":
      return sortByTime(flights, dir);
  }
};

export const filterByTransfers = (flights: FlightResult[], transfers: Transfers) => {
  let filteredFlights: FlightResult[] = [...flights];
  const activeTransfersFilters: number[] = [];

  for (const transfer in transfers) {
    if (transfers[transfer]) {
      activeTransfersFilters.push(parseInt(transfer));
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
};

export const filterByCarriers = (flights: FlightResult[], carriers: Carriers) => {
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
};

export const filterByPrice = (flights: FlightResult[], min: number, max: number) => {
  return flights.filter(
    (flight) =>
      +flight.flight.price.total.amount >= min && +flight.flight.price.total.amount <= max
  );
};

// TODO learn functional programming and rewrite it
export const filterFlightsByAll = (flights: FlightResult[], filters: Filters) => {
  return filterByCarriers(
    filterByPrice(
      filterByTransfers(flights, filters.transfers),
      filters.priceFrom,
      filters.priceTo
    ),
    filters.carriers
  );
};
