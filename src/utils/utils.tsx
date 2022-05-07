import { always, cond, equals, gt, gte, lte, range, T, unless } from "ramda";

export const convertTime = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const min = minutes - hrs * 60;

  return [hrs, min];
};

export const showTimeTotal = (time: number) => {
  const [hours, minutes] = convertTime(time);

  return hours ? `${hours} ч ` : "" + `${minutes} мин`;
};

export const renderTransferName = (transfer: string | number) => {
  return cond([
    [equals(0), always("Без пересадок")],
    [equals(1), always("1 пересадка")],
    [gte(2) && lte(4), always(`${transfer} пересадки`)],
    [T, always(`${transfer} пересадки`)],
  ])(Number.parseInt(transfer.toString()));
};

export const convertDateToTime = (date: string) => {
  const dateObject = new Date(date);

  const addPad = unless(gt(10), (number) => number.toString().padStart(2, "0"));

  return `${addPad(dateObject.getHours())}:${addPad(dateObject.getMinutes())}`;
};

export const formatDate = (date: string) => {
  const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

  const months = [
    "янв.",
    "фел.",
    "мар.",
    "апр.",
    "май",
    "июн.",
    "июл.",
    "авг.",
    "сен.",
    "окт.",
    "ноя.",
    "дек.",
  ];
  const dateObject = new Date(date);

  return `${dateObject.getDate()} ${months[dateObject.getMonth()]} ${
    daysOfWeek[dateObject.getDay()]
  }`;
};

export const makeTransferFields = (end: number) => {
  return range(0, end + 1).map((index) => `${index}-transfers`);
};
