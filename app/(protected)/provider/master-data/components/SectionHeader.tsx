"use client";

interface SectionHeaderProps {
  title: string;
  onSelectAll?: () => void;
  onClear?: () => void;
  showSelectAll?: boolean;
  showClear?: boolean;
  selectAllText?: string;
  clearText?: string;
}

export function SectionHeader({
  title,
  onSelectAll,
  onClear,
  showSelectAll = true,
  showClear = true,
  selectAllText = "Select All",
  clearText = "Clear",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2.5 flex-shrink-0">
      <div className="flex w-50 items-center gap-2.5">
        <h3 className="text-b-13-14-400 text-gray-800">{title}</h3>
      </div>
      <div className="flex items-start gap-2">
        {showSelectAll && onSelectAll && (
          <button onClick={onSelectAll} className="px-1 py-1 rounded-md">
            <span className="text-b-11-12-500 text-blue-500">
              {selectAllText}
            </span>
          </button>
        )}
        {showClear && onClear && (
          <button onClick={onClear} className="px-1 py-1 rounded-md opacity-50">
            <span className="text-b-11-12-500 text-red-500">{clearText}</span>
          </button>
        )}
      </div>
    </div>
  );
}
