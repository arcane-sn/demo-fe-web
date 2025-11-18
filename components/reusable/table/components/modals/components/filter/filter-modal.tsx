"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FilterModalProps, FilterModalState, FilterCheckboxOption } from "../../types";
import { FilterDateSection } from "./filter-date-section";
import { FilterSection } from "./filter-section";
import { FilterModalFooter } from "./filter-modal-footer";

/**
 * Utility functions for checkbox operations
 */

/**
 * Check if all children are checked
 */
function areAllChildrenChecked(children?: FilterCheckboxOption[]): boolean {
  if (!children || children.length === 0) return false;
  return children.every((child) => child.checked);
}

/**
 * Check if any child is checked
 */
function isAnyChildChecked(children?: FilterCheckboxOption[]): boolean {
  if (!children || children.length === 0) return false;
  return children.some((child) => child.checked);
}

/**
 * Recursively update all nested children when parent is toggled
 */
function updateAllChildren(
  children: FilterCheckboxOption[],
  checked: boolean
): FilterCheckboxOption[] {
  return children.map((child) => {
    const updatedChild = { ...child, checked };
    if (child.children) {
      updatedChild.children = updateAllChildren(child.children, checked);
    }
    return updatedChild;
  });
}

/**
 * Update parent state based on children state
 * Parent is checked if ANY child is checked
 */
function updateParentState(option: FilterCheckboxOption): FilterCheckboxOption {
  if (!option.children || option.children.length === 0) {
    return option;
  }

  // Update nested children's parent state first (recursively)
  const childrenWithUpdatedParents = option.children.map((child) => {
    if (child.children) {
      return updateParentState(child);
    }
    return child;
  });

  // Then update this parent based on its direct children
  const anyChildChecked = isAnyChildChecked(childrenWithUpdatedParents);

  return {
    ...option,
    checked: anyChildChecked,
    children: childrenWithUpdatedParents,
  };
}

/**
 * Check if a specific option ID exists in the children tree
 */
function hasOptionInChildren(
  children: FilterCheckboxOption[],
  targetId: string
): boolean {
  for (const child of children) {
    if (child.id === targetId) {
      return true;
    }
    if (child.children && hasOptionInChildren(child.children, targetId)) {
      return true;
    }
  }
  return false;
}

/**
 * Update option with cascading selection logic:
 * - If parent is selected → all children (and nested children) are selected
 * - If parent is unselected → all children (and nested children) are unselected
 * - If a child is selected → only its direct parent is selected (not siblings)
 * - If all children are unselected → parent is unselected
 */
function updateOption(
  options: FilterCheckboxOption[],
  optionId: string,
  checked: boolean
): FilterCheckboxOption[] {
  return options.map((option) => {
    // If this is the option being toggled
    if (option.id === optionId) {
      const updatedOption = { ...option, checked };
      
      // If parent is being toggled, update ALL nested children recursively
      if (option.children && option.children.length > 0) {
        updatedOption.children = updateAllChildren(option.children, checked);
      }
      
      return updatedOption;
    }
    
    // If this option has children, check recursively for the target option
    if (option.children) {
      // Check if the target option is in this parent's children tree
      const targetIsInChildren = hasOptionInChildren(option.children, optionId);
      
      if (targetIsInChildren) {
        // Only update this parent if the target is in its children
        const updatedChildren = updateOption(option.children, optionId, checked);
        
        // Update THIS parent's state based on its direct children
        return updateParentState({
          ...option,
          children: updatedChildren,
        });
      }
      
      // If target is not in this parent's children, just recursively check
      // but don't update this parent's state (it's a sibling)
      return {
        ...option,
        children: updateOption(option.children, optionId, checked),
      };
    }
    
    return option;
  });
}

function selectAllOptions(
  options: FilterCheckboxOption[]
): FilterCheckboxOption[] {
  return options.map((option) => ({
    ...option,
    checked: true,
    children: option.children ? selectAllOptions(option.children) : undefined,
  }));
}

