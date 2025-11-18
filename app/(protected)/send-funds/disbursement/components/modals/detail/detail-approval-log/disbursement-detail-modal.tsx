'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Copy, Info } from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { DisbursementDetail } from '../../../../types/disbursement-detail';
import {
  LOADING_MESSAGE,
  ERROR_PREFIX,
  NO_DATA_MESSAGE,
  STATUS_TYPES,
  STATUS_BANNER_STYLES,
  STATUS_BADGE_STYLES,
  SECTION_TITLES,
  FIELD_LABELS,
  CREATION_METHOD_LABELS,
  CREATION_METHOD_BADGE_STYLES,
  CALLBACK_STATUS,
  CALLBACK_STATUS_COLORS,
  EMPTY_VALUE,
  EXPORT_BUTTON_LABEL,
  STATUS_SUFFIX,
} from './_constants';

interface DisbursementDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disbursementId?: string;
  status?: 'approved' | 'scheduled' | 'processing' | 'completed' | 'rejected';
  disbursementDetail?: DisbursementDetail;
  loading?: boolean;
  error?: string;
}

export function DisbursementDetailModal({
  open,
  onOpenChange,
  disbursementId,
  status = 'approved',
  disbursementDetail,
  loading = false,
  error
}: DisbursementDetailModalProps) {
  const getStatusBannerStyle = (status: string) => {
    return STATUS_BANNER_STYLES[status as keyof typeof STATUS_BANNER_STYLES] || STATUS_BANNER_STYLES.approved;
  };

  const getStatusBadgeStyle = (status: string) => {
    return STATUS_BADGE_STYLES[status as keyof typeof STATUS_BADGE_STYLES] || STATUS_BADGE_STYLES.approved;
  };

  const getCreationMethodLabel = (method: string) => {
    return method === 'single' ? CREATION_METHOD_LABELS.SINGLE : CREATION_METHOD_LABELS.BATCH;
  };

  const getCreationMethodBadgeStyle = (method: string) => {
    return CREATION_METHOD_BADGE_STYLES[method as keyof typeof CREATION_METHOD_BADGE_STYLES] || CREATION_METHOD_BADGE_STYLES.single;
  };

  const getCallbackStatusColor = (callbackStatus: string) => {
    const lowerStatus = callbackStatus.toLowerCase();
    return CALLBACK_STATUS_COLORS[lowerStatus as keyof typeof CALLBACK_STATUS_COLORS] || '';
  };

  const formatStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (!disbursementDetail) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Disbursement Detail</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{LOADING_MESSAGE}</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-red-600">{ERROR_PREFIX} {error}</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600">{NO_DATA_MESSAGE}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleExport = () => {
    console.log('Exporting disbursement detail...');
  };

  const bannerStyle = getStatusBannerStyle(disbursementDetail.status);
  const badgeStyle = getStatusBadgeStyle(disbursementDetail.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Disbursement Detail
          </DialogTitle>
        </DialogHeader>
        
        <Separator />

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`rounded-lg p-4 ${bannerStyle.container}`}>
            <div className="flex items-start gap-3">
              <div className={`rounded-full p-2 ${bannerStyle.iconContainer}`}>
                <Info className={`h-4 w-4 ${bannerStyle.icon}`} />
              </div>
              <div>
                <h3 className={`font-medium ${bannerStyle.title}`}>
                  {formatStatusLabel(disbursementDetail.status)}{STATUS_SUFFIX}
                </h3>
                <p className={`text-sm mt-1 ${bannerStyle.description}`}>
                  {disbursementDetail.statusDefinition}
                </p>
              </div>
            </div>
          </div>

          {/* Transfer Amount Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">{FIELD_LABELS.TRANSFER_AMOUNT}</p>
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {disbursementDetail.transferAmount}
                  </h2>
                  <Badge 
                    variant="primary"
                    appearance="outline"
                    className={`${badgeStyle.container} rounded-full`}
                  >
                    <BadgeDot />
                    {formatStatusLabel(disbursementDetail.status)}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleExport} className="border-gray-300 text-gray-600 hover:bg-gray-50">
                <KeenIcon icon="exit-down" style="outline" className="h-4 w-4 mr-2" />
                {EXPORT_BUTTON_LABEL}
              </Button>
            </div>

            {/* Transaction Identifiers */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2 h-full">
                <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-3 h-full flex flex-col">
                  <div className="flex items-center justify-between flex-1">
                    <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 truncate block">
                        {disbursementDetail.referenceNumber}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{FIELD_LABELS.REFERENCE_NUMBER}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(disbursementDetail.referenceNumber)}
                      className="h-6 w-6 p-0 ml-2 hover:bg-blue-100 flex-shrink-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 h-full">
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-3 h-full flex flex-col">
                  <div className="flex items-center justify-between flex-1">
                    <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate block">
                      {disbursementDetail.beneficiaryDetails.accountNumber}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{FIELD_LABELS.BENEFICIARY_ACCOUNT_NUMBER}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(disbursementDetail.beneficiaryDetails.accountNumber)}
                      className="h-6 w-6 p-0 ml-2 hover:bg-gray-100 flex-shrink-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 h-full">
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-3 h-full flex flex-col">
                    <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900">
                        {disbursementDetail.beneficiaryDetails.bankName} / {disbursementDetail.beneficiaryDetails.bankCode}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{FIELD_LABELS.BANK_NAME}</p>
                    </div>
                </div>
              </div>

              <div className="space-y-2 h-full">
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-3 h-full flex flex-col">
                    <div className="flex-1 flex flex-col">
                        <Badge 
                          variant="primary"
                          appearance="outline"
                          className={`${getCreationMethodBadgeStyle(disbursementDetail.creationMethod).container} w-fit`}
                        >
                          {getCreationMethodLabel(disbursementDetail.creationMethod)}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-2">{FIELD_LABELS.CREATION_METHOD}</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Scheduled Date for scheduled status */}
            {disbursementDetail.status === STATUS_TYPES.SCHEDULED && disbursementDetail.timestamps.scheduledDate && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">{FIELD_LABELS.SCHEDULED_DATE}</p>
                <p className="text-sm font-medium text-gray-900">
                  {disbursementDetail.timestamps.scheduledDate}
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Transfer Detail */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {SECTION_TITLES.TRANSFER_DETAIL}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table className="border-0">
                    <TableBody>
                      <TableRow className='border-0 hover:!bg-transparent'>
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.TRANSFER_AMOUNT}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.transferAmount}
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.ADMIN_FEE}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.adminFee}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-900 font-bold">
                          {FIELD_LABELS.TOTAL_TRANSFER_AMOUNT}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-bold">
                          {disbursementDetail.totalTransferAmount}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Beneficiary Information */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {SECTION_TITLES.BENEFICIARY_INFORMATION}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table className="">
                    <TableBody>
                      <TableRow className="hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.BENEFICIARY_ACCOUNT_STATUS}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span>
                              {formatStatusLabel(disbursementDetail.beneficiaryDetails.accountStatus)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.BENEFICIARY_BANK_NAME_CODE}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.beneficiaryDetails.bankName} / {disbursementDetail.beneficiaryDetails.bankCode}
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.BENEFICIARY_ACCOUNT_NUMBER}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          <div className="flex items-center gap-2">
                            <span>
                              {disbursementDetail.beneficiaryDetails.accountNumber}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(disbursementDetail.beneficiaryDetails.accountNumber)}
                              className="h-6 w-6 p-0 hover:bg-gray-100"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.BENEFICIARY_ACCOUNT_NAME}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.beneficiaryDetails.accountName}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Other Details */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {SECTION_TITLES.OTHER_DETAILS}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table className="">
                    <TableBody>
                      <TableRow className="hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.REMARK}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.remark || EMPTY_VALUE}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.SEND_EMAIL_TO}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.sendEmailTo || EMPTY_VALUE}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Reason of Rejection for rejected status */}
              {disbursementDetail.status === STATUS_TYPES.REJECTED && disbursementDetail.rejectionReason && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {SECTION_TITLES.REASON_OF_REJECTION}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table className="">
                      <TableBody>
                        <TableRow className="hover:!bg-transparent">
                          <TableCell className="text-sm text-gray-600 font-normal">
                            {FIELD_LABELS.REASON}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900 font-normal">
                            {disbursementDetail.rejectionReason}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6 lg:col-span-1">
              {/* Callback */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {SECTION_TITLES.CALLBACK}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table className="border-0">
                    <TableBody>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.STATUS}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.callback.status === CALLBACK_STATUS.SUCCESS ? (
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 ${CALLBACK_STATUS_COLORS.success} rounded-full`} />
                              <span>{disbursementDetail.callback.status}</span>
                            </div>
                          ) : disbursementDetail.callback.status === CALLBACK_STATUS.INIT ? (
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 ${CALLBACK_STATUS_COLORS.init} rounded-full`} />
                              <span>{disbursementDetail.callback.status}</span>
                            </div>
                          ) : (
                            disbursementDetail.callback.status
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.RESPONSE}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.callback.response}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.MESSAGE}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.callback.message}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Timestamps & User Info */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {SECTION_TITLES.TIMESTAMPS_USER_INFO}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table className="border-0">
                    <TableBody>
                      {/* Show served date for completed status */}
                      {disbursementDetail.status === STATUS_TYPES.COMPLETED && disbursementDetail.timestamps.servedDate && (
                        <TableRow className="border-0 hover:!bg-transparent">
                          <TableCell className="text-sm text-gray-600 font-normal">
                            {FIELD_LABELS.SERVED_DATE}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900 font-normal">
                            <div>
                              <div>Thu, Dec 16, 2025</div>
                              <div className="text-xs text-gray-500">
                                23:12:32 (GMT +7)
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}

                      {/* Show scheduled date for scheduled status */}
                      {disbursementDetail.status === STATUS_TYPES.SCHEDULED && disbursementDetail.timestamps.scheduledDate && (
                        <TableRow className="border-0 hover:!bg-transparent">
                          <TableCell className="text-sm text-gray-600 font-normal">
                            {FIELD_LABELS.SCHEDULED_DATE}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900 font-normal">
                            <div>
                              <div>Thu, Dec 16, 2025</div>
                              <div className="text-xs text-gray-500">
                                23:12:32 (GMT +7)
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}

                      {/* Show approved by and date for non-rejected statuses */}
                      {disbursementDetail.status !== STATUS_TYPES.REJECTED && disbursementDetail.timestamps.approvedBy && (
                        <>
                          <TableRow className="border-0 hover:!bg-transparent">
                            <TableCell className="text-sm text-gray-600 font-normal">
                              {FIELD_LABELS.APPROVED_BY}
                            </TableCell>
                            <TableCell className="text-sm text-gray-900 font-normal">
                              {disbursementDetail.timestamps.approvedBy.email}
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-0 hover:!bg-transparent">
                            <TableCell className="text-sm text-gray-600 font-normal">
                              {FIELD_LABELS.APPROVED_DATE}
                            </TableCell>
                            <TableCell className="text-sm text-gray-900 font-normal">
                              <div>
                                <div>Thu, Dec 16, 2025</div>
                                <div className="text-xs text-gray-500">
                                  23:12:32 (GMT +7)
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      )}

                      {/* Show rejected by and date for rejected status */}
                      {disbursementDetail.status === STATUS_TYPES.REJECTED && disbursementDetail.timestamps.rejectedBy && (
                        <>
                          <TableRow className="border-0 hover:!bg-transparent">
                            <TableCell className="text-sm text-gray-600 font-normal">
                              {FIELD_LABELS.REJECTED_BY}
                            </TableCell>
                            <TableCell className="text-sm text-gray-900 font-normal">
                              {disbursementDetail.timestamps.rejectedBy.email}
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-0 hover:!bg-transparent">
                            <TableCell className="text-sm text-gray-600 font-normal">
                              {FIELD_LABELS.REJECTED_DATE}
                            </TableCell>
                            <TableCell className="text-sm text-gray-900 font-normal">
                              <div>
                                <div>Thu, Dec 16, 2025</div>
                                <div className="text-xs text-gray-500">
                                  23:12:32 (GMT +7)
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      )}

                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.REQUESTED_BY}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          {disbursementDetail.timestamps.requestedBy.email}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 font-normal">
                          {FIELD_LABELS.REQUESTED_DATE}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-normal">
                          <div>
                            <div>Thu, Dec 16, 2026</div>
                            <div className="text-xs text-gray-500">
                              23:12:32 (GMT +7)
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DisbursementDetailModal;
