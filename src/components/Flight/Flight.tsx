import type { LegType } from "../../types/flights";

import styles from "./Flight.module.scss";
import Leg from "../Leg/Leg";

type FlightProps = {
  carrier: string;
  price: string;
  legs: LegType[];
};

const Flight = ({ carrier, legs, price }: FlightProps) => {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <span>{carrier}</span>

        <div className={styles.right}>
          <span className={styles.price}>{price} ₽</span>
          <span>Стоимость для одного взрослого пассажира</span>
        </div>
      </header>

      <Leg leg={legs[0]} />

      {legs.length > 1 && (
        <>
          <span className={styles.separationLine} />
          <Leg leg={legs[1]} />
        </>
      )}
      <button className={styles.chooseButton}>ВЫБРАТЬ</button>
    </div>
  );
};

export default Flight;
