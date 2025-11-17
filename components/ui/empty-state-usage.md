# Empty State Component - Panduan Penggunaan

Komponen `EmptyState` dirancang untuk menampilkan kondisi ketika tidak ada data dalam tabel atau daftar. Komponen ini menyediakan ilustrasi, pesan yang informatif, dan tombol aksi untuk membantu pengguna memahami situasi dan mengambil tindakan yang diperlukan.

## Fitur Utama

- ✅ **Ilustrasi Default**: Ilustrasi SVG yang menarik dengan tema puzzle piece
- ✅ **Kustomisasi Konten**: Title, description, dan action button yang dapat disesuaikan
- ✅ **Predefined States**: Empty state siap pakai untuk berbagai skenario
- ✅ **Responsive Design**: Tampilan yang optimal di berbagai ukuran layar
- ✅ **TypeScript Support**: Full type safety dan IntelliSense

## Penggunaan Dasar

### 1. Import Komponen

```tsx
import { EmptyState, EmptyStates } from '@/components/ui/empty-state';
```

### 2. Penggunaan Sederhana

```tsx
<EmptyState
  title="No Data Available"
  description="There are no records to display at the moment."
  actionLabel="Add New Item"
  onAction={() => console.log('Add new item')}
/>
```

### 3. Menggunakan Predefined Empty States

```tsx
// Untuk merchant table
<EmptyStates.NoMerchants 
  onAction={() => handleCreateMerchant()} 
/>

// Untuk user table
<EmptyStates.NoUsers 
  onAction={() => handleCreateUser()} 
/>

// Untuk search results
<EmptyStates.NoSearchResults 
  onAction={() => clearFilters()} 
/>
```

## Konfigurasi Lengkap

### Props Interface

```tsx
interface EmptyStateProps {
  // Content
  title: string;
  description?: string;
  
  // Illustration/Icon
  illustration?: React.ReactNode;
  icon?: React.ReactNode;
  
  // Action
  actionLabel?: string;
  onAction?: () => void;
  actionVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  
  // Styling
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

### Contoh Konfigurasi Lengkap

```tsx
<EmptyState
  title="No Merchants Yet"
  description="Looks like you don't have any merchants. Add one now to begin managing your business transactions."
  actionLabel="Create New Merchant"
  onAction={handleCreateMerchant}
  actionVariant="default"
  size="md"
  className="my-custom-class"
/>
```

## Predefined Empty States

### 1. NoData
```tsx
<EmptyStates.NoData 
  onAction={() => handleAddData()} 
/>
```

### 2. NoMerchants
```tsx
<EmptyStates.NoMerchants 
  onAction={() => handleCreateMerchant()} 
/>
```

### 3. NoUsers
```tsx
<EmptyStates.NoUsers 
  onAction={() => handleCreateUser()} 
/>
```

### 4. NoTransactions
```tsx
<EmptyStates.NoTransactions 
  onAction={() => handleCreateTransaction()} 
/>
```

### 5. NoSearchResults
```tsx
<EmptyStates.NoSearchResults 
  onAction={() => clearFilters()} 
/>
```

### 6. Error
```tsx
<EmptyStates.Error 
  onAction={() => handleRetry()} 
/>
```

## Integrasi dengan Table Component

### 1. Konfigurasi Empty State di Table

```tsx
// Di table config
const emptyStateConfig: EmptyStateConfig = {
  type: 'noMerchants',
  actionLabel: 'Create New Merchant',
  onAction: onCreate,
};

// Di ReusableTable
<ReusableTable
  config={tableConfig}
  emptyStateConfig={emptyStateConfig}
  // ... other props
/>
```

### 2. Custom Empty State untuk Table

```tsx
const customEmptyStateConfig: EmptyStateConfig = {
  title: "No Products Found",
  description: "Start by adding your first product to begin selling.",
  actionLabel: "Add Product",
  onAction: handleAddProduct,
  illustration: <CustomIllustration />,
};
```

## Kustomisasi Ilustrasi

### 1. Menggunakan Icon

```tsx
<EmptyState
  title="No Data"
  icon={<Database className="w-16 h-16 text-muted-foreground" />}
  actionLabel="Add Data"
  onAction={handleAddData}
/>
```

### 2. Custom Illustration

```tsx
const CustomIllustration = () => (
  <div className="w-32 h-32 mx-auto mb-6">
    <svg viewBox="0 0 200 200" className="w-full h-full text-muted-foreground">
      {/* Custom SVG content */}
    </svg>
  </div>
);

<EmptyState
  title="Custom State"
  illustration={<CustomIllustration />}
  actionLabel="Take Action"
  onAction={handleAction}
/>
```

## Best Practices

### 1. Pesan yang Jelas dan Informatif
```tsx
// ✅ Good
<EmptyState
  title="No Orders Yet"
  description="You haven't received any orders yet. Once customers start placing orders, they'll appear here."
  actionLabel="View Products"
  onAction={handleViewProducts}
/>

// ❌ Avoid
<EmptyState
  title="Empty"
  description="No data"
/>
```

### 2. Action Button yang Relevan
```tsx
// ✅ Good - Action yang membantu user
<EmptyState
  title="No Search Results"
  description="Try adjusting your search terms or filters."
  actionLabel="Clear Filters"
  onAction={clearFilters}
  actionVariant="outline"
/>

// ❌ Avoid - Action yang tidak relevan
<EmptyState
  title="No Data"
  actionLabel="Go to Settings" // Tidak relevan dengan konteks
  onAction={goToSettings}
/>
```

### 3. Ukuran yang Sesuai Konteks
```tsx
// Untuk modal atau card kecil
<EmptyState size="sm" title="No Items" />

// Untuk halaman utama
<EmptyState size="lg" title="Welcome to Your Dashboard" />
```

## Contoh Implementasi di Merchant Table

```tsx
// 1. Di table config
const emptyStateConfig: EmptyStateConfig = {
  type: 'noMerchants',
  actionLabel: 'Create New Merchant',
  onAction: handleCreateMerchant,
};

// 2. Di table component
<ReusableTable
  config={tableConfig}
  emptyStateConfig={emptyStateConfig}
  // ... other props
/>

// 3. Hasil yang ditampilkan:
// - Ilustrasi puzzle piece dengan grid background
// - Title: "No Merchants Yet"
// - Description: "Looks like you don't have any merchants. Add one now to begin managing your business transactions."
// - Button: "Create New Merchant" dengan icon plus
```

## Styling dan Theming

Komponen menggunakan Tailwind CSS dan mengikuti design system yang sudah ada:

- **Colors**: Menggunakan semantic color tokens (`text-foreground`, `text-muted-foreground`, dll)
- **Spacing**: Menggunakan spacing scale yang konsisten
- **Typography**: Mengikuti hierarchy typography yang sudah ditetapkan
- **Components**: Menggunakan komponen UI yang sudah ada (Button, Card, dll)

## Testing

Untuk testing empty state:

```tsx
// Test dengan data kosong
const emptyData: MerchantData[] = [];

<MerchantTable
  data={emptyData}
  onCreate={mockCreateHandler}
  // ... other props
/>

// Verify empty state muncul
expect(screen.getByText('No Merchants Yet')).toBeInTheDocument();
expect(screen.getByText('Create New Merchant')).toBeInTheDocument();
```
