"use client";

import React from "react";
import ApexChart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionData } from "../core/hooks";

const TransactionHighlight = () => {
  const { chartState } = useTransactionData();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Transaction Highlight</CardTitle>
        <div className="flex gap-5">
          <Select defaultValue="1">
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="w-28">
              <SelectItem value="1">1 month</SelectItem>
              <SelectItem value="3">3 months</SelectItem>
              <SelectItem value="6">6 months</SelectItem>
              <SelectItem value="12">12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-end items-stretch grow px-3 py-4">
        <div className="[&_.apexcharts-legend]:!flex-row [&_.apexcharts-legend]:!flex [&_.apexcharts-legend]:!justify-center [&_.apexcharts-legend]:!pt-2">
          <ApexChart
            options={chartState.options}
            series={chartState.series}
            type="area"
            height={350}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export { TransactionHighlight };

