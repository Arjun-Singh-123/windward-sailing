import {
  RawSpecificationData,
  SpecificationCategory,
} from "@/components/sections/specification";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertSpecificationData(
  data: RawSpecificationData
): SpecificationCategory[] {
  return Object.entries(data).map(([title, specs]) => ({
    title,
    specs: Array.isArray(specs) ? specs : [],
  }));
}

export function titleFormatter(title: string) {
  const titleParts = title.split(" - ");
  const firstPart = titleParts[0].toUpperCase();
  const secondPart = titleParts[1];

  return { firstPart, secondPart };
}
