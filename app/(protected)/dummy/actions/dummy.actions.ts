"use server";

import { DummyListFilter } from "../core/_model";

export async function getDummyProducts(filters: DummyListFilter = {}) {
  try {
    // Build query parameters for DummyJSON API
    const params = new URLSearchParams();

    if (filters.category) params.append("category", filters.category);
    if (filters.priceMin)
      params.append("price_gte", filters.priceMin.toString());
    if (filters.priceMax)
      params.append("price_lte", filters.priceMax.toString());
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.skip) params.append("skip", filters.skip.toString());
    if (filters.search) params.append("q", filters.search);

    const url = `https://dummyjson.com/products?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.products) {
      throw new Error("Invalid response format from API");
    }

    return data;
  } catch (error) {
    console.error("Error fetching dummy products:", error);
    throw new Error("Failed to fetch products");
  }
}
