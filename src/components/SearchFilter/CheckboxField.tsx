import { useContext } from "react";
import { observer } from "mobx-react-lite";

import type { FilterBy } from "../../types/filters";

import styles from "./SearchFilter.module.scss";
import { renderTransferName } from "../../utils/utils";
import { AppContext } from "../../index";

type CheckboxFieldProps = {
  filterBy: FilterBy;
  filter: string;
};

const renderLabel = (filterBy: FilterBy, filter: string) => {
  if (filterBy === "transfers") {
    return renderTransferName(filter);
  }

  if (filterBy === "carriers") {
    return filter;
  }
};

export const CheckboxField = observer(({ filterBy, filter }: CheckboxFieldProps) => {
  const { filters, setFilters } = useContext(AppContext);

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
});

CheckboxField.displayName = "CheckboxField";
