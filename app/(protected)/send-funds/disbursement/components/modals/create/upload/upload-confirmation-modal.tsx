"use client";

import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { X, Info, Calendar, Clock } from 'lucide-react';

interface UploadConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmUpload?: (data: UploadConfirmationData) => void;
  onCancel?: () => void;
  csvData?: {
    totalTransferAmount: string;
    totalTransactions: number;
    totalBeneficiaryAccounts: number;
    fileName: string;
  } | null;
}

interface UploadConfirmationData {
  creationId: string;
  scheduledDisbursement: boolean;
  bypassAccountInquiry: boolean;
  scheduledDate?: string;
}

export function UploadConfirmationModal({
  open,
  onOpenChange,
  onConfirmUpload,
  onCancel,
  csvData,
}: UploadConfirmationModalProps) {
  const [creationId, setCreationId] = useState(csvData?.fileName?.replace('.csv', '') || 'Disburse_MerchA_DEC-2025');
  const [scheduledDisbursement, setScheduledDisbursement] = useState(false);
  const [bypassAccountInquiry, setBypassAccountInquiry] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
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
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setIsTimePickerOpen(false);
  };

  const handleConfirm = useCallback(() => {
    if (onConfirmUpload) {
      onConfirmUpload({
        creationId,
        scheduledDisbursement,
        bypassAccountInquiry,
        scheduledDate: scheduledDisbursement && selectedDate && selectedTime 
          ? `${formatDate(selectedDate)} ${selectedTime}` 
          : undefined,
      });
    }
    onOpenChange(false);
  }, [creationId, scheduledDisbursement, bypassAccountInquiry, selectedDate, selectedTime, onConfirmUpload, onOpenChange]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  }, [onCancel, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-xl h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between flex-shrink-0 px-6 py-4 border-b">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Upload Confirmation
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-6 py-6">
          {/* Creation ID Section */}
          <Card className="shadow-sm">
            <CardHeader >
              <CardTitle className="text-base font-semibold text-gray-900">
                Creation ID
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={creationId}
                onChange={(e) => setCreationId(e.target.value)}
                className="w-full"
                placeholder="Disburse_MerchA_DEC-2025"
              />
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-500">
                  As default will use your file name as a creation ID
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ummary Section */}
          <Card className="shadow-sm">
            <CardHeader className='flex items-center justify-between'>
                <CardTitle className="text-base font-semibold text-gray-900">
                  Transfer Summary
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBypassAccountInquiry(!bypassAccountInquiry)}
                  className={`text-xs px-3 py-1 ${
                    bypassAccountInquiry 
                      ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100' 
                      : 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'
                  }`}
                >
                  {bypassAccountInquiry ? 'Bypass Account Inquiry' : 'Mandatory Account Inquiry'}
                </Button>
            </CardHeader>
            <CardContent>
              <Table className="border-0">
                <TableBody>
                  <TableRow className="border-0">
                    <TableCell className="text-sm text-gray-600 font-normal">
                      Total Transfer Amount
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 font-normal">
                      {csvData?.totalTransferAmount || 'IDR 100.000.000'}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-0">
                    <TableCell className="text-sm text-gray-600 font-normal">
                      Total Transactions
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 font-normal">
                      {csvData?.totalTransactions || '15'}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-0">
                    <TableCell className="text-sm text-gray-600 font-normal">
                      Total Beneficiary Accounts
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 font-normal">
                      {csvData?.totalBeneficiaryAccounts || '10'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Scheduled Disbursement Section */}
          <Card className="shadow-sm">
            <CardHeader >
              <CardTitle className="text-base font-semibold text-gray-900">
                Scheduled Disbursement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900">Set a Schedule</span>
                <Switch
                  checked={scheduledDisbursement}
                  onCheckedChange={setScheduledDisbursement}
                />
              </div>
              <p className="text-xs text-gray-500">
                Enable automatic disbursement on your selected date
              </p>

              {scheduledDisbursement && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-10 justify-start text-left font-normal text-gray-500 pr-10"
                        >
                          {selectedDate ? formatDate(selectedDate) : "Choose Date"}
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                          className="w-full h-10 justify-start text-left font-normal text-gray-500 pr-10"
                        >
                          {selectedTime || "Choose Time"}
                          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-3" align="start">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Select Time</label>
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
              )}
            </CardContent>
          </Card>

          {/* Account Inquiry Information Box */}
          <div className={`rounded-lg p-4 ${
            bypassAccountInquiry 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-purple-50 border border-purple-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`rounded-full p-1 flex-shrink-0 ${
                bypassAccountInquiry 
                  ? 'bg-green-100' 
                  : 'bg-purple-100'
              }`}>
                <Info className={`h-4 w-4 ${
                  bypassAccountInquiry 
                    ? 'text-green-600' 
                    : 'text-purple-600'
                }`} />
              </div>
              <p className="text-sm text-gray-700">
                {bypassAccountInquiry 
                  ? 'This request can bypass the account inquiry process. Once the upload is confirmed, it will be automatically submitted for approval'
                  : 'This file will be uploaded once you confirm to upload. After the upload is complete, please wait for the account inquiry process before submitting this request for approval'
                }
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* Modal Footer - Fixed at bottom */}
        <div className="flex justify-end gap-3 pt-4 border-t flex-shrink-0 px-6 pb-6 bg-white">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {bypassAccountInquiry ? 'Confirm & Request for Approval' : 'Confirm Upload'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadConfirmationModal;
