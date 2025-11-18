import { PaymentStatus } from "../../../core/_models";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: PaymentStatus;
}

const getStatusConfig = (status: PaymentStatus) => {
  switch (status) {
    case "Pending":
      return {
        className: "bg-yellow-50 border border-yellow-200 text-yellow-600",
        dotClassName: "bg-yellow-500",
      };
    case "Request":
      return {
        className: "bg-yellow-50 border border-yellow-200 text-yellow-600",
        dotClassName: "bg-yellow-500",
      };
    case "Success":
      return {
        className: "bg-green-50 border border-green-200 text-green-600",
        dotClassName: "bg-green-500",
      };
    case "Failed":
      return {
        className: "bg-red-600 border border-red-600 text-white",
        dotClassName: "bg-white",
      };
    case "Expired":
      return {
        className: "bg-pink-50 border border-pink-200 text-pink-600",
        dotClassName: "bg-pink-500",
      };
    default:
      return {
        className: "bg-gray-50 border border-gray-200 text-gray-600",
        dotClassName: "bg-gray-500",
      };
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      size="sm"
      shape="default"
      className={cn("rounded-full px-2.5 py-1 gap-1.5 border", config.className)}
    >
      <span className={cn("w-1 h-1 rounded-full flex-shrink-0", config.dotClassName)} />
      {status}
    </Badge>
  );
}

