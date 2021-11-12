import React from "react";
import styles from "./Leg.module.scss";
import { LegInterface } from "../../types/types";
import {
  convertDateToTime,
  renderTransferName,
  showTimeTotal,
  formatDate,
} from "../../utils/utils";


const Leg = ({ leg }: { leg: LegInterface },
) => {
  // also known as the last segment
  const segmentsTotal = leg.segments.length - 1;

  return (
    <article className={styles.schedule}>
      <div className={styles.airports}>
        {/*Место вылета*/}
        <span className={styles.airportsDeparture}>
            {leg.segments[0].departureCity?.caption},&nbsp;
          {leg.segments[0].departureAirport.caption}&nbsp;
          <button className={styles.IATA}>
              {leg.segments[0].departureAirport.uid}
            </button>
          </span>

        {/*Место прибытия*/}
        <span className={styles.airportsArrival}>
            {leg.segments[segmentsTotal].arrivalCity?.caption},&nbsp;
          {leg.segments[segmentsTotal].arrivalAirport.caption}&nbsp;
          <button className={styles.IATA}>
              {leg.segments[segmentsTotal].arrivalAirport.uid}
            </button>
          </span>
      </div>


      <div className={styles.time}>
        {/*Время вылета*/}
        <span className={styles.timeDeparture}>
            {convertDateToTime(leg.segments[0].departureDate)}
          <button className={styles.date}>
              {formatDate(leg.segments[0].departureDate)}
            </button>
          </span>

        {/*Всего времени на перелет*/}
        <span className={styles.timeTotal}>
            {showTimeTotal(leg.duration)}
          </span>

        {/*Время прибытия*/}
        <span className={styles.timeArrival}>
            <button className={styles.date}>
              {formatDate(leg.segments[segmentsTotal].arrivalDate)}
            </button>
          {convertDateToTime(leg.segments[segmentsTotal].arrivalDate)}
          </span>
      </div>

      <div className={styles.transfers}>
        {renderTransferName(segmentsTotal)}
      </div>
      <div className={styles.company}>
        Рейс выполняет: {leg.segments[0].airline.caption}
      </div>
    </article>
  );
};

export default Leg;