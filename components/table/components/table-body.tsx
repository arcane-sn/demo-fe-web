import React from "react";
import { CardTable } from "@/components/ui/card";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { EmptyState, EmptyStates } from "@/components/ui/empty-state";
import { Loader2 } from "lucide-react";
import { EmptyStateConfig } from "../types";
import Image from "next/image";

interface TableBodyProps {
  loading?: boolean;
  error?: string;
  emptyStateConfig?: EmptyStateConfig;
  hasData?: boolean;
  children?: React.ReactNode;
}

export function TableBody({
  loading,
  error,
  emptyStateConfig,
  hasData = true,
  children,
}: TableBodyProps) {
  if (loading) {
    return (
      <CardTable>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      </CardTable>
    );
  }

  if (error) {
    return (
      <CardTable>
        <div className="flex items-center justify-center py-12">
          <Alert variant="destructive">
            <AlertIcon>
              <AlertTitle>Error loading data</AlertTitle>
            </AlertIcon>
            <p className="text-sm">{error}</p>
          </Alert>
        </div>
      </CardTable>
    );
  }

  // Show empty state if no data and empty state config is provided
  if (!hasData && emptyStateConfig) {
    return (
      <CardTable>
        <div className="relative">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/image/bg.svg"
              alt="Background"
              fill
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="flex items-center justify-center">
            {renderEmptyState(emptyStateConfig)}
          </div>
        </div>
        {/* Background Image */}
      </CardTable>
    );
  }

  return (
    <CardTable>
      <ScrollArea>
        <DataGridTable />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CardTable>
  );
}

// Helper function to render empty state based on configuration
function renderEmptyState(config: EmptyStateConfig) {
  const { type, ...customProps } = config;

  // Use predefined empty states if type is specified
  switch (type) {
    case "noData":
      return <EmptyStates.NoData {...customProps} />;
    case "noMerchants":
      return <EmptyStates.NoMerchants {...customProps} />;
    case "noUsers":
      return <EmptyStates.NoUsers {...customProps} />;
    case "noTransactions":
      return <EmptyStates.NoTransactions {...customProps} />;
    case "noSearchResults":
      return <EmptyStates.NoSearchResults {...customProps} />;
    case "error":
      return <EmptyStates.Error {...customProps} />;
    default:
      // Use custom empty state if no type specified
      return (
        <EmptyState title={config.title || "No Data Available"} {...config} />
      );
  }
}
