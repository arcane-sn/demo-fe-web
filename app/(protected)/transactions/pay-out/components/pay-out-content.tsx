import PayOutOverview from "./PayOutOverview";
import { TablePayoutHistory } from "./table/TablePayoutHistory";

export function PayOutContent() {
  return (
    <div className="flex flex-col gap-5">
      <PayOutOverview />
      <TablePayoutHistory />
    </div>
  );
}
