"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface ScheduledDisbursementProps {
  isScheduled: boolean;
  selectedDate?: Date;
  selectedTime: string;
  errors?: {
    date?: string;
    time?: string;
  };
  onToggleSchedule?: (value: boolean) => void;
  onDateChange?: (date: Date | undefined) => void;
  onTimeChange?: (time: string) => void;
}

export function ScheduledDisbursement({
  isScheduled,
  selectedDate,
  selectedTime,
  errors,
  onToggleSchedule,
  onDateChange,
  onTimeChange,
}: ScheduledDisbursementProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    onDateChange?.(date);
    setIsDatePickerOpen(false);
  };

  const handleTimeChange = (time: string) => {
    onTimeChange?.(time);
    setIsTimePickerOpen(false);
  };

  return (
    <Card>
      <CardHeader id="scheduled_disbursement">
        <CardTitle>Scheduled Disbursement</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="items-center">
          <div className="flex items-center gap-3 space-y-1 pb-4">
            <Label className="text-sm font-medium text-gray-700">
              Set a Schedule
            </Label>
            <Switch checked={isScheduled} onCheckedChange={onToggleSchedule} />
            
          </div>
          <p className="text-xs text-gray-500">
              Enable automatic disbursement on your selected date
            </p>
        </div>

        {isScheduled && (
          <>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full h-10 justify-start text-left font-normal pr-10',
                      selectedDate ? 'text-gray-900' : 'text-gray-500',
                      errors?.date && 'border-destructive text-destructive',
                    )}
                  >
                    {selectedDate ? formatDate(selectedDate) : 'Choose Date'}
                    {errors?.date ? (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
                    ) : (
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <span className="text-gray-400">-</span>
            <div className="flex-1 relative">
              <Popover open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full h-10 justify-start text-left font-normal pr-10',
                      selectedTime ? 'text-gray-900' : 'text-gray-500',
                      errors?.time && 'border-destructive text-destructive',
                    )}
                  >
                    {selectedTime || 'Choose Time'}
                    {errors?.time ? (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
                    ) : (
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3" align="start">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Time</Label>
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="h-10"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <p className={cn(errors?.date ? 'text-destructive' : 'text-muted-foreground')}>
              {errors?.date ?? 'Please select an option'}
            </p>
            <p className={cn(errors?.time ? 'text-destructive' : 'text-muted-foreground')}>
              {errors?.time ?? 'Please select an option'}
            </p>
          </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
