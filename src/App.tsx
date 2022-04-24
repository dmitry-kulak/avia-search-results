import axios from "axios";
import { useEffect, useState } from "react";

import type { Filters } from "./types/filters";
import type { FlightResult, FlightResultFetched } from "./types/flights";
import styles from "./App.module.scss";
import Flights from "./components/Flights/Flights";
import SearchFilter from "./components/SearchFilter/SearchFilter";
import { makeTransferFields } from "./utils/utils";
import {
  countTransfers,
  filterFlightsByAll,
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
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [numberOfFlightsToShow, setNumberOfFlightsToShow] = useState(5);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await axios.get<FlightResultFetched>("./flights.min.json");
      return response.data.result.flights;
    };

    fetchFlights()
      .then((flights) => {
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

        setFlights(flights);
        setFilters({
          ...filters,
          carriers: carriersFilter,
          transfers: transfersFilter,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setNumberOfFlightsToShow(5);
  }, [filters]);

  const filterFlights = (flights: FlightResult[], filters: Filters) => {
    return sortFlights(filterFlightsByAll(filters)(flights), filters);
  };

  const filteredFlights = filterFlights(flights, filters);

  return (
    <div className={styles.app}>
      <SearchFilter
        filters={filters}
        isFlightsLoaded={!!filteredFlights.length}
        setFilters={setFilters}
      />
      <Flights
        flights={filteredFlights}
        numberOfFlightsToShow={numberOfFlightsToShow}
        setNumberOfFlightsToShow={setNumberOfFlightsToShow}
      />
    </div>
  );
};

export default App;
