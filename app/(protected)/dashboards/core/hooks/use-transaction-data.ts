import { useState } from "react";
import { ApexOptions } from "apexcharts";
import { TransactionChartState } from "../models";
import { MONTHS, CHART_COLORS, CHART_CONFIG } from "../constants";
import { formatCurrencyUSD } from "../helpers";

const DEFAULT_SERIES = [
  {
    name: "Paid",
    data: [10, 10, 4, 33, 5, 16, 2, 2, 26, 4, 26, 26],
  },
  {
    name: "Settled",
    data: [27, 12, 21, 8, 20, 31, 17, 26, 12, 21, 7, 16],
  },
];

export const useTransactionData = () => {
  const [state] = useState<TransactionChartState>({
    series: DEFAULT_SERIES,
    options: {
      chart: {
        height: CHART_CONFIG.HEIGHT,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      colors: [CHART_COLORS.PAID, CHART_COLORS.SETTLED],
      xaxis: {
        type: "category",
        categories: MONTHS,
      },
      yaxis: {
        min: CHART_CONFIG.Y_AXIS_MIN,
        max: CHART_CONFIG.Y_AXIS_MAX,
        labels: {
          formatter: (defaultValue: number) => {
            return `${defaultValue}k`;
          },
        },
      },
      tooltip: {
        enabled: true,
        custom({ series, seriesIndex, dataPointIndex, w }) {
          const value = series[seriesIndex][dataPointIndex];
          const month = w.globals.categoryLabels[dataPointIndex];
          const monthName = month || "";
          const seriesName = w.globals.seriesNames[seriesIndex];

          const formattedNumber = formatCurrencyUSD(value);

          return `
            <div class="flex flex-col gap-2 p-3.5 bg-white rounded-lg shadow-lg border border-gray-200">
              <div class="font-medium text-sm text-gray-600">${monthName}, 2024 ${seriesName}</div>
              <div class="flex items-center gap-1.5">
                <div class="font-semibold text-base text-gray-900">${formattedNumber}</div>
                <span class="rounded-full border border-green-200 font-medium text-green-700 bg-green-100 text-[11px] leading-none px-1.25 py-1">+24%</span>
              </div>
            </div>
            `;
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: CHART_CONFIG.GRADIENT_OPACITY_FROM,
          opacityTo: CHART_CONFIG.GRADIENT_OPACITY_TO,
          stops: [0, 100],
        },
      },
    } as ApexOptions,
  });

  return {
    chartState: state,
  };
};

