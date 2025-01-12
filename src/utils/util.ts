export const sortData = <T,>(
  data: T[],
  sortBy: keyof T,
  direction: "asc" | "desc"
): T[] => {
  return [...data].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return direction === "asc" ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};
