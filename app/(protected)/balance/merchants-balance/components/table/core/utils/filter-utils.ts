import type {
  FilterCheckboxOption,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import type { CheckboxOption } from "@/components/reusable/CheckboxList";

export function collectCheckedValues(
  options?: FilterCheckboxOption[]
): string[] {
  if (!options?.length) return [];
  const values: Set<string> = new Set();

  const traverse = (items: FilterCheckboxOption[]) => {
    items.forEach((item) => {
      if (item.checked) {
        values.add(item.id);
      }
      if (item.children?.length) {
        traverse(item.children);
      }
    });
  };

  traverse(options);
  return Array.from(values);
}

export function buildSectionFromOptions(
  id: string,
  title: string,
  options: CheckboxOption[],
  selected: string[]
): FilterSectionConfig {
  const convertOptions = (opts: CheckboxOption[]): FilterCheckboxOption[] => {
    return opts.map((opt) => ({
      id: opt.id,
      label: opt.label,
      checked: selected.includes(opt.id) || opt.checked,
      children: opt.children ? convertOptions(opt.children) : undefined,
    }));
  };

  return {
    id,
    title,
    options: convertOptions(options),
    onOptionChange: () => {},
    onSelectAll: () => {},
    onClear: () => {},
  };
}
