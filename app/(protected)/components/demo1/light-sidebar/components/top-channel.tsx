import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const TopChannel = () => {
  const data = [
    { label: "QRIS", value: 35, color: "#3B82F6" },
    { label: "VA BCA", value: 25, color: "#10B981" },
    { label: "DANA", value: 20, color: "#F59E0B" },
    { label: "ShopeePay", value: 12, color: "#EF4444" },
    { label: "VA Permata", value: 8, color: "#8B5CF6" },
  ];

  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  // Calculate donut chart paths
  const outerRadius = 90;
  const innerRadius = 65; // This creates the hollow center
  const centerX = 125;
  const centerY = 125;
  let currentAngle = 0;

  const createDonutPath = (value: number, index: number) => {
    const percentage = value / 100;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    currentAngle += angle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    // Outer arc coordinates
    const x1 = centerX + outerRadius * Math.cos(startAngleRad);
    const y1 = centerY + outerRadius * Math.sin(startAngleRad);
    const x2 = centerX + outerRadius * Math.cos(endAngleRad);
    const y2 = centerY + outerRadius * Math.sin(endAngleRad);

    // Inner arc coordinates
    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`, // Start at outer edge
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
      `L ${x3} ${y3}`, // Line to inner edge
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Inner arc (reverse direction)
      "Z", // Close path
    ].join(" ");

    return pathData;
  };

  // Calculate text position for percentage labels
  const getTextPosition = (value: number, index: number) => {
    const percentage = value / 100;
    const angle = percentage * 360;
    const midAngle = currentAngle - angle / 2;
    const midAngleRad = (midAngle * Math.PI) / 180;

    const textRadius = (outerRadius + innerRadius) / 2; // Position text in the middle of the donut
    const x = centerX + textRadius * Math.cos(midAngleRad);
    const y = centerY + textRadius * Math.sin(midAngleRad);

    return { x, y };
  };

  // Reset currentAngle for text positioning
  currentAngle = 0;

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
                {data.map((item, index) => {
                  const pathData = createDonutPath(item.value, index);
                  const textPos = getTextPosition(item.value, index);

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
            {data.map((item, index) => (
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
