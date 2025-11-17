import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { RangeInput } from '@/components/ui/floating-input';
import { Button } from '@/components/ui/button';
import { Info, RotateCcw } from 'lucide-react';
import { MDRData } from '../types';

interface MDRSectionProps {
  data: MDRData;
  onChange: (data: Partial<MDRData>) => void;
}

// Helper function to parse percentage and fixed values
function parseRateValue(value: string): { percentage: number; fixed: number } {
  const percentageMatch = value.match(/(\d+\.?\d*)%/);
  const fixedMatch = value.match(/IDR\s*(\d+)/);
  
  return {
    percentage: percentageMatch ? parseFloat(percentageMatch[1]) : 0,
    fixed: fixedMatch ? parseFloat(fixedMatch[1]) : 0
  };
}

// Helper function to format percentage value
function formatPercentageValue(percentage: number): string {
  const roundedPercentage = Math.round(percentage * 100) / 100;
  return roundedPercentage > 0 ? `${roundedPercentage}%` : '0%';
}

// Helper function to format fixed value
function formatFixedValue(fixed: number): string {
  const roundedFixed = Math.round(fixed * 100) / 100;
  return roundedFixed > 0 ? `IDR ${roundedFixed.toLocaleString()}` : 'IDR 0';
}

// Calculate MDR based on the formula
function calculateMDR(data: MDRData): { percentage: number; fixed: number } {
  const providerRate = parseRateValue(data.providerRate.percentagePrice);
  const merchantRate = parseRateValue(data.merchantRate.percentagePrice);
  const resellerRate = parseRateValue(data.resellerRate.percentagePrice);
  
  // MDR = Provider Rate + Merchant Rate + Reseller Rate
  return {
    percentage: providerRate.percentage + merchantRate.percentage + resellerRate.percentage,
    fixed: providerRate.fixed + merchantRate.fixed + resellerRate.fixed
  };
}

// Calculate Merchant and Reseller rates when MDR is changed directly
function calculateRatesFromMDR(mdrValue: string, providerRate: string): { merchantRate: string; resellerRate: string } {
  const mdr = parseRateValue(mdrValue);
  const provider = parseRateValue(providerRate);
  
  // Calculate remaining rate after subtracting provider rate
  const remainingPercentage = Math.max(0, mdr.percentage - provider.percentage);
  const remainingFixed = Math.max(0, mdr.fixed - provider.fixed);
  
  // Split remaining rate equally between merchant and reseller
  // Use precise calculation to avoid floating point errors
  const merchantPercentage = Math.round((remainingPercentage / 2) * 100) / 100;
  const merchantFixed = Math.round((remainingFixed / 2) * 100) / 100;
  const resellerPercentage = Math.round((remainingPercentage / 2) * 100) / 100;
  const resellerFixed = Math.round((remainingFixed / 2) * 100) / 100;
  
  return {
    merchantRate: formatPercentageValue(merchantPercentage),
    resellerRate: formatPercentageValue(resellerPercentage)
  };
}

