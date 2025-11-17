"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";
import { useQueryRequestProvider } from "../core/context";
import { useRouter, useSearchParams } from "next/navigation";

export function FilterControls() {
  const { params, setParams } = useQueryRequestProvider();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (newParams: Record<string, any>) => {
    const updatedParams = { ...params, ...newParams };
    setParams(updatedParams);

    // Update URL
    const newSearchParams = new URLSearchParams();
    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        newSearchParams.set(key, String(value));
      }
    });

    router.push(`/dummy?${newSearchParams.toString()}`);
  };

  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "skincare",
    "groceries",
    "home-decoration",
    "tops",
  ];

  const brands = [
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
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Products</Label>
          <Input
            id="search"
            placeholder="Search by title, brand, or category..."
            value={params.search || ""}
            onChange={(e) => updateParams({ search: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={params.category || undefined}
              onValueChange={(value) =>
                updateParams({ category: value || undefined })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select
              value={params.brand || undefined}
              onValueChange={(value) =>
                updateParams({ brand: value || undefined })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={params.priceMin || ""}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      priceMin: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={params.priceMax || ""}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      priceMax: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <Label>Min Rating: {params.rating || 0}</Label>
            <Slider
              value={[params.rating || 0]}
              onValueChange={([value]) => updateParams({ rating: value })}
              max={5}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {
              Object.keys(params).filter(
                (key) =>
                  key !== "limit" &&
                  key !== "skip" &&
                  params[key as keyof typeof params]
              ).length
            }{" "}
            filters active
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setParams({});
              router.push("/dummy");
            }}
            disabled={
              Object.keys(params).filter(
                (key) =>
                  key !== "limit" &&
                  key !== "skip" &&
                  params[key as keyof typeof params]
              ).length === 0
            }
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
