import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstLettersOfName(name: string | null | undefined) {
  if (!name) return "NA";
  if (name.length < 3) return name;
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
}

export function sluggify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
