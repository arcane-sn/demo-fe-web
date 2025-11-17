import { StatsCardData } from "../core/_models";

interface StatsCardProps {
  data: StatsCardData;
}

export function StatsCard({ data }: StatsCardProps) {
  return (
    <div className="px-4 py-3 rounded-md border border-gray-300 flex flex-col gap-2 min-w-48">
      <div className="text-b-16-16-500 text-dark">{data.value}</div>
      <div className="text-b-14-22-400 text-gray-600">{data.title}</div>
    </div>
  );
}
