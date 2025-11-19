import { Merchant, MerchantSortBy } from "../models";

/**
 * Sort merchants by amount or volume
 * @param merchants - Array of merchants to sort
 * @param sortBy - Sort criteria ("byAmount" or "byVolume")
 * @returns Sorted array of merchants
 */
export const sortMerchants = (
  merchants: Merchant[],
  sortBy: MerchantSortBy
): Merchant[] => {
  return [...merchants].sort((a, b) => {
    if (sortBy === "byAmount") {
      return b.amount - a.amount;
    } else {
      return b.volume - a.volume;
    }
  });
};

