"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePaymentChannels } from "../core/hooks";
import {
  calculateDonutPath,
  getTextPosition,
  calculateChannelAngles,
} from "../core/helpers";

const DONUT_CONFIG = {
  outerRadius: 90,
  innerRadius: 65,
  centerX: 125,
  centerY: 125,
} as const;

const TopChannel = () => {
  const { channels, hoveredSlice, setHoveredSlice } = usePaymentChannels();

  // Calculate angles for all channels
  const channelAngles = calculateChannelAngles(channels);

  return (
    <Card>
      <CardContent className="p-6 ">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Top Payment Channel
          </h3>
        </div>

        <div className="w-full flex items-center justify-center gap-4 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg
                width="225"
                height="225"
                viewBox="0 0 225 225"
                className="overflow-visible"
              >
                {/* Donut slices */}
                {channels.map((item, index) => {
                  const startAngle = channelAngles[index];
                  const { pathData, newAngle } = calculateDonutPath({
                    value: item.value,
                    index,
                    currentAngle: startAngle,
                    outerRadius: DONUT_CONFIG.outerRadius,
                    innerRadius: DONUT_CONFIG.innerRadius,
                    centerX: DONUT_CONFIG.centerX,
                    centerY: DONUT_CONFIG.centerY,
                  });

                  // Calculate mid angle for text position
                  const midAngle = startAngle + (item.value / 100) * 360 / 2;
                  const textPos = getTextPosition(
                    item.value,
                    midAngle,
                    DONUT_CONFIG.outerRadius,
                    DONUT_CONFIG.innerRadius,
                    DONUT_CONFIG.centerX,
                    DONUT_CONFIG.centerY
                  );

                  return (
                    <g key={index}>
                      <path
                        d={pathData}
                        fill={item.color}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className={`transition-all duration-200 ${
                          hoveredSlice === index ? "opacity-80" : "opacity-100"
                        }`}
                        onMouseEnter={() => setHoveredSlice(index)}
                        onMouseLeave={() => setHoveredSlice(null)}
                        style={{ cursor: "pointer" }}
                      />
                      {/* Percentage text */}
                      <text
                        x={textPos.x}
                        y={textPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white text-[10px] font-semibold pointer-events-none"
                      >
                        {item.value}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-start justify-items-start gap-6 mt-6">
            {channels.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopChannel;

