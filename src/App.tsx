import { useEffect, useState } from "react";

import type { Filters } from "./types/filters";
import type { FlightResult } from "./types/flights";

import styles from "./App.module.scss";
import Flights from "./components/Flights/Flights";
import SearchFilter from "./components/SearchFilter/SearchFilter";
import { makeTransferFields } from "./utils/utils";
import {
  countTransfers,
  filterByCarriers,
  filterByPrice,
  filterByTransfers,
  findCarriers,
  sortFlights,
} from "./utils/filterFunctions";

const minPrice = 0;
const maxPrice = 1000000;

const initialFilters: Filters = {
  sortBy: { value: "price", dir: "ASC" },
  transfers: {},
  priceFrom: minPrice,
  priceTo: maxPrice,
  carriers: {},
};

const App = () => {
  const [flights, setFlights] = useState<FlightResult[] | null>(null);
  const [filteredFlights, setFilteredFlights] = useState<FlightResult[] | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [numberOfFlightsToShow, setNumberOfFlightsToShow] = useState(5);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await fetch("./flights.min.json");
      const data = await response.json();
      setFlights(data.result.flights);
    };

    fetchFlights();
  }, []);

  // SET TRANSFERS AND CARRIERS FILTERS ON FETCH
  useEffect(() => {
    if (flights) {
      setFilteredFlights(flights);

      const carriers = findCarriers(flights);
      const carriersFilter: { [key: string]: boolean } = {};
      carriers.forEach((carrier) => {
        carriersFilter[carrier] = false;
      });

      const transfers = makeTransferFields(0, countTransfers(flights));
      const transfersFilter: { [key: string]: boolean } = {};
      transfers.forEach((carrier) => {
        transfersFilter[carrier] = false;
      });

      setFilters({
        ...filters,
        carriers: carriersFilter,
        transfers: transfersFilter,
      });
    }
  }, [flights]);

  // FILTER FLIGHTS
  useEffect(() => {
    if (flights) {
      setNumberOfFlightsToShow(5);

      let newFilteredFlights: FlightResult[] = flights.slice();

      newFilteredFlights = filterByTransfers(newFilteredFlights, filters.transfers);
      newFilteredFlights = filterByCarriers(newFilteredFlights, filters.carriers);
      newFilteredFlights = filterByPrice(
        newFilteredFlights,
        filters.priceFrom,
        filters.priceTo
      );
      newFilteredFlights = sortFlights(newFilteredFlights, filters.sortBy);

      setFilteredFlights(newFilteredFlights);
    }
  }, [filters, flights]);

  return (
    <div className={styles.app}>
      <SearchFilter filters={filters} setFilters={setFilters} flights={filteredFlights} />
      <Flights
        flights={filteredFlights}
        numberOfFlightsToShow={numberOfFlightsToShow}
        setNumberOfFlightsToShow={setNumberOfFlightsToShow}
      />
    </div>
  );
};

export default App;
