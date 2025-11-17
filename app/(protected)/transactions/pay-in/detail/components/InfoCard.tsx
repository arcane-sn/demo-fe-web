import { KeenIcon } from "@/components/keenicons";
import { InfoCardItem } from "../core/_models";

interface InfoCardProps {
  title: string;
  items: InfoCardItem[];
}

export function InfoCard({ title, items }: InfoCardProps) {
  return (
    <div className="bg-light rounded-xl border border-gray-300 shadow-sm">
      <div className="px-8 py-5 border-b border-gray-300">
        <div className="text-h-18-18-600 text-dark">{title}</div>
      </div>
      <div className="px-8 pb-8 pt-5 flex flex-col gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-gray-200 pb-4"
          >
            <div className="w-32 text-b-13-20-400 text-gray-600">
              {item.label}
            </div>
            <div className="flex-1 flex items-center gap-3">
              <div className="text-b-14-22-500 text-dark">{item.value}</div>
              {item.copyable && (
                <KeenIcon
                  icon="copy"
                  className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                />
              )}
              {item.info && (
                <KeenIcon
                  icon="information-5"
                  className="w-4 h-4 text-gray-500"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