export function MDRSection({ data, onChange }: MDRSectionProps) {
  const [isMDRManuallyEdited, setIsMDRManuallyEdited] = useState(false);
  
  // Auto-calculate MDR when rates change (only if MDR hasn't been manually edited)
  useEffect(() => {
    if (!isMDRManuallyEdited) {
      const calculatedMDR = calculateMDR(data);
      const mdrPercentage = formatPercentageValue(calculatedMDR.percentage);
      const mdrFixed = formatFixedValue(calculatedMDR.fixed);
      
      // Only update if the calculated values are different from current values
      if (data.mdr.percentagePrice !== mdrPercentage || data.mdr.fixedPrice !== mdrFixed) {
        onChange({
          mdr: {
            percentagePrice: mdrPercentage,
            fixedPrice: mdrFixed
          }
        });
      }
    }
  }, [data.providerRate, data.merchantRate, data.resellerRate, isMDRManuallyEdited, onChange]);
  
  // Handle MDR manual changes - recalculate Merchant and Reseller rates
  const handleMDRChange = (field: 'percentagePrice' | 'fixedPrice', value: string) => {
    setIsMDRManuallyEdited(true);
    
    // Calculate new MDR value
    const newMDR = { ...data.mdr, [field]: value };
    
    // Calculate Merchant and Reseller rates based on new MDR
    const calculatedRates = calculateRatesFromMDR(
      field === 'percentagePrice' ? value : data.mdr.percentagePrice,
      data.providerRate.percentagePrice
    );
    
    onChange({
      mdr: newMDR,
      merchantRate: { ...data.merchantRate, percentagePrice: calculatedRates.merchantRate },
      resellerRate: { ...data.resellerRate, percentagePrice: calculatedRates.resellerRate }
    });
  };
  
  // Handle individual rate changes - recalculate MDR or adjust other rates
  const handleRateChange = (rateType: 'providerRate' | 'merchantRate' | 'resellerRate', field: 'percentagePrice' | 'fixedPrice', value: string) => {
    const updatedData = {
      ...data,
      [rateType]: { ...data[rateType], [field]: value }
    };
    
    // If MDR is not manually edited, recalculate it
    if (!isMDRManuallyEdited) {
      const calculatedMDR = calculateMDR(updatedData);
      const mdrPercentage = formatPercentageValue(calculatedMDR.percentage);
      const mdrFixed = formatFixedValue(calculatedMDR.fixed);
      
      onChange({
        ...updatedData,
        mdr: {
          percentagePrice: mdrPercentage,
          fixedPrice: mdrFixed
        }
      });
    } else {
      // If MDR is manually edited and Provider Rate is changed, recalculate Merchant and Reseller rates
      if (rateType === 'providerRate') {
        const calculatedRates = calculateRatesFromMDR(
          data.mdr.percentagePrice,
          field === 'percentagePrice' ? value : data.providerRate.percentagePrice
        );
        
        onChange({
          ...updatedData,
          merchantRate: { ...data.merchantRate, percentagePrice: calculatedRates.merchantRate },
          resellerRate: { ...data.resellerRate, percentagePrice: calculatedRates.resellerRate }
        });
      } else {
        // For other rate changes when MDR is manually edited, just update the specific rate
        onChange(updatedData);
      }
    }
  };
  
  
  // Reset MDR to auto-calculation
  const resetMDRToAuto = () => {
    setIsMDRManuallyEdited(false);
    const calculatedMDR = calculateMDR(data);
    const mdrPercentage = formatPercentageValue(calculatedMDR.percentage);
    const mdrFixed = formatFixedValue(calculatedMDR.fixed);
    
    onChange({
      mdr: {
        percentagePrice: mdrPercentage,
        fixedPrice: mdrFixed
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Setup MDR (Merchant Discount Rate)
          <Info className="h-4 w-4 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {/* MDR */}
            <TableRow className=''>
              <TableCell className="w-1/3">
                <Label className="flex items-center gap-2">
                  MDR
                  <Info className="h-4 w-4 text-gray-400" />
                </Label>
              </TableCell>
              <TableCell className="pb-8">
                <div className="space-y-3">
                  <RangeInput
                    leftLabel="Percentage Price"
                    rightLabel="Fixed Price"
                    leftValue={data.mdr.percentagePrice}
                    rightValue={data.mdr.fixedPrice}
                    leftPlaceholder="0.2%"
                    rightPlaceholder="IDR 0"
                    separator="plus"
                    onLeftChange={(value) => handleMDRChange('percentagePrice', value)}
                    onRightChange={(value) => handleMDRChange('fixedPrice', value)}
                    size="md"
                  />
                </div>
              </TableCell>
            </TableRow>

            {/* Provider Rate */}
            <TableRow className="border-0">
              <TableCell className="w-1/3 pt-10">
                <Label>Provider Rate</Label>
              </TableCell>
              <TableCell className="pt-10">
                <RangeInput
                  leftLabel="Percentage Price"
                  rightLabel="Fixed Price"
                  leftValue={data.providerRate.percentagePrice}
                  rightValue={data.providerRate.fixedPrice}
                  leftPlaceholder="0.7%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => handleRateChange('providerRate', 'percentagePrice', value)}
                  onRightChange={(value) => handleRateChange('providerRate', 'fixedPrice', value)}
                  size="md"
                />
              </TableCell>
            </TableRow>

            {/* Provider Rate Checkbox */}
            <TableRow className="border-0">
              <TableCell className="w-1/3"></TableCell>
              <TableCell className="pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="provider-show"
                    checked={data.providerRate.showToMerchant}
                    onCheckedChange={(checked) => onChange({
                      providerRate: { ...data.providerRate, showToMerchant: checked as boolean }
                    })}
                  />
                  <Label htmlFor="provider-show">Show this rate to this merchant</Label>
                </div>
              </TableCell>
            </TableRow>

            {/* Merchant Rate */}
            <TableRow className="border-0">
              <TableCell className="w-1/3">
                <Label>Merchant Rate (Optional)</Label>
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Percentage Price"
                  rightLabel="Fixed Price"
                  leftValue={data.merchantRate.percentagePrice}
                  rightValue={data.merchantRate.fixedPrice}
                  leftPlaceholder="0.2%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => handleRateChange('merchantRate', 'percentagePrice', value)}
                  onRightChange={(value) => handleRateChange('merchantRate', 'fixedPrice', value)}
                  size="md"
                />
              </TableCell>
            </TableRow>

            {/* Merchant Rate Checkbox */}
            <TableRow className="border-0">
              <TableCell className="w-1/3"></TableCell>
              <TableCell className="pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="merchant-show"
                    checked={data.merchantRate.showToMerchant}
                    onCheckedChange={(checked) => onChange({
                      merchantRate: { ...data.merchantRate, showToMerchant: checked as boolean }
                    })}
                  />
                  <Label htmlFor="merchant-show">Show this rate to this merchant</Label>
                </div>
              </TableCell>
            </TableRow>
            

            {/* Flypay Rate */}
            <TableRow className="border-0">
              <TableCell className="w-1/3">
                <Label className="mr-10 items-center gap-2">
                  Flypay Rate (Optional)
                  </Label>
                  <div className='flex items-center gap-2'>
                    <span className="text-sm text-gray-500">(Excluded)</span>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Percentage Price"
                  rightLabel="Fixed Price"
                  leftValue={data.flypayRate.percentagePrice}
                  rightValue={data.flypayRate.fixedPrice}
                  leftPlaceholder="0.1%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => onChange({
                    flypayRate: { ...data.flypayRate, percentagePrice: value }
                  })}
                  onRightChange={(value) => onChange({
                    flypayRate: { ...data.flypayRate, fixedPrice: value }
                  })}
                  size="md"
                />
              </TableCell>
            </TableRow>

            {/* Flypay Rate Checkbox */}
            <TableRow className="border-0">
              <TableCell className="w-1/3"></TableCell>
              <TableCell className="pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="flypay-show"
                    checked={data.flypayRate.showToMerchant}
                    onCheckedChange={(checked) => onChange({
                      flypayRate: { ...data.flypayRate, showToMerchant: checked as boolean }
                    })}
                  />
                  <Label htmlFor="flypay-show">Show this rate to this merchant</Label>
                </div>
              </TableCell>
            </TableRow>

            {/* Reseller Rate */}
            <TableRow className="border-0">
              <TableCell className="w-1/3">
                <Label>Reseller Rate (Optional)</Label>
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Percentage Price"
                  rightLabel="Fixed Price"
                  leftValue={data.resellerRate.percentagePrice}
                  rightValue={data.resellerRate.fixedPrice}
                  leftPlaceholder="0.5%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => handleRateChange('resellerRate', 'percentagePrice', value)}
                  onRightChange={(value) => handleRateChange('resellerRate', 'fixedPrice', value)}
                  size="md"
                />
              </TableCell>
            </TableRow>

            {/* Reseller Rate Checkbox */}
            <TableRow className="border-0">
              <TableCell className="w-1/3"></TableCell>
              <TableCell className="pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reseller-show"
                    checked={data.resellerRate.showToMerchant}
                    onCheckedChange={(checked) => onChange({
                      resellerRate: { ...data.resellerRate, showToMerchant: checked as boolean }
                    })}
                  />
                  <Label htmlFor="reseller-show">Show this rate to this merchant</Label>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}