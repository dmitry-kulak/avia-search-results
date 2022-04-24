import { always, cond, equals, gte, lte, range, T } from "ramda";

export const convertTime = (time: string | number) => {
  // конвертирует минуты в час/мин
  if (typeof time === "string") {
    time = Number(time);
  }

  const hours = Math.floor(time / 60);
  const minutes = time - hours * 60;

  return [hours, minutes];
};

export const showTimeTotal = (time: string | number) => {
  const [hours, minutes] = convertTime(time);

  return `${hours ? `${hours} ч ` : null}${minutes} мин`;
};

export const renderTransferName = (transfer: string | number) => {
  return cond([
    [equals(0), always("Без пересадок")],
    [equals(1), always("1 пересадка")],
    [gte(2) && lte(4), always(`${transfer} пересадки`)],
    [T, always(`${transfer} пересадки`)],
  ])(parseInt(transfer.toString()));
};

export const convertDateToTime = (date: string) => {
  const dateObj = new Date(date);

  const addPad = (num: number) => {
    return num < 10 ? String(num).padStart(2, "0") : num;
  };

  return `${addPad(dateObj.getHours())}:${addPad(dateObj.getMinutes())}`;
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${
    daysOfWeek[dateObj.getDay()]
  }`;
};

export const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export const months = [
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

export const makeTransferFields = (end: number) => {
  return range(0, end + 1).map((i) => `${i}-transfers`);
};
