import { PaymentChannel } from "../models";

interface DonutPathParams {
  value: number;
  index: number;
  currentAngle: number;
  outerRadius: number;
  innerRadius: number;
  centerX: number;
  centerY: number;
}

interface DonutPathResult {
  pathData: string;
  newAngle: number;
}

/**
 * Calculate donut chart path for SVG
 * @param params - Parameters for donut path calculation
 * @returns Path data and new angle
 */
export const calculateDonutPath = ({
  value,
  index,
  currentAngle,
  outerRadius,
  innerRadius,
  centerX,
  centerY,
}: DonutPathParams): DonutPathResult => {
  const percentage = value / 100;
  const angle = percentage * 360;
  const startAngle = currentAngle;
  const endAngle = currentAngle + angle;

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

  return {
    pathData,
    newAngle: endAngle,
  };
};

/**
 * Calculate text position for percentage labels in donut chart
 * @param value - Percentage value
 * @param midAngle - Mid angle position (startAngle + angle/2)
 * @param outerRadius - Outer radius of donut
 * @param innerRadius - Inner radius of donut
 * @param centerX - X coordinate of center
 * @param centerY - Y coordinate of center
 * @returns X and Y coordinates for text
 */
export const getTextPosition = (
  value: number,
  midAngle: number,
  outerRadius: number,
  innerRadius: number,
  centerX: number,
  centerY: number
): { x: number; y: number } => {
  const midAngleRad = (midAngle * Math.PI) / 180;

  const textRadius = (outerRadius + innerRadius) / 2;
  const x = centerX + textRadius * Math.cos(midAngleRad);
  const y = centerY + textRadius * Math.sin(midAngleRad);

  return { x, y };
};

/**
 * Calculate angles for all payment channels in donut chart
 * @param channels - Array of payment channels
 * @returns Array of angles for each channel
 */
export const calculateChannelAngles = (
  channels: PaymentChannel[]
): number[] => {
  let currentAngle = 0;
  return channels.map((channel) => {
    const percentage = channel.value / 100;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return startAngle;
  });
};

