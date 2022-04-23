import { v4 as uuid } from "uuid";

import type { FlightResult } from "../../types/flights";
import type { Dispatch, SetStateAction, MouseEvent } from "react";

import styles from "./Flights.module.scss";
import Flight from "../Flight/Flight";
import Spinner from "../Spinner/Spinner";

type FlightsProps = {
  flights: FlightResult[] | null;
  numberOfFlightsToShow: number;
  setNumberOfFlightsToShow: Dispatch<SetStateAction<number>>;
};

const Flights = ({
  flights,
  numberOfFlightsToShow,
  setNumberOfFlightsToShow,
}: FlightsProps) => {
  const renderFlights = (flights: FlightResult[]) => {
    return flights
      .map((currFlight) => {
        const { flight } = currFlight;
        return (
          <Flight
            carrier={flight.carrier.caption}
            legs={flight.legs}
            price={flight.price.total.amount}
            key={uuid()}
          />
        );
      })
      .slice(0, numberOfFlightsToShow);
  };

  const showMore = (e: MouseEvent) => {
    e.preventDefault();
    setNumberOfFlightsToShow(numberOfFlightsToShow + 5);
  };

  const renderShowMoreButton = (flights: FlightResult[] | null) => {
    if (flights && flights.length > 0 && numberOfFlightsToShow < flights.length) {
      return (
        <button className={styles.showMoreButton} onMouseDown={showMore}>
          Показать еще
        </button>
      );
    }

    if (flights && flights.length === 0) {
      return <p className={styles.failure}>Рейсов, увы, нет</p>;
    }
  };

  return (
    <div className={styles.container}>
      {!flights && <Spinner />}
      {flights && renderFlights(flights)}

      {renderShowMoreButton(flights)}
    </div>
  );
};

export default Flights;
