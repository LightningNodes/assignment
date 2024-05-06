import { Contract } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(symbol: string): string {
  // these images were not loading
  const exceptions = ["XLMINR", "1000SHIBINR"];
  if (exceptions.includes(symbol)) {
    symbol = "bnbINR";
  }
  return `https://pi42.com/_next/image?url=https://storage.googleapis.com/pi42-dev-static/contract-icons/${symbol
    .replace(/INR/g, "")
    .toLowerCase()}.png&w=32&q=75`;
}

export function calculate24hrHighLow(lastPrice: number, changePercent: number) {
  // Handle potential non-numeric input
  if (isNaN(lastPrice) || isNaN(changePercent)) {
    return {
      high: "",
      low: "",
    };
  }

  const change = (lastPrice * changePercent) / 100;

  const absChange = Math.abs(change);

  return {
    high: (change >= 0
      ? lastPrice + absChange
      : lastPrice - absChange
    ).toString(),
    low: (change >= 0
      ? lastPrice - absChange
      : lastPrice + absChange
    ).toString(),
  };
}

export function formatCurrency(value: number) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
}

export function encodeString(obj: Contract) {
  if (!obj) return "";
  let result = "";
  for (const [key, value] of Object.entries(obj)) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);
    result += `${encodedKey}:${encodedValue}%0A`;
  }
  return result.trim();
}
