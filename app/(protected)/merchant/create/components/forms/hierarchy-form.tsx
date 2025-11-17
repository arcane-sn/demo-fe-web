'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo, Fragment } from 'react';
import { Building2, Copy, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getHierarchySchema, type HierarchySchemaType } from '../../../core/schemas';
import { ReusableTable } from '@/components/table';
import type { TableConfig, BaseTableData } from '@/components/table';
import { ColumnDef } from '@tanstack/react-table';
import { mockMerchants } from '../../../core/data/mock-data';
import type { MerchantData } from '../../../types/merchant';
import { toAbsoluteUrl } from '@/lib/helpers';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';

interface MerchantLevel {
  id: string;
  name: string;
  description: string;
  hasParent: boolean;
  canHaveChildren: boolean;
}

interface ParentMerchant extends MerchantData {
  parentClientId?: string;
  type?: string;
  location?: string;
}

export function HierarchyForm() {
  const [showAvailableParents, setShowAvailableParents] = useState(false);

  const form = useForm<HierarchySchemaType>({
    resolver: zodResolver(getHierarchySchema()),
    defaultValues: {
      selectedLevel: 'level-1',
      selectedParent: '',
      hasParentMerchant: false
    }
  });

  const onSubmit = (data: HierarchySchemaType) => {
    // TODO: Implement form submission
  };

  const merchantLevels: MerchantLevel[] = [
    {
      id: 'level-0',
      name: 'Level 0 (Grand-Parent Merchant)',
      description: "Top-level merchant. Doesn't have a parent merchant above",
      hasParent: false,
      canHaveChildren: true
    },
    {
      id: 'level-1',
      name: 'Level 1 (Parent Merchant)',
      description: 'Has a parent (Level 0). Can have child merchants.',
      hasParent: true,
      canHaveChildren: true
    },
    {
      id: 'level-2',
      name: 'Level 2 (Child Merchant)',
      description: 'Has a parent (Level 1). Can have child merchants',
      hasParent: true,
      canHaveChildren: true
    },
    {
      id: 'level-3',
      name: 'Level 3 (Grand-Child Merchant)',
      description: 'Has a parent (Level 2). Cannot have child merchants below.',
      hasParent: true,
      canHaveChildren: false
    }
  ];

  const availableParents: ParentMerchant[] = useMemo(() => {
    return mockMerchants.map(merchant => ({
      ...merchant,
      parentClientId: 'PMUP123999222',
      type: `Level ${merchant.merchantLevel.level}`,
      location: 'Jakarta'
    }));
  }, []);

  const selectedLevelData = useMemo(() => {
    return merchantLevels.find(level => level.id === form.watch('selectedLevel'));
  }, [form.watch('selectedLevel')]);

  const filteredParents = useMemo(() => {
    if (!selectedLevelData?.hasParent) return [];
    
    return availableParents.filter(parent => {
      const parentType = parent.type || '';
      const selectedLevel = form.watch('selectedLevel');
      if (selectedLevel === 'level-1') return parentType.includes('Level 0');
      if (selectedLevel === 'level-2') return parentType.includes('Level 0') || parentType.includes('Level 1');
      if (selectedLevel === 'level-3') return parentType.includes('Level 1') || parentType.includes('Level 2');
      return false;
    });
  }, [selectedLevelData, availableParents, form.watch('selectedLevel')]);

  // Table columns configuration
  const columns: ColumnDef<ParentMerchant>[] = [
    {
      accessorKey: 'companyName',
      header: 'Company Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.original.companyName}</div>
      ),
    },
    {
      accessorKey: 'clientId',
      header: 'Client ID',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{row.original.clientId}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => navigator.clipboard.writeText(row.original.clientId)}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: 'parentClientId',
      header: 'Parent Client ID',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{row.original.parentClientId || 'N/A'}</span>
          {row.original.parentClientId && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => navigator.clipboard.writeText(row.original.parentClientId!)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'productionStatus',
      header: 'Production Status',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            row.original.productionStatus.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
          <span>{row.original.productionStatus.label}</span>
        </div>
      ),
    },
    {
      accessorKey: 'registeredDate',
      header: 'Registered Date',
      cell: ({ row }) => (
        <div className="text-sm whitespace-pre-line">
          {row.original.registeredDate.date}
          <br />
          {row.original.registeredDate.time} ({row.original.registeredDate.timezone})
        </div>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => handleSelectParent(row.original.id)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Select
        </Button>
      ),
    },
  ];

  // Table configuration
  const tableConfig: TableConfig<ParentMerchant> = {
    data: filteredParents,
    columns,
    enableRowSelection: false,
    enableSorting: true,
    enablePagination: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    searchable: true,
    searchPlaceholder: "Search Merchants",
    searchFields: ['companyName', 'clientId', 'brandName'],
  };

  const handleSelectParent = (parentId: string) => {
    form.setValue('selectedParent', parentId);
    setShowAvailableParents(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        <Card className="max-w-4xl mx-auto" id="merchant-level">
          <CardHeader>
            <CardTitle>Merchant Level</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="selectedLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Select Merchant Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select merchant level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {merchantLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          <div>
                            <div className="font-medium">{level.name}</div>
                            <div className="text-sm text-muted-foreground">{level.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto" id="merchant-hierarchy">
          <CardHeader>
            <CardTitle>Merchant Hierarchy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Have a Parent Merchant Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel className="text-sm font-medium">Have a Parent Merchant</FormLabel>
                  <p className="text-sm text-muted-foreground mt-1">
                    Toggle ON if this merchant have a Parent Merchant and want to set as a Sub-Merchant
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="hasParentMerchant"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            // Reset selectedParent when toggle is turned off
                            if (!checked) {
                              form.setValue('selectedParent', '');
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div 
              className={`flex items-center justify-between p-8 border rounded-lg bg-no-repeat bg-right bg-cover rtl:bg-left ${
                form.watch('hasParentMerchant') && form.watch('selectedParent') 
                  ? 'bg-white' 
                  : 'bg-white'
              }`}
              style={{ 
                backgroundImage: form.watch('hasParentMerchant') && form.watch('selectedParent')
                  ? "url('/media/images/2600x1200/bg-5.png')"
                  : "url('/media/images/2600x1200/bg-5.png')",
                backgroundSize: '650px',
                backgroundPosition: 'right center'
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  form.watch('hasParentMerchant') && form.watch('selectedParent')
                    ? 'bg-gray-100 border border-blue-500'
                    : 'bg-gray-100'
                }`}>
                  <Store className={`w-5 h-5 ${
                    form.watch('hasParentMerchant') && form.watch('selectedParent')
                      ? 'text-blue-600'
                      : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-medium ${
                    form.watch('hasParentMerchant') && form.watch('selectedParent')
                      ? 'text--900'
                      : 'text-gray-900'
                  }`}>
                    {form.watch('hasParentMerchant') ? 'Sub-Merchant' : 'Top-Level Merchant'}
                  </h3>
                  <p className={`text-sm ${
                    form.watch('hasParentMerchant') && form.watch('selectedParent')
                      ? 'text--700'
                      : 'text-muted-foreground'
                  }`}>
                    {form.watch('hasParentMerchant') && form.watch('selectedParent')
                      ? `Parent: ${availableParents.find(p => p.id === form.watch('selectedParent'))?.companyName}`
                      : form.watch('hasParentMerchant') 
                        ? 'Has a parent merchant above' 
                        : 'Doesn\'t have a parent merchant above'
                    }
                  </p>
                </div>
              </div>
              
              {form.watch('hasParentMerchant') && !form.watch('selectedParent') && (
                <Button 
                  type="button"
                  variant="primary"
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => setShowAvailableParents(true)}
                >
                  Select Parent Merchant
                </Button>
              )}
              
              {form.watch('hasParentMerchant') && form.watch('selectedParent') && (
                <Button 
                  type="button"
                  variant="primary"
                  className="bg-blue-100 hover:bg-blue-700 text-blue-600 border border-blue-500"
                  onClick={() => setShowAvailableParents(true)}
                >
                  Change Parent
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Dialog open={showAvailableParents} onOpenChange={setShowAvailableParents}>
          <DialogContent className="max-w-6xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Select Level 0 Parent Merchant</DialogTitle>
            </DialogHeader>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active Merchants</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {filteredParents.length}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Other
                </div>
              </div>
              
              <ReusableTable
                config={tableConfig}
                headerConfig={{
                  showRecordCount: false,
                }}
                toolbarConfig={{
                  showSearch: true,
                  showFilters: false,
                  showColumnVisibility: false,
                  searchPlaceholder: "Search Merchants",
                }}
                footerConfig={{
                  showPagination: true,
                  showRowCount: true,
                  showSelectedCount: false,
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}