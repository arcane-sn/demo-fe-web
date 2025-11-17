"use client";

import PayInOverview from "./PayInOverview";
import { TablePayInHistory } from "./TablePayInHistory";

export function PayInContent() {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <PayInOverview />
      <TablePayInHistory />
    </div>
  );
}
