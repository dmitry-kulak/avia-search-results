import type { Dispatch, SetStateAction } from "react";
import type { FilterBy, Filters } from "../../types/filters";

import styles from "./SearchFilter.module.scss";
import { renderTransferName } from "../../utils/utils";

type CheckboxFieldProps = {
  filterBy: FilterBy;
  filter: string;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

const CheckboxField = ({ filterBy, filter, filters, setFilters }: CheckboxFieldProps) => {
  const renderLabel = (filterBy: FilterBy, filter: string) => {
    if (filterBy === "transfers") {
      return renderTransferName(filter);
    }

    if (filterBy === "carriers") {
      return filter;
    }
  };

  const handleCheckboxChange = () => {
    setFilters({
      ...filters,
      [filterBy]: {
        ...filters[filterBy],
        [filter]: !filters[filterBy][filter],
      },
    });
  };

  return (
    <div className={styles.input}>
      <input
        type="checkbox"
        name={filterBy}
        id={filter}
        onChange={handleCheckboxChange}
        className={styles.checkboxInput}
        checked={filters[filterBy][filter]}
      />
      <label className={styles.checkboxLabel} htmlFor={filter}>
        {renderLabel(filterBy, filter)}
      </label>
    </div>
  );
};

export default CheckboxField;
