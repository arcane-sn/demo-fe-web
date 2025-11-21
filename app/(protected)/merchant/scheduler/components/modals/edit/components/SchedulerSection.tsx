"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Clock, Settings } from 'lucide-react';
import { SchedulerConfig } from '../types';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { KeenIcon } from '@/components/keenicons';

interface SchedulerSectionProps {
  title: string;
  target: string;
  enabled: boolean;
  config: SchedulerConfig;
  onToggle: (enabled: boolean) => void;
  onConfigChange: (config: SchedulerConfig) => void;
}

export function SchedulerSection({
  title,
  target,
  enabled,
  config,
  onToggle,
  onConfigChange,
}: SchedulerSectionProps) {
  const handleIntervalOptionChange = (value: string) => {
    onConfigChange({
      ...config,
      intervalOption: value as 'daily' | 'weekly' | 'monthly',
    });
  };

  const handleIntervalFrequencyChange = (value: string) => {
    onConfigChange({
      ...config,
      intervalFrequency: parseInt(value) || 1,
    });
  };

  const handleScheduleTimeChange = (value: string) => {
    onConfigChange({
      ...config,
      scheduleTime: value,
    });
  };

  return (
    <Card>
      <CardHeader className='flex items-center justify-between p-4' id={target}>
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Turn ON to setup the scheduler</p>
          </div>
          <div>
          <Switch
            checked={enabled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </CardHeader>
      <CardContent>
        {enabled ? (
          <Table>
              <TableBody>
                <TableRow className='border-0'>
                  <TableCell className="w-1/3">
                    <Label className="text-sm font-medium">Interval Option</Label>
                  </TableCell>
                  <TableCell>
                    <Select value={config.intervalOption} onValueChange={handleIntervalOptionChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select interval option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                
                <TableRow className='border-0'>
                  <TableCell className="w-1/3">
                    <Label className="text-sm font-medium">Interval Frequency</Label>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={config.intervalFrequency || ''}
                      onChange={(e) => handleIntervalFrequencyChange(e.target.value)}
                      className="w-full"
                      min="1"
                      placeholder="Enter frequency"
                    />
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="w-1/3">
                    <Label className="text-sm font-medium">Schedule Time</Label>
                  </TableCell>
                  <TableCell>
                    <div className="relative">
                      <Input
                        type="time"
                        value={config.scheduleTime || ''}
                        onChange={(e) => handleScheduleTimeChange(e.target.value)}
                        className="w-full pr-8"
                        placeholder="Select time"
                      />
                      <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-lg">
            <HexagonBadge 
              size="w-10 h-10" 
              fill="fill-gray-50" 
              stroke="stroke-gray-400"
              badge={<KeenIcon icon="disconnect" style="outline" className="text-gray-600" />}
            />
            <div>
              <p className="font-semibold text-gray-700">Inactive</p>
              <p className="text-sm text-gray-500">Scheduler Not Active</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

