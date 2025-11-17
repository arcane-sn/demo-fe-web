import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KeenIcon } from "@/components/keenicons";
import { StatusHistoryItem } from "../core/_models";
import { BADGE_VARIANT_MAP } from "../core/_consts";

interface StatusHistoryCardProps {
  statusHistory: StatusHistoryItem[];
}

export function StatusHistoryCard({ statusHistory }: StatusHistoryCardProps) {
  const getBadgeVariant = (type: keyof typeof BADGE_VARIANT_MAP) => {
    return BADGE_VARIANT_MAP[type] || "secondary";
  };

  return (
    <div className="bg-light rounded-xl border border-gray-300 shadow-sm">
      <div className="px-8 py-5 border-b border-gray-300">
        <div className="text-h-18-18-600 text-dark">Status History</div>
      </div>
      <div className="px-3 pb-8 pt-5 flex flex-col">
        {statusHistory.map((item, index) => (
          <div key={index} className="px-5 py-4 flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              {index < statusHistory.length - 1 && (
                <div className="w-px h-12 bg-gray-300"></div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Badge
                  variant={getBadgeVariant(
                    item.badgeType as keyof typeof BADGE_VARIANT_MAP
                  )}
                  className="px-3 py-1 rounded-full"
                >
                  <span className="text-b-12-12-500">{item.badge}</span>
                </Badge>
                <div className="text-b-13-14-400 text-gray-500">
                  {item.date}
                </div>
              </div>
              <div className="text-b-14-22-500 text-dark">
                {item.description}
              </div>
              <div className="text-b-13-14-400 text-gray-500">{item.note}</div>
              {item.hasDetail && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit px-3 py-1 mt-2 text-primary border-primary bg-primary-light"
                >
                  <span className="text-b-13-14-500">{item.detailText}</span>
                  <KeenIcon icon="right" className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
