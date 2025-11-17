import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TableFilter } from '../types';

interface TableFiltersProps {
  filters: TableFilter[];
  activeFilters: Record<string, any>;
  onFilterChange: (filterId: string, value: any) => void;
  onClearFilters: () => void;
}

export function TableFilters({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: TableFiltersProps) {
  if (filters.length === 0) return null;

  const activeFiltersCount = Object.values(activeFilters).filter(
    value => value !== undefined && value !== null && value !== ''
  ).length;

  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => (
        <FilterPopover
          key={filter.id}
          filter={filter}
          value={activeFilters[filter.id]}
          onChange={(value) => onFilterChange(filter.id, value)}
        />
      ))}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      )}
    </div>
  );
}

interface FilterPopoverProps {
  filter: TableFilter;
  value: any;
  onChange: (value: any) => void;
}

function FilterPopover({ filter, value, onChange }: FilterPopoverProps) {
  const isActive = value !== undefined && value !== null && value !== '';

  const handleChange = (checked: boolean, optionValue: string) => {
    if (filter.type === 'multiselect') {
      const currentValues = Array.isArray(value) ? value : [];
      if (checked) {
        onChange([...currentValues, optionValue]);
      } else {
        onChange(currentValues.filter((v: string) => v !== optionValue));
      }
    } else {
      onChange(checked ? optionValue : undefined);
    }
  };

  const getActiveCount = () => {
    if (filter.type === 'multiselect') {
      return Array.isArray(value) ? value.length : 0;
    }
    return isActive ? 1 : 0;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter />
          {filter.label}
          {getActiveCount() > 0 && (
            <Badge size="sm" variant="outline">
              {getActiveCount()}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-3" align="start">
        <div className="space-y-3">
          <div className="text-xs font-medium text-muted-foreground">
            {filter.label}
          </div>
          <div className="space-y-3">
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center gap-2.5">
                <Checkbox
                  id={`${filter.id}-${option.value}`}
                  checked={
                    filter.type === 'multiselect'
                      ? Array.isArray(value) && value.includes(option.value)
                      : value === option.value
                  }
                  onCheckedChange={(checked) =>
                    handleChange(checked === true, option.value)
                  }
                />
                <Label
                  htmlFor={`${filter.id}-${option.value}`}
                  className="grow flex items-center justify-between font-normal gap-1.5"
                >
                  {option.label}
                  {option.count !== undefined && (
                    <span className="text-muted-foreground">
                      {option.count}
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