function clearAllOptions(
  options: FilterCheckboxOption[]
): FilterCheckboxOption[] {
  return options.map((option) => ({
    ...option,
    checked: false,
    children: option.children ? clearAllOptions(option.children) : undefined,
  }));
}

/**
 * Reusable Filter Modal Component
 * 
 * Provides a standardized filter interface with:
 * - Date filter section (optional)
 * - Multiple checkbox filter sections
 * - Reset and Apply actions
 */
export function FilterModal({
  open,
  onOpenChange,
  title = "Filter",
  dateFilter,
  sections,
  onReset,
  onApply,
  showResetButton = true,
  resetButtonText = "Reset to Default",
  applyButtonText = "Apply Filter",
}: FilterModalProps) {
  // State for each filter section
  const [sectionStates, setSectionStates] = useState<
    Record<string, FilterCheckboxOption[]>
  >(() => {
    const initial: Record<string, FilterCheckboxOption[]> = {};
    sections.forEach((section) => {
      initial[section.id] = section.options;
    });
    return initial;
  });

  // Handle option change for a specific section
  const handleOptionChange = useCallback(
    (sectionId: string, optionId: string, checked: boolean) => {
      setSectionStates((prev) => ({
        ...prev,
        [sectionId]: updateOption(prev[sectionId] || [], optionId, checked),
      }));

      // Also call the section's handler
      const section = sections.find((s) => s.id === sectionId);
      section?.onOptionChange(optionId, checked);
    },
    [sections]
  );

  // Handle select all for a specific section
  const handleSelectAll = useCallback(
    (sectionId: string) => {
      setSectionStates((prev) => ({
        ...prev,
        [sectionId]: selectAllOptions(prev[sectionId] || []),
      }));

      const section = sections.find((s) => s.id === sectionId);
      section?.onSelectAll?.();
    },
    [sections]
  );

  // Handle clear for a specific section
  const handleClear = useCallback(
    (sectionId: string) => {
      setSectionStates((prev) => ({
        ...prev,
        [sectionId]: clearAllOptions(prev[sectionId] || []),
      }));

      const section = sections.find((s) => s.id === sectionId);
      section?.onClear?.();
    },
    [sections]
  );

  // Handle reset all filters
  const handleReset = useCallback(() => {
    const cleared: Record<string, FilterCheckboxOption[]> = {};
    sections.forEach((section) => {
      cleared[section.id] = clearAllOptions(section.options);
    });
    setSectionStates(cleared);

    // Call individual section clears
    sections.forEach((section) => {
      section.onClear?.();
    });

    // Call global reset handler
    onReset?.();
  }, [sections, onReset]);

  // Handle apply filters
  const handleApply = useCallback(() => {
    const filterState: FilterModalState = {
      dateFilter: dateFilter?.value,
      sections: sectionStates,
    };

    onApply?.(filterState);
    onOpenChange(false);
  }, [sectionStates, dateFilter, onApply, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        {/* Header */}
        <DialogHeader className="px-5 border-b border-gray-200 w-full">
          <div className="flex items-center justify-between py-5">
            <DialogTitle className="text-b-14-14-600 text-gray-900">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <ScrollArea className="flex flex-col items-center justify-center gap-5 px-5 ">
            {/* Date Filter */}
            {dateFilter && (
              <>
                <FilterDateSection config={dateFilter} />
                <Separator />
              </>
            )}

            {/* Filter Sections */}
          {sections.map((section) => (
              <div key={section.id}>
                <FilterSection
                  {...section}
                  options={sectionStates[section.id] || section.options}
                  onOptionChange={(optionId, checked) =>
                    handleOptionChange(section.id, optionId, checked)
                  }
                  onSelectAll={() => handleSelectAll(section.id)}
                  onClear={() => handleClear(section.id)}
                />
              <Separator />
              </div>
            ))}
        </ScrollArea>

        {/* Footer */}
        <FilterModalFooter
          onReset={handleReset}
          onApply={handleApply}
          showResetButton={showResetButton}
          resetButtonText={resetButtonText}
          applyButtonText={applyButtonText}
        />
      </DialogContent>
    </Dialog>
  );
}

