import { AmountDetail } from "../../../core/_models";
import { formatCurrency } from "./format-currency";

export function renderAmountDetailCell(
  value: AmountDetail | undefined,
): React.ReactNode {
  if (!value || value.value === null) {
    return <div className="text-sm font-normal text-slate-500">-</div>;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-normal text-slate-800">
        {formatCurrency(value.value)}
      </div>
      {value.breakdown ? (
        <div className="text-xs text-slate-600">{value.breakdown}</div>
      ) : null}
    </div>
  );
}

