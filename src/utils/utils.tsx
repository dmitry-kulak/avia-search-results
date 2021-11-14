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

export const renderTransferName = (transfer: number | string) => {
  if (typeof transfer === "string") {
    transfer = parseInt(transfer);
  }

  if (transfer === 0) {
    return "Без пересадок";
  }

  if (transfer === 1) {
    return "1 пересадка";
  }

  if (transfer >= 2 && transfer <= 4) {
    return `${transfer} пересадки`;
  }

  if (transfer >= 5) {
    return `${transfer} пересадок`;
  }
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

  return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${daysOfWeek[dateObj.getDay()]}`;
};

export const daysOfWeek = [
  "вс",
  "пн",
  "вт",
  "ср",
  "чт",
  "пт",
  "сб",
];

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

export const makeTransferFields = (start: number, end: number) => {
  let fields = [];
  for (let i = end; i >= start; i--) {
    fields.push(`${i}-transfers`);
  }

  return fields;
};