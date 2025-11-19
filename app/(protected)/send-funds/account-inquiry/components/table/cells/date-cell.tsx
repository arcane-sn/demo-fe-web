interface DateCellProps {
  date?: string;
  time?: string;
  placeholder?: string;
}

export function DateCell({
  date,
  time,
  placeholder = "-",
}: DateCellProps) {
  if (!date || !time) {
    return (
      <span className="text-sm text-muted-foreground">
        {placeholder}
      </span>
    );
  }

  return (
    <div className="text-sm">
      <div className="text-foreground font-medium">{date}</div>
      <div className="text-muted-foreground">{time}</div>
    </div>
  );
}

