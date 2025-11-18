"use client";

export interface TimestampItem {
  label: string;
  date: string;
  time: string;
}

interface TimestampsCardProps {
  timestamps: TimestampItem[];
  className?: string;
}

export function TimestampsCard({ timestamps, className }: TimestampsCardProps) {
  return (
    <div className={`bg-light rounded-xl border border-gray-300 shadow-sm ${className || ""}`}>
      <div className="px-8 py-5 border-b border-gray-300">
        <div className="text-h-18-18-600 text-dark">Timestamps</div>
      </div>
      <div className="px-8 pb-8 pt-5 flex flex-col gap-5">
        {timestamps.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-32 text-b-13-20-400 text-gray-500">
              {item.label}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-b-14-22-500 text-dark">
                {item.date}
              </div>
              <div className="text-b-13-14-400 text-gray-500">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

