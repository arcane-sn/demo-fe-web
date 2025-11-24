import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { RangeInput } from '@/components/ui/floating-input';
import { Button } from '@/components/ui/button';
import { KeenIcon } from '@/components/keenicons';
import { MDRData } from '../types';

interface MDRSectionProps {
  data: MDRData;
  onChange: (data: Partial<MDRData>) => void;
}

// Helper function to parse percentage and fixed values
// Handles both formatted values (with % or IDR) and raw values (numbers only)
function parseRateValue(value: string, isPercentage: boolean = true): { percentage: number; fixed: number } {
  if (!value || value.trim() === '') return { percentage: 0, fixed: 0 };
  
  // Clean the value - remove spaces
  const cleanValue = value.trim();
  
  if (isPercentage) {
    // Parse percentage field - can be "1.5%" or "1.5" or "1.5." or "0." or "0" or "." or ".5"
    let percentageValue = 0;
    
    // Try to match with % first (e.g., "1.5%")
    const percentageMatch = cleanValue.match(/(\d+\.?\d*)%/);
    if (percentageMatch) {
      percentageValue = parseFloat(percentageMatch[1]) || 0;
    } else {
      // Try to parse as plain number (user might be typing without %)
      // Handle cases like: "1.5", "1.", "0.", "0", ".5", ".", "1.5."
      // First, try to match complete numbers (with or without decimal)
      if (cleanValue === '.' || cleanValue === '0.') {
        // User is typing "0." or just "."
        percentageValue = 0;
      } else {
        // Match numbers including decimals: "1.5", "1.", ".5", "0", "1"
        // This regex matches: optional digits, optional decimal point, optional more digits
        const numberMatch = cleanValue.match(/(\d*\.?\d+)/);
        if (numberMatch) {
          const parsed = parseFloat(numberMatch[1]);
          // Only use if it's a valid number (not NaN)
          if (!isNaN(parsed)) {
            percentageValue = parsed;
          }
        } else {
          // Try to match just digits (e.g., "1", "0")
          const digitMatch = cleanValue.match(/(\d+)/);
          if (digitMatch) {
            percentageValue = parseFloat(digitMatch[1]) || 0;
          }
        }
      }
    }
    
    return {
      percentage: percentageValue,
      fixed: 0
    };
  } else {
    // Parse fixed price field - can be "IDR 5000" or "5000" or "5,000"
    let fixedValue = 0;
    
    // Try to match IDR format first
    const idrMatch = cleanValue.match(/IDR\s*([\d,.]+)/);
    if (idrMatch) {
      fixedValue = parseFloat(idrMatch[1].replace(/,/g, '')) || 0;
    } else {
      // Try to parse as plain number (user might be typing without IDR)
      // Match numbers including thousand separators like "5000", "5,000", "5000."
      const numberMatch = cleanValue.match(/([\d,.]+)/);
      if (numberMatch) {
        fixedValue = parseFloat(numberMatch[1].replace(/,/g, '')) || 0;
      }
    }
    
    return {
      percentage: 0,
      fixed: fixedValue
    };
  }
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
// MDR = Provider Rate + Merchant Rate + Reseller Rate
function calculateMDR(data: MDRData): { percentage: number; fixed: number } {
  const providerRatePercentage = parseRateValue(data.providerRate.percentagePrice, true);
  const providerRateFixed = parseRateValue(data.providerRate.fixedPrice, false);
  const merchantRatePercentage = parseRateValue(data.merchantRate.percentagePrice, true);
  const merchantRateFixed = parseRateValue(data.merchantRate.fixedPrice, false);
  const resellerRatePercentage = parseRateValue(data.resellerRate.percentagePrice, true);
  const resellerRateFixed = parseRateValue(data.resellerRate.fixedPrice, false);
  
  // MDR = Provider Rate + Merchant Rate + Reseller Rate
  return {
    percentage: providerRatePercentage.percentage + merchantRatePercentage.percentage + resellerRatePercentage.percentage,
    fixed: providerRateFixed.fixed + merchantRateFixed.fixed + resellerRateFixed.fixed
  };
}

// Calculate Merchant and Reseller rates when MDR is changed directly
// Formula: MDR - Provider Rate = (Merchant Rate + Reseller Rate) / 2
function calculateRatesFromMDR(mdrPercentage: string, mdrFixed: string, providerPercentage: string, providerFixed: string): { 
  merchantPercentage: string; 
  merchantFixed: string; 
  resellerPercentage: string; 
  resellerFixed: string;
} {
  const mdr = parseRateValue(mdrPercentage, true);
  const mdrFixedValue = parseRateValue(mdrFixed, false);
  const provider = parseRateValue(providerPercentage, true);
  const providerFixedValue = parseRateValue(providerFixed, false);
  
  // Calculate remaining rate after subtracting provider rate
  // MDR - Provider Rate = (Merchant Rate + Reseller Rate) / 2
  const remainingPercentage = Math.max(0, mdr.percentage - provider.percentage);
  const remainingFixed = Math.max(0, mdrFixedValue.fixed - providerFixedValue.fixed);
  
  // Split remaining rate equally between merchant and reseller
  // Use precise calculation to avoid floating point errors
  const merchantPercentage = Math.round((remainingPercentage / 2) * 100) / 100;
  const merchantFixed = Math.round((remainingFixed / 2) * 100) / 100;
  const resellerPercentage = Math.round((remainingPercentage / 2) * 100) / 100;
  const resellerFixed = Math.round((remainingFixed / 2) * 100) / 100;
  
  return {
    merchantPercentage: formatPercentageValue(merchantPercentage),
    merchantFixed: formatFixedValue(merchantFixed),
    resellerPercentage: formatPercentageValue(resellerPercentage),
    resellerFixed: formatFixedValue(resellerFixed)
  };
}

export function MDRSection({ data, onChange }: MDRSectionProps) {
  const [isMDRManuallyEdited, setIsMDRManuallyEdited] = useState(false);
  
  // Track focus state for each percentage field to show/hide % symbol
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({
    mdrPercentage: false,
    mdrFixed: false,
    providerRatePercentage: false,
    providerRateFixed: false,
    merchantRatePercentage: false,
    merchantRateFixed: false,
    resellerRatePercentage: false,
    resellerRateFixed: false,
  });
  
  // Track latest input values to format on blur
  const [latestValues, setLatestValues] = useState<Record<string, string>>({});
  
  // Helper function to get display value (without % when focused, with % when not focused)
  const getDisplayValue = (value: string, fieldKey: string, isPercentage: boolean = true): string => {
    if (!value) return '';
    
    const isFocused = focusedFields[fieldKey];
    
    if (isPercentage) {
      if (isFocused) {
        // When focused, remove % symbol
        return value.replace(/%/g, '');
      } else {
        // When not focused, ensure % symbol is present
        const parsed = parseRateValue(value, true);
        if (parsed.percentage > 0 || value.includes('%')) {
          return value.includes('%') ? value : `${value}%`;
        }
        return value;
      }
    } else {
      // For fixed price, always show IDR format when not focused
      if (isFocused) {
        // When focused, remove IDR prefix and formatting
        return value.replace(/IDR\s*/g, '').replace(/,/g, '');
      } else {
        // When not focused, ensure IDR format
        const parsed = parseRateValue(value, false);
        if (parsed.fixed > 0 || value.includes('IDR')) {
          return value.includes('IDR') ? value : `IDR ${value}`;
        }
        return value;
      }
    }
  };
  
  // Helper function to handle blur - format value with % or IDR
  const handleBlur = (fieldKey: string, isPercentage: boolean = true) => {
    setFocusedFields(prev => ({ ...prev, [fieldKey]: false }));
    
    // Get the latest value from state or data
    const currentValue = latestValues[fieldKey] || (() => {
      if (fieldKey === 'mdrPercentage') return data.mdr.percentagePrice;
      if (fieldKey === 'mdrFixed') return data.mdr.fixedPrice;
      if (fieldKey === 'providerRatePercentage') return data.providerRate.percentagePrice;
      if (fieldKey === 'providerRateFixed') return data.providerRate.fixedPrice;
      if (fieldKey === 'merchantRatePercentage') return data.merchantRate.percentagePrice;
      if (fieldKey === 'merchantRateFixed') return data.merchantRate.fixedPrice;
      if (fieldKey === 'resellerRatePercentage') return data.resellerRate.percentagePrice;
      if (fieldKey === 'resellerRateFixed') return data.resellerRate.fixedPrice;
      return '';
    })();
    
    // Format value when blur - only format, don't trigger recalculation
    if (isPercentage) {
      const parsed = parseRateValue(currentValue, true);
      const formatted = formatPercentageValue(parsed.percentage);
      // Update the value if it's different (only format, no calculation)
      if (currentValue !== formatted && currentValue.trim() !== '') {
        // Determine which field to update based on fieldKey
        if (fieldKey === 'mdrPercentage') {
          onChange({ mdr: { ...data.mdr, percentagePrice: formatted } });
        } else if (fieldKey === 'providerRatePercentage') {
          onChange({ providerRate: { ...data.providerRate, percentagePrice: formatted } });
        } else if (fieldKey === 'merchantRatePercentage') {
          onChange({ merchantRate: { ...data.merchantRate, percentagePrice: formatted } });
        } else if (fieldKey === 'resellerRatePercentage') {
          onChange({ resellerRate: { ...data.resellerRate, percentagePrice: formatted } });
        }
      }
    } else {
      const parsed = parseRateValue(currentValue, false);
      const formatted = formatFixedValue(parsed.fixed);
      // Update the value if it's different (only format, no calculation)
      if (currentValue !== formatted && currentValue.trim() !== '') {
        if (fieldKey === 'mdrFixed') {
          onChange({ mdr: { ...data.mdr, fixedPrice: formatted } });
        } else if (fieldKey === 'providerRateFixed') {
          onChange({ providerRate: { ...data.providerRate, fixedPrice: formatted } });
        } else if (fieldKey === 'merchantRateFixed') {
          onChange({ merchantRate: { ...data.merchantRate, fixedPrice: formatted } });
        } else if (fieldKey === 'resellerRateFixed') {
          onChange({ resellerRate: { ...data.resellerRate, fixedPrice: formatted } });
        }
      }
    }
    
    // Clear latest value after formatting
    setLatestValues(prev => {
      const newValues = { ...prev };
      delete newValues[fieldKey];
      return newValues;
    });
  };
  
  // Helper to update latest value when onChange is called
  const updateLatestValue = (fieldKey: string, value: string) => {
    setLatestValues(prev => ({ ...prev, [fieldKey]: value }));
  };
  
  // Auto-calculate MDR when rates change (only if MDR hasn't been manually edited)
  // Formula: MDR = Provider Rate + Merchant Rate + Reseller Rate
  // Note: Only calculate percentage, fixed price is manual input only
  useEffect(() => {
    if (!isMDRManuallyEdited) {
      const calculatedMDR = calculateMDR(data);
      const mdrPercentage = formatPercentageValue(calculatedMDR.percentage);
      
      // Parse current MDR percentage to compare numeric values, not formatted strings
      // This allows calculation to work even when user is typing without %
      const currentMDRPercentage = parseRateValue(data.mdr.percentagePrice, true).percentage;
      const calculatedMDRPercentage = calculatedMDR.percentage;
      
      // Only update percentage if the calculated numeric value is different from current numeric value
      // Fixed price is not recalculated, it's manual input only
      if (Math.abs(currentMDRPercentage - calculatedMDRPercentage) > 0.001) {
        onChange({
          mdr: {
            percentagePrice: mdrPercentage,
            // Keep existing fixed price, don't recalculate
            fixedPrice: data.mdr.fixedPrice
          }
        });
      }
    }
  }, [
    data.providerRate.percentagePrice,
    data.merchantRate.percentagePrice,
    data.resellerRate.percentagePrice,
    isMDRManuallyEdited,
    data.mdr.percentagePrice,
    onChange
  ]);
  
  // Handle MDR manual changes - recalculate Merchant and Reseller rates
  // Formula: MDR - Provider Rate = (Merchant Rate + Reseller Rate) / 2
  // Note: Fixed price (IDR) is manual input only, no automatic calculation
  const handleMDRChange = (field: 'percentagePrice' | 'fixedPrice', value: string) => {
    setIsMDRManuallyEdited(true);
    
    // Calculate new MDR value
    const newMDR = { ...data.mdr, [field]: value };
    
    // Only calculate rates if percentage price is changed
    // Fixed price is manual input only, no calculation
    if (field === 'percentagePrice') {
      // Calculate Merchant and Reseller rates based on new MDR percentage
      const calculatedRates = calculateRatesFromMDR(
        newMDR.percentagePrice,
        newMDR.fixedPrice,
        data.providerRate.percentagePrice,
        data.providerRate.fixedPrice
      );
      
      onChange({
        mdr: newMDR,
        merchantRate: { 
          ...data.merchantRate, 
          percentagePrice: calculatedRates.merchantPercentage,
          // Keep existing fixed price, don't recalculate
          fixedPrice: data.merchantRate.fixedPrice
        },
        resellerRate: { 
          ...data.resellerRate, 
          percentagePrice: calculatedRates.resellerPercentage,
          // Keep existing fixed price, don't recalculate
          fixedPrice: data.resellerRate.fixedPrice
        }
      });
    } else {
      // For fixed price, just update the value without calculation
      onChange({
        mdr: newMDR
      });
    }
  };
  
  // Handle individual rate changes - recalculate MDR or adjust other rates
  // Formula when MDR is NOT manually edited: Provider Rate + Merchant Rate + Reseller Rate = MDR
  // Formula when MDR IS manually edited: MDR - Provider Rate = (Merchant Rate + Reseller Rate) / 2
  // Note: Fixed price (IDR) is manual input only, no automatic calculation
  const handleRateChange = (rateType: 'providerRate' | 'merchantRate' | 'resellerRate', field: 'percentagePrice' | 'fixedPrice', value: string) => {
    // For fixed price, just update the value without any calculation
    if (field === 'fixedPrice') {
      onChange({
        [rateType]: { ...data[rateType], [field]: value }
      });
      return;
    }
    
    // Validate: Rate cannot exceed MDR (only for percentage)
    const mdr = parseRateValue(data.mdr.percentagePrice, true);
    const inputValue = parseRateValue(value, true);
    
    // If input exceeds MDR, cap it at MDR
    if (inputValue.percentage > mdr.percentage) {
      value = formatPercentageValue(mdr.percentage);
    }
    
    const updatedData = {
      ...data,
      [rateType]: { ...data[rateType], [field]: value }
    };
    
    // If MDR is not manually edited, recalculate MDR from all rates
    // Formula: Provider Rate + Merchant Rate + Reseller Rate = MDR
    if (!isMDRManuallyEdited) {
      const calculatedMDR = calculateMDR(updatedData);
      const mdrPercentage = formatPercentageValue(calculatedMDR.percentage);
      
      onChange({
        ...updatedData,
        mdr: {
          percentagePrice: mdrPercentage,
          // Keep existing fixed price, don't recalculate
          fixedPrice: data.mdr.fixedPrice
        }
      });
    } else {
      // If MDR is manually edited, keep MDR fixed and adjust other rates
      // Formula: MDR - Provider Rate = (Merchant Rate + Reseller Rate) / 2
      if (rateType === 'providerRate') {
        // When Provider Rate changes, recalculate Merchant and Reseller rates
        const newProviderRate = {
          percentagePrice: value,
          fixedPrice: data.providerRate.fixedPrice
        };
        
        const calculatedRates = calculateRatesFromMDR(
          data.mdr.percentagePrice,
          data.mdr.fixedPrice,
          newProviderRate.percentagePrice,
          newProviderRate.fixedPrice
        );
        
        onChange({
          ...updatedData,
          merchantRate: { 
            ...data.merchantRate, 
            percentagePrice: calculatedRates.merchantPercentage,
            // Keep existing fixed price, don't recalculate
            fixedPrice: data.merchantRate.fixedPrice
          },
          resellerRate: { 
            ...data.resellerRate, 
            percentagePrice: calculatedRates.resellerPercentage,
            // Keep existing fixed price, don't recalculate
            fixedPrice: data.resellerRate.fixedPrice
          }
        });
      } else if (rateType === 'merchantRate' || rateType === 'resellerRate') {
        // When Merchant Rate or Reseller Rate changes, recalculate the other one
        // Formula: MDR - Provider Rate = (Merchant Rate + Reseller Rate) / 2
        // So: Merchant Rate + Reseller Rate = 2 * (MDR - Provider Rate)
        // If Merchant Rate changes: Reseller Rate = 2 * (MDR - Provider Rate) - Merchant Rate
        // If Reseller Rate changes: Merchant Rate = 2 * (MDR - Provider Rate) - Reseller Rate
        
        const mdr = parseRateValue(data.mdr.percentagePrice, true);
        const provider = parseRateValue(data.providerRate.percentagePrice, true);
        
        // Calculate remaining: MDR - Provider Rate
        const remainingPercentage = Math.max(0, mdr.percentage - provider.percentage);
        
        // Get the current rate values (after the change)
        const currentRate = rateType === 'merchantRate' ? data.merchantRate : data.resellerRate;
        const changedRatePercentage = parseRateValue(value, true);
        
        // Calculate the other rate: 2 * (MDR - Provider Rate) - Changed Rate
        const otherRatePercentage = Math.max(0, (2 * remainingPercentage) - changedRatePercentage.percentage);
        
        if (rateType === 'merchantRate') {
          // Merchant Rate changed, update Reseller Rate
          onChange({
            ...updatedData,
            resellerRate: {
              ...data.resellerRate,
              percentagePrice: formatPercentageValue(otherRatePercentage),
              // Keep existing fixed price, don't recalculate
              fixedPrice: data.resellerRate.fixedPrice
            }
          });
        } else {
          // Reseller Rate changed, update Merchant Rate
          onChange({
            ...updatedData,
            merchantRate: {
              ...data.merchantRate,
              percentagePrice: formatPercentageValue(otherRatePercentage),
              // Keep existing fixed price, don't recalculate
              fixedPrice: data.merchantRate.fixedPrice
            }
          });
        }
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
          <KeenIcon icon="information" style="outline" className="h-4 w-4 text-gray-400" />
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
                  <KeenIcon icon="information" style="outline" className="h-4 w-4 text-gray-400" />
                </Label>
              </TableCell>
              <TableCell className="pb-8">
                <div className="space-y-3">
                  <RangeInput
                    leftLabel="Percentage Price"
                    rightLabel="Fixed Price"
                    leftValue={getDisplayValue(data.mdr.percentagePrice, 'mdrPercentage', true)}
                    rightValue={getDisplayValue(data.mdr.fixedPrice, 'mdrFixed', false)}
                    leftPlaceholder="0.2%"
                    rightPlaceholder="IDR 0"
                    separator="plus"
                    onLeftChange={(value) => {
                      updateLatestValue('mdrPercentage', value);
                      handleMDRChange('percentagePrice', value);
                    }}
                    onRightChange={(value) => {
                      updateLatestValue('mdrFixed', value);
                      handleMDRChange('fixedPrice', value);
                    }}
                    onLeftFocus={() => setFocusedFields(prev => ({ ...prev, mdrPercentage: true }))}
                    onLeftBlur={() => handleBlur('mdrPercentage', true)}
                    onRightFocus={() => setFocusedFields(prev => ({ ...prev, mdrFixed: true }))}
                    onRightBlur={() => handleBlur('mdrFixed', false)}
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
                  leftValue={getDisplayValue(data.providerRate.percentagePrice, 'providerRatePercentage', true)}
                  rightValue={getDisplayValue(data.providerRate.fixedPrice, 'providerRateFixed', false)}
                  leftPlaceholder="0.7%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => {
                    updateLatestValue('providerRatePercentage', value);
                    handleRateChange('providerRate', 'percentagePrice', value);
                  }}
                  onRightChange={(value) => {
                    updateLatestValue('providerRateFixed', value);
                    handleRateChange('providerRate', 'fixedPrice', value);
                  }}
                  onLeftFocus={() => setFocusedFields(prev => ({ ...prev, providerRatePercentage: true }))}
                  onLeftBlur={() => handleBlur('providerRatePercentage', true)}
                  onRightFocus={() => setFocusedFields(prev => ({ ...prev, providerRateFixed: true }))}
                  onRightBlur={() => handleBlur('providerRateFixed', false)}
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
                  leftValue={getDisplayValue(data.merchantRate.percentagePrice, 'merchantRatePercentage', true)}
                  rightValue={getDisplayValue(data.merchantRate.fixedPrice, 'merchantRateFixed', false)}
                  leftPlaceholder="0.2%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => {
                    updateLatestValue('merchantRatePercentage', value);
                    handleRateChange('merchantRate', 'percentagePrice', value);
                  }}
                  onRightChange={(value) => {
                    updateLatestValue('merchantRateFixed', value);
                    handleRateChange('merchantRate', 'fixedPrice', value);
                  }}
                  onLeftFocus={() => setFocusedFields(prev => ({ ...prev, merchantRatePercentage: true }))}
                  onLeftBlur={() => handleBlur('merchantRatePercentage', true)}
                  onRightFocus={() => setFocusedFields(prev => ({ ...prev, merchantRateFixed: true }))}
                  onRightBlur={() => handleBlur('merchantRateFixed', false)}
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
                    <KeenIcon icon="information" style="outline" className="h-4 w-4 text-gray-400" />
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
                  leftValue={getDisplayValue(data.resellerRate.percentagePrice, 'resellerRatePercentage', true)}
                  rightValue={getDisplayValue(data.resellerRate.fixedPrice, 'resellerRateFixed', false)}
                  leftPlaceholder="0.5%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => {
                    updateLatestValue('resellerRatePercentage', value);
                    handleRateChange('resellerRate', 'percentagePrice', value);
                  }}
                  onRightChange={(value) => {
                    updateLatestValue('resellerRateFixed', value);
                    handleRateChange('resellerRate', 'fixedPrice', value);
                  }}
                  onLeftFocus={() => setFocusedFields(prev => ({ ...prev, resellerRatePercentage: true }))}
                  onLeftBlur={() => handleBlur('resellerRatePercentage', true)}
                  onRightFocus={() => setFocusedFields(prev => ({ ...prev, resellerRateFixed: true }))}
                  onRightBlur={() => handleBlur('resellerRateFixed', false)}
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