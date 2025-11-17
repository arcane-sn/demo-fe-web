"use client";

import { Check, ChevronDown, ChevronUp } from "lucide-react";

export interface CheckboxOption {
  id: string;
  label: string;
  checked?: boolean;
  children?: CheckboxOption[];
}

interface CheckboxListProps {
  options: CheckboxOption[];
  onOptionChange: (optionId: string, checked: boolean) => void;
  expandedOptions?: Set<string>;
  onToggleExpanded?: (optionId: string) => void;
  level?: number;
}

export function CheckboxList({
  options,
  onOptionChange,
  expandedOptions = new Set(),
  onToggleExpanded,
  level = 0,
}: CheckboxListProps) {
  const renderCheckbox = (option: CheckboxOption) => {
    const isChecked = option.checked || false;

    return (
      <div className="flex items-center gap-1.5">
        {isChecked ? (
          <div className="flex items-center justify-center w-4.5 h-4.5 bg-blue-500 rounded border border-blue-500">
            <Check className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-4.5 h-4.5 bg-white rounded border border-gray-300"></div>
        )}
        <span className="text-b-13-14-500 text-gray-800">{option.label}</span>
      </div>
    );
  };

  const renderOption = (option: CheckboxOption, currentLevel = 0) => {
    const hasChildren = option.children && option.children.length > 0;
    const isExpanded = expandedOptions.has(option.id);

    if (currentLevel === 0 && hasChildren) {
      // Main category with children (like DEBIT/CREDIT CARD)
      return (
        <div key={option.id} className="flex flex-col gap-3 w-full">
          {/* Main category header */}
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-1.5 cursor-pointer"
              onClick={() => onOptionChange(option.id, !option.checked)}
            >
              {renderCheckbox(option)}
            </div>
            {onToggleExpanded && (
              <button
                onClick={() => onToggleExpanded(option.id)}
                className="p-1"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Children */}
          {isExpanded && (
            <div className="flex gap-2.5 pl-8 w-full">
              {/* Vertical line */}
              <div className="flex flex-col w-1.5 items-center">
                <div className="w-px flex-1 bg-gray-200"></div>
              </div>

              {/* Children content */}
              <div className="flex flex-col gap-2 flex-1">
                <CheckboxList
                  options={option.children!}
                  onOptionChange={onOptionChange}
                  expandedOptions={expandedOptions}
                  onToggleExpanded={onToggleExpanded}
                  level={currentLevel + 1}
                />
              </div>
            </div>
          )}
        </div>
      );
    } else if (currentLevel === 1 && hasChildren) {
      // Sub-category with children (like Payment Channel)
      return (
        <div key={option.id} className="flex flex-col gap-2">
          <div
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={() => onOptionChange(option.id, !option.checked)}
          >
            {renderCheckbox(option)}
          </div>

          {isExpanded && (
            <div className="flex gap-2.5 pl-8">
              {/* Vertical line */}
              <div className="flex flex-col w-1.5 items-center">
                <div className="w-px flex-1 bg-gray-200"></div>
              </div>

              {/* Children content */}
              <div className="flex flex-col gap-2.25 flex-1">
                <CheckboxList
                  options={option.children!}
                  onOptionChange={onOptionChange}
                  expandedOptions={expandedOptions}
                  onToggleExpanded={onToggleExpanded}
                  level={currentLevel + 1}
                />
              </div>
            </div>
          )}
        </div>
      );
    } else if (currentLevel === 0 && !hasChildren) {
      // Simple main category without children (like E-WALLET, VIRTUAL ACCOUNT, QR CODE)
      return (
        <div key={option.id} className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-1.5 cursor-pointer"
              onClick={() => onOptionChange(option.id, !option.checked)}
            >
              {renderCheckbox(option)}
            </div>
            {onToggleExpanded && (
              <button
                onClick={() => onToggleExpanded(option.id)}
                className="p-1"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      );
    } else {
      // Simple option without children (leaf nodes)
      return (
        <div
          key={option.id}
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={() => onOptionChange(option.id, !option.checked)}
        >
          {renderCheckbox(option)}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 flex-1">
      {options.map((option) => renderOption(option, level))}
    </div>
  );
}
