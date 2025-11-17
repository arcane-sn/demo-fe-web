"use client";

import React from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createDummyProduct } from "../actions/dummy-post.actions";
import { FilterOptions } from "../core/const";

interface DummyPostFormProps {
  onSuccess?: (product: any) => void;
}

export function DummyPostForm({ onSuccess }: DummyPostFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(createDummyProduct, null);

  // Handle success/error responses
  React.useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success("Product created successfully!");
        if (onSuccess) {
          onSuccess(state.data);
        } else {
          router.push("/dummy");
        }
      } else {
        toast.error(state.error || "Failed to create product");
      }
    }
  }, [state, onSuccess, router]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter product title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Select name="brand" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {FilterOptions.brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {FilterOptions.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" name="sku" placeholder="Enter SKU" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>

          {/* Pricing and Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" name="stock" type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                placeholder="0.0"
              />
            </div>
          </div>

          {/* Status and Policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availabilityStatus">Availability Status</Label>
              <Select name="availabilityStatus">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {FilterOptions.statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumOrderQuantity">
                Minimum Order Quantity
              </Label>
              <Input
                id="minimumOrderQuantity"
                name="minimumOrderQuantity"
                type="number"
                placeholder="1"
              />
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="warrantyInformation">Warranty Information</Label>
              <Textarea
                id="warrantyInformation"
                name="warrantyInformation"
                placeholder="Enter warranty information"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingInformation">Shipping Information</Label>
              <Textarea
                id="shippingInformation"
                name="shippingInformation"
                placeholder="Enter shipping information"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="returnPolicy">Return Policy</Label>
              <Textarea
                id="returnPolicy"
                name="returnPolicy"
                placeholder="Enter return policy"
                rows={2}
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label htmlFor="images">Image URLs (comma-separated)</Label>
            <Input
              id="images"
              name="images"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Create Product</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
