import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";

import type { FlightResult } from "../../types/flights";

import styles from "./Flights.module.scss";
import { Flight } from "../Flight/Flight";
import { Spinner } from "../Spinner/Spinner";
import { AppContext } from "../../index";

export const Flights = observer(() => {
  const {
    isFlightsLoading,
    filteredFlights,
    numberOfFlightsToShow,
    setNumberOfFlightsToShow,
  } = useContext(AppContext);

  const renderFlights = (flights: FlightResult[]) => {
    return flights
      .map((currentFlight) => {
        const { flight } = currentFlight;
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

  const showMore = () => {
    setNumberOfFlightsToShow(numberOfFlightsToShow + 5);
  };

  const renderShowMoreButton = (flights: FlightResult[]) => {
    if (flights.length > 0 && numberOfFlightsToShow < flights.length) {
      return (
        <button className={styles.showMoreButton} onMouseDown={showMore}>
          Показать еще
        </button>
      );
    }

    if (flights.length === 0) {
      return <p className={styles.failure}>Рейсов, увы, нет</p>;
    }
  };

  return (
    <div className={styles.container}>
      {isFlightsLoading ? <Spinner /> : renderFlights(filteredFlights)}

      {renderShowMoreButton(filteredFlights)}
    </div>
  );
});

Flights.displayName = "Flights";
