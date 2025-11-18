import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VAStatusBadgeProps {
  status: string;
}

const getStatusConfig = (status: string) => {
  if (status === "Active") {
    return {
      className: "bg-green-50 border border-green-200 text-green-600",
      dotClassName: "bg-green-500",
    };
  }
  return {
    className: "bg-gray-50 border border-gray-200 text-gray-600",
    dotClassName: "bg-gray-500",
  };
};

export function VAStatusBadge({ status }: VAStatusBadgeProps) {
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

