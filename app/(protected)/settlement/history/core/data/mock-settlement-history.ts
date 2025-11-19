import { SettlementHistoryData } from "../models";
import { createSettlementRow } from "../helpers";

export const mockSettlementHistoryData: SettlementHistoryData[] = Array.from(
  { length: 10 },
  (_, index) => createSettlementRow({}, index + 1),
);

