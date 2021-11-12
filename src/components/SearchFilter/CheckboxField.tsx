import React from "react";
import styles from "./SearchFilter.module.scss";
import { CheckboxProps, FilterBy } from "../../types/types";
import { renderTransferName } from "../../utils/utils";


const CheckboxField = ({
  filterBy,
  filter,
  filters,
  setFilters,
}: CheckboxProps) => {

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
      <input type="checkbox" name={filterBy} id={filter}
             onChange={handleCheckboxChange}
             checked={filters[filterBy][filter]}
      />
      <label className={styles.checkboxLabel} htmlFor={filter}>
        {renderLabel(filterBy, filter)}
      </label>
    </div>
  );
};

export default CheckboxField;