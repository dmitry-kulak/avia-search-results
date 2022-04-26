import { useContext, useTransition } from "react";
import { observer } from "mobx-react-lite";

import type {
  Carriers,
  FilterBy,
  SortByDir,
  SortByValue,
  Transfers,
} from "../../types/filters";
import type { ChangeEvent } from "react";

import styles from "./SearchFilter.module.scss";
import { CheckboxField } from "./CheckboxField";
import { Spinner } from "../Spinner/Spinner";
import { AppContext } from "../../index";

export const SearchFilter = observer(() => {
  const { setFilters, filters, isFlightsLoading } = useContext(AppContext);
  const [, startTransition] = useTransition();
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as SortByValue;
    const dir = e.target.getAttribute("data-dir") as SortByDir;

    setFilters({ ...filters, sortBy: { value, dir } });
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() =>
      setFilters({ ...filters, [e.target.name]: Number(e.target.value) })
    );
  };

  const renderCheckboxes = (filterBy: FilterBy, filter: Transfers | Carriers) => {
    if (isFlightsLoading) {
      return <Spinner />;
    }

    return Object.entries(filter).map((property) => (
      <CheckboxField filterBy={filterBy} filter={property[0]} key={property[0]} />
    ));
  };

  return (
    <div className={styles.filter}>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <p className={styles.title}>Сортировать</p>
          <div className={styles.input}>
            <input
              type="radio"
              name="sortBy"
              value="price"
              id="price, ASC"
              data-dir="ASC"
              onChange={handleRadioChange}
              className={styles.radioInput}
              checked={filters.sortBy.value === "price" && filters.sortBy.dir === "ASC"}
            />
            <label className={styles.radioLabel} htmlFor="price, ASC">
              по возрастанию цены
            </label>
          </div>

          <div className={styles.input}>
            <input
              type="radio"
              name="sortBy"
              value="price"
              id="price, DESC"
              data-dir="DESC"
              onChange={handleRadioChange}
              className={styles.radioInput}
              checked={filters.sortBy.value === "price" && filters.sortBy.dir === "DESC"}
            />
            <label className={styles.radioLabel} htmlFor="price, DESC">
              по убыванию цены
            </label>
          </div>

          <div className={styles.input}>
            <input
              type="radio"
              name="sortBy"
              value="time"
              id="time, ASC"
              data-dir="ASC"
              onChange={handleRadioChange}
              className={styles.radioInput}
              checked={filters.sortBy.value === "time" && filters.sortBy.dir === "ASC"}
            />
            <label className={styles.radioLabel} htmlFor="time, ASC">
              по времени в пути
            </label>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.title}>Фильтровать</p>
          {renderCheckboxes("transfers", filters.transfers)}
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.title}>Цена</p>
          <div className={styles.input}>
            <label className={styles.priceInputLabel} htmlFor="priceFrom">
              От
            </label>
            <input
              className={styles.priceInput}
              type="text"
              name="priceFrom"
              id="priceFrom"
              defaultValue={filters.priceFrom}
              onChange={handleNumberChange}
            />
          </div>

          <div className={styles.input}>
            <label className={styles.priceInputLabel} htmlFor="priceTo">
              До
            </label>
            <input
              className={styles.priceInput}
              type="text"
              name="priceTo"
              id="priceTo"
              defaultValue={filters.priceTo}
              onChange={handleNumberChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.title}>Авиакомпании</p>
          {renderCheckboxes("carriers", filters.carriers)}
        </div>
      </form>
    </div>
  );
});

SearchFilter.displayName = "SearchFilter";
