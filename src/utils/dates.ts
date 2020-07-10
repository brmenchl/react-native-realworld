import format from "date-fns/format";

export const formatDate = (date: Parameters<typeof format>[0]) =>
  format(date, "MMM d");
