import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
