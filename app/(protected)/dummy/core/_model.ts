import type { PaginationState } from "@tanstack/react-table";

export interface ParamsFilterDummy {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  rating?: number;
  stock?: number;
  search?: string;
  limit?: number;
  skip?: number;
}

export interface QueryRequestContextTypes {
  pagination: PaginationState;
  setPagination: (
    pagination: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void;
  params: ParamsFilterDummy;
  setParams: (params: ParamsFilterDummy) => void;
  url: string;
  setUrl: (url: string) => void;
}

export interface DummyProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface DummyListModel {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyListFilter {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  rating?: number;
  stock?: number;
  search?: string;
  limit?: number;
  skip?: number;
}
