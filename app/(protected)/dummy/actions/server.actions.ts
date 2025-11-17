"use server";

import { getDummyProducts } from "../actions/dummy.actions";
import type { DummyListFilter } from "../core/_model";

export async function getDummyProductsServer(filters: DummyListFilter = {}) {
  try {
    const data = await getDummyProducts(filters);
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching dummy products:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
