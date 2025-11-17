import type { PaginationState } from "@tanstack/react-table";

export const InitialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};

export const InitialQueryRequestContext = {
  pagination: InitialPagination,
  setPagination: () => {},
  params: {},
  setParams: () => {},
  url: "/api/products",
  setUrl: () => {},
};

export const FilterOptions = {
  categories: [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
  ],
  brands: [
    "Apple",
    "Samsung",
    "OPPO",
    "Huawei",
    "Microsoft",
    "Infinix",
    "HP",
    "Dell",
    "Lenovo",
    "Asus",
  ],
  statuses: ["In Stock", "Low Stock", "Out of Stock"],
};
