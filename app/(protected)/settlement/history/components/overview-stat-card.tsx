"use client";

interface OverviewStatCardProps {
  value: string;
  title: string;
}

export function OverviewStatCard({ value, title }: OverviewStatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-1">
      <div className="text-slate-900 text-2xl font-semibold">{value}</div>
      <div className="text-slate-600 text-sm font-normal text-center">{title}</div>
    </div>
  );
}

export default OverviewStatCard;

