import PayOutOverview from "./PayOutOverview";
import TablePayoutHistory from "./TablePayoutHistory";

export function PayOutContent() {
  return (
    <div className="flex flex-col gap-5">
      <PayOutOverview />
      <TablePayoutHistory />
    </div>
  );
}
