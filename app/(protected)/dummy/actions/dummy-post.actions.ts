"use server";

import { DummyProduct } from "../core/_model";

export interface CreateDummyProductData {
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  stock: number;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
}

export interface CreateDummyProductResponse {
  success: boolean;
  data?: DummyProduct;
  error?: string;
}

export async function createDummyProduct(
  prevState: CreateDummyProductResponse | null,
  formData: FormData
): Promise<CreateDummyProductResponse> {
  try {
    // Extract form data
    const productData: CreateDummyProductData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      price: Number(formData.get("price")),
      brand: formData.get("brand") as string,
      stock: Number(formData.get("stock")),
      sku: formData.get("sku") as string,
      weight: Number(formData.get("weight")),
      warrantyInformation: formData.get("warrantyInformation") as string,
      shippingInformation: formData.get("shippingInformation") as string,
      availabilityStatus: formData.get("availabilityStatus") as string,
      returnPolicy: formData.get("returnPolicy") as string,
      minimumOrderQuantity: Number(formData.get("minimumOrderQuantity")),
      images: (formData.get("images") as string)?.split(",") || [],
      thumbnail: formData.get("thumbnail") as string,
    };

    // Validate required fields
    if (
      !productData.title ||
      !productData.description ||
      !productData.category
    ) {
      return {
        success: false,
        error: "Title, description, and category are required",
      };
    }

    // Call external API to create product
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`);
    }

    const createdProduct = await response.json();

    // Transform the response to match our DummyProduct interface
    const transformedProduct: DummyProduct = {
      ...createdProduct,
      id: createdProduct.id.toString(),
      dimensions: createdProduct.dimensions || {
        width: 0,
        height: 0,
        depth: 0,
      },
      reviews: createdProduct.reviews || [],
      meta: createdProduct.meta || {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        barcode: "",
        qrCode: "",
      },
    };

    return {
      success: true,
      data: transformedProduct,
    };
  } catch (error) {
    console.error("Error creating dummy product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
