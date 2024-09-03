export const getCurrentDateTime = (): string => {
  const offset = 1000 * 60 * 60 * 9;

  const datetime = new Date();

  datetime.setTime(datetime.getTime() + offset);

  const [date, time] = datetime.toISOString().split("T");

  return `${date} ${time}`;
};
