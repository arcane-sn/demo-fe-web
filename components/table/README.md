# Reusable Table Components

Komponen table yang reusable dan dapat dikustomisasi untuk berbagai kebutuhan. Dibuat berdasarkan `base-table.tsx` dengan struktur yang lebih modular dan mudah digunakan.

## Struktur Folder

```
@table/
├── types/
│   └── index.ts                 # Type definitions
├── hooks/
│   ├── use-table-state.ts      # State management hook
│   └── use-table-columns.ts    # Column generation hook
├── components/
│   ├── table-header.tsx        # Table header component
│   ├── table-toolbar.tsx       # Toolbar component
│   ├── table-body.tsx          # Table body component
│   ├── table-footer.tsx        # Table footer component
│   └── table-filters.tsx       # Filters component
├── examples/
│   ├── users-table.tsx         # Complex table example
│   └── simple-table.tsx        # Simple table example
├── reusable-table.tsx          # Main table component
├── index.ts                    # Main exports
└── README.md                   # Documentation
```

## Fitur Utama

- ✅ **Reusable**: Dapat digunakan di berbagai halaman dengan konfigurasi yang berbeda
- ✅ **Customizable**: Header, toolbar, footer, dan actions dapat dikustomisasi
- ✅ **Search & Filter**: Built-in search dan filter functionality
- ✅ **Sorting**: Column sorting dengan visual indicators
- ✅ **Pagination**: Built-in pagination dengan konfigurasi
- ✅ **Row Selection**: Single dan multiple row selection
- ✅ **Column Management**: Show/hide columns, resizing, pinning
- ✅ **Actions**: Custom actions per row dengan dropdown atau buttons
- ✅ **Loading & Error States**: Built-in loading dan error handling
- ✅ **TypeScript**: Full TypeScript support dengan type safety

## Penggunaan Dasar

### 1. Import Komponen

```tsx
import { ReusableTable, BaseTableData, TableConfig } from '@/@table';
```

### 2. Define Data Interface

```tsx
interface MyData extends BaseTableData {
  name: string;
  email: string;
  status: 'active' | 'inactive';
}
```

### 3. Define Columns

```tsx
const columns: ColumnDef<MyData>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataGridColumnHeader title="Name" column={column} />
    ),
    cell: ({ row }) => <span>{row.original.name}</span>,
    enableSorting: true,
  },
  // ... more columns
];
```

### 4. Configure Table

```tsx
const tableConfig: TableConfig<MyData> = {
  data: myData,
  columns,
  enableRowSelection: true,
  enableSorting: true,
  enablePagination: true,
  pageSize: 10,
  searchable: true,
  searchPlaceholder: 'Search...',
  searchFields: ['name', 'email'],
  customFilters: [
    {
      id: 'status',
      label: 'Status',
      type: 'multiselect',
      options: [
        { label: 'Active', value: 'active', count: 5 },
        { label: 'Inactive', value: 'inactive', count: 2 },
      ],
    },
  ],
};
```

### 5. Render Table

```tsx
<ReusableTable
  config={tableConfig}
  headerConfig={{
    title: 'My Data',
    subtitle: 'Manage your data',
    showRecordCount: true,
  }}
  toolbarConfig={{
    showSearch: true,
    showFilters: true,
    showColumnVisibility: true,
  }}
  footerConfig={{
    showPagination: true,
    showRowCount: true,
    showSelectedCount: true,
  }}
  onRowClick={(row) => console.log('Row clicked:', row.original)}
  onSelectionChange={(selectedRows) => console.log('Selected:', selectedRows)}
/>
```

## Konfigurasi Lanjutan

### Custom Actions

```tsx
const actionConfig: ActionCellConfig<MyData> = {
  actions: [
    {
      label: 'Edit',
      onClick: (row) => console.log('Edit:', row.original),
    },
    {
      label: 'Delete',
      variant: 'destructive',
      onClick: (row) => console.log('Delete:', row.original),
    },
  ],
  showDropdown: true, // Use dropdown menu
  maxVisibleActions: 3,
};
```

### Custom Filters

```tsx
const customFilters: TableFilter[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'multiselect',
    options: [
      { label: 'Active', value: 'active', count: 10 },
      { label: 'Inactive', value: 'inactive', count: 5 },
    ],
  },
  {
    id: 'date',
    label: 'Date Range',
    type: 'dateRange',
    // Custom date range picker
  },
];
```

### Custom Header/Footer

```tsx
const customHeader = (
  <div className="flex items-center justify-between">
    <h1>Custom Header</h1>
    <Button>Custom Action</Button>
  </div>
);

const customFooter = (
  <div className="flex justify-between">
    <span>Custom Footer</span>
    <Button>Export</Button>
  </div>
);
```

## Contoh Penggunaan

Lihat file di folder `examples/` untuk contoh penggunaan yang lebih lengkap:

- `users-table.tsx` - Contoh table kompleks dengan semua fitur
- `simple-table.tsx` - Contoh table sederhana

## Migration dari base-table.tsx

Untuk migrasi dari `base-table.tsx` yang sudah ada:

1. Extract data interface dan data array
2. Extract column definitions
3. Convert ke `TableConfig` format
4. Replace komponen dengan `ReusableTable`
5. Customize header, toolbar, dan footer sesuai kebutuhan

## TypeScript Support

Semua komponen memiliki TypeScript support penuh dengan:
- Generic types untuk data
- Type-safe configuration
- IntelliSense support
- Compile-time error checking

## Dependencies

Komponen ini menggunakan:
- `@tanstack/react-table` untuk table functionality
- `@radix-ui/react-dropdown-menu` untuk dropdown actions
- `lucide-react` untuk icons
- `sonner` untuk toast notifications
- Custom UI components dari project
