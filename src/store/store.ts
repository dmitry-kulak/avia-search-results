import axios from "axios";
import { makeAutoObservable } from "mobx";

import type { FlightResult, FlightResultFetched } from "../types/flights";
import type { Filters } from "../types/filters";
import {
  countTransfers,
  filterFlightsByAll,
  findCarriers,
  sortFlights,
} from "../utils/filterFunctions";
import { makeTransferFields } from "../utils/utils";

const minPrice = 0;
const maxPrice = 1000000;

const initialFilters: Filters = {
  sortBy: { value: "price", dir: "ASC" },
  transfers: {},
  priceFrom: minPrice,
  priceTo: maxPrice,
  carriers: {},
};

export class Store {
  constructor() {
    makeAutoObservable(this);
  }

  flights: FlightResult[] = [];
  filters: Filters = initialFilters;
  numberOfFlightsToShow = 5;
  isFlightsLoading = true;

  get filteredFlights() {
    return sortFlights(filterFlightsByAll(this.filters)(this.flights), this.filters);
  }

  fetchFlights = async () => {
    try {
      const response = await axios.get<FlightResultFetched>("./flights.min.json");

      const flights = response.data.result.flights;

      const carriers = findCarriers(flights);
      const carriersFilter: { [key: string]: boolean } = {};
      carriers.forEach((carrier) => {
        carriersFilter[carrier] = false;
      });

      const transfers = makeTransferFields(countTransfers(flights));
      const transfersFilter: { [key: string]: boolean } = {};
      transfers.forEach((carrier) => {
        transfersFilter[carrier] = false;
      });

      this.setFlights(flights);
      this.setFilters({
        ...this.filters,
        carriers: carriersFilter,
        transfers: transfersFilter,
      });
    } catch (err) {
      console.log(err);
    }
    this.setIsFlightsLoading(false);
  };

  setIsFlightsLoading = (bool: boolean) => {
    this.isFlightsLoading = bool;
  };

  setFlights = (flights: FlightResult[]) => {
    this.flights = flights;
  };

  setFilters = (filters: Filters) => {
    this.filters = filters;
  };

  setNumberOfFlightsToShow = (num: number) => {
    this.numberOfFlightsToShow = num;
  };
}
