"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { DummyTable } from "./dummy-table";
import { FilterControls } from "./filter-controls";
import {
  DummyProduct,
  DummyListModel,
  ParamsFilterDummy,
} from "../core/_model";
import { Button } from "@/components/ui/button";
import { RefreshCw, Filter, Plus } from "lucide-react";
import { useQueryRequestProvider } from "../core/context";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

interface DummyListContentClientProps {
  initialData: DummyListModel | null;
  initialError: string | null;
}

export function DummyListContentClient({
  initialData,
  initialError,
}: DummyListContentClientProps) {
  const [selectedProducts, setSelectedProducts] = useState<DummyProduct[]>([]);
  const { params, setParams } = useQueryRequestProvider();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const data = initialData;
  const isLoading = false; // No loading state needed since data is server-side
  const error = initialError;

  const handleView = useCallback((product: DummyProduct) => {
    console.log("View product:", product);
    toast.info(`Viewing ${product.title}`);
  }, []);

  const handleEdit = useCallback((product: DummyProduct) => {
    console.log("Edit product:", product);
    toast.info(`Editing ${product.title}`);
  }, []);

  const handleDelete = useCallback((product: DummyProduct) => {
    if (
      confirm(
        `Are you sure you want to delete ${product.title}? This action cannot be undone.`
      )
    ) {
      console.log("Delete product:", product);
      toast.success(`${product.title} deleted successfully`);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    // Refresh by navigating to the same page with current params
    const newSearchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        newSearchParams.set(key, String(value));
      }
    });

    router.push(`/dummy?${newSearchParams.toString()}`);
    toast.success("Data refreshed successfully");
  }, [params, router]);

  const handleSelectionChange = useCallback((selected: DummyProduct[]) => {
    if (isMountedRef.current) {
      setSelectedProducts(selected);
      console.log("Selected products:", selected);
    }
  }, []);

  const handlePageChange = useCallback(
    (newPagination: any) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(
        "skip",
        String(newPagination.pageIndex * newPagination.pageSize)
      );
      newSearchParams.set("limit", String(newPagination.pageSize));

      router.push(`/dummy?${newSearchParams.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">
            Browse and manage products from DummyJSON API
            {data && (
              <span className="ml-2 text-blue-600">
                ({data.total} total products)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/dummy/post")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Product
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <FilterControls />

      {/* Filter Summary */}
      {Object.keys(params).length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-800">
            Active Filters:
          </span>
          {Object.entries(params).map(([key, value]) => {
            if (!value) return null;
            return (
              <span
                key={key}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {key}: {String(value)}
              </span>
            );
          })}
        </div>
      )}

      {/* Table */}
      <DummyTable
        data={data?.products || []}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectionChange={handleSelectionChange}
        loading={isLoading}
        error={error || undefined}
      />

      {/* Pagination Info */}
      {data && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>
            Showing {data.skip + 1} to{" "}
            {Math.min(data.skip + data.limit, data.total)} of {data.total}{" "}
            products
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handlePageChange({
                  pageIndex: Math.max(0, data.skip / data.limit - 1),
                  pageSize: data.limit,
                })
              }
              disabled={data.skip <= 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handlePageChange({
                  pageIndex: data.skip / data.limit + 1,
                  pageSize: data.limit,
                })
              }
              disabled={data.skip + data.limit >= data.total}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
