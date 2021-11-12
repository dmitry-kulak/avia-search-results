import React, { useState } from "react";
import { v4 as uuid } from "uuid";


import styles from "./Flights.module.scss";
import Flight from "../Flight/Flight";
import { FlightResult } from "../../types/types";


const Flights = ({
  flights,
}: { flights: FlightResult[] | null }) => {
  const [numberOfFlights, setNumberOfFlights] = useState(5);


  const renderFlights = (flights: FlightResult[]) => {
    return flights.map(currFlight => {
      const { flight } = currFlight;
      return (
        <Flight
          carrier={flight.carrier.caption}
          legs={flight.legs}
          price={flight.price.total.amount}
          key={uuid()}
        />);
    }).slice(0, numberOfFlights);
  };

  const showMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setNumberOfFlights(numberOfFlights + 5);
  };

  return (
    <div className={styles.container}>
      {flights && renderFlights(flights)}
      <button className={styles.showMoreButton}
              onMouseDown={showMore}>
        Показать еще
      </button>
    </div>
  );
};

export default Flights;