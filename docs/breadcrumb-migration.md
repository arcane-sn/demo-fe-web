# Breadcrumb System Documentation

## Overview

Sistem breadcrumb telah diubah dari yang sebelumnya bergantung pada `menu.config.tsx` menjadi sistem yang otomatis membaca seluruh struktur page di aplikasi. Ini membuat sistem lebih maintainable dan tidak perlu mengupdate konfigurasi menu setiap kali ada page baru.

## Perubahan Utama

### Sebelum (Menu Config Based)
```typescript
// Bergantung pada MENU_SIDEBAR dari config
const { getBreadcrumb } = useMenu(pathname);
const items = getBreadcrumb(MENU_SIDEBAR);
```

### Sesudah (Auto Page Detection)
```typescript
// Otomatis membaca dari struktur URL/pathname
const { breadcrumbItems } = useBreadcrumb();
```

## Keuntungan Sistem Baru

1. **Automatic**: Tidak perlu mendefinisikan setiap page di menu config
2. **Maintainable**: Perubahan struktur page otomatis tercermin di breadcrumb
3. **Consistent**: Semua page (termasuk yang tidak ada di sidebar) punya breadcrumb
4. **Flexible**: Mudah mengcustomize title untuk path tertentu

## Cara Menggunakan

### Hook `useBreadcrumb`

```typescript
import { useBreadcrumb } from '@/hooks/use-breadcrumb';

function MyComponent() {
  const { breadcrumbItems, getCurrentPageTitle } = useBreadcrumb();
  
  return (
    <div>
      <h1>{getCurrentPageTitle()}</h1>
      <nav>
        {breadcrumbItems.map(item => (
          <span key={item.path}>{item.title}</span>
        ))}
      </nav>
    </div>
  );
}
```

### Komponen Breadcrumb

```typescript
import { Breadcrumb } from '@/app/components/layouts/demo1/components/breadcrumb';

// Langsung bisa digunakan, otomatis membaca dari URL
<Breadcrumb />
```

## Customisasi Title

Untuk mengcustomize title dari path tertentu, edit `PATH_TITLE_MAPPING` di `hooks/use-breadcrumb.ts`:

```typescript
const PATH_TITLE_MAPPING: Record<string, string> = {
  'my-custom-path': 'Custom Page Title',
  'another-path': 'Another Title',
  // ... 
};
```

## Migrasi dari Sistem Lama

### Komponen yang Sudah Diupdate
- ✅ `app/components/layouts/demo1/components/breadcrumb.tsx`
- ✅ `app/components/layouts/demo1/components/toolbar.tsx`
- ✅ `app/components/partials/common/toolbar.tsx`

### Pattern Migrasi

**Sebelum:**
```typescript
import { useMenu } from '@/hooks/use-menu';
import { MENU_SIDEBAR } from '@/config/menu.config';

const { getBreadcrumb, getCurrentItem } = useMenu(pathname);
const items = getBreadcrumb(MENU_SIDEBAR);
const currentItem = getCurrentItem(MENU_SIDEBAR);
```

**Sesudah:**
```typescript
import { useBreadcrumb } from '@/hooks/use-breadcrumb';

const { breadcrumbItems, getCurrentPageTitle } = useBreadcrumb();
```

## Hooks Tambahan

### `usePageTitle`
Hook untuk backward compatibility:
```typescript
import { usePageTitle } from '@/hooks/use-page';

const { getCurrentPageTitle } = usePageTitle();
```

### `useCurrentPage`
Hook untuk mendapatkan informasi halaman saat ini:
```typescript
import { useCurrentPage } from '@/hooks/use-page';

const { currentPage, title, path, breadcrumb } = useCurrentPage();
```

## Struktur Data

### BreadcrumbItem
```typescript
interface BreadcrumbItem {
  title: string;    // Title yang ditampilkan
  path: string;     // Path URL
  isActive: boolean; // Apakah item ini adalah halaman saat ini
}
```

## Tips & Best Practices

1. **Konsistensi Naming**: Gunakan kebab-case untuk folder/file names yang akan menjadi readable titles
2. **Custom Titles**: Tambahkan mapping untuk path yang perlu title khusus
3. **Dynamic Routes**: Hook sudah handle dynamic routes seperti `[id]`, `[slug]`, dll
4. **Route Groups**: Route groups seperti `(auth)`, `(protected)` otomatis diabaikan

## Troubleshooting

### Q: Breadcrumb tidak muncul untuk page tertentu
A: Pastikan page memiliki file `page.tsx` dan path tidak mengandung route group yang tidak diinginkan

### Q: Title tidak sesuai yang diinginkan
A: Tambahkan mapping di `PATH_TITLE_MAPPING` atau gunakan prop `title` di komponen toolbar

### Q: Breadcrumb terlalu panjang
A: Sistem otomatis mengikuti struktur folder, pertimbangkan untuk merestruktur atau custom logic di hook

## Migration Checklist

- [ ] Update semua komponen yang menggunakan `useMenu` untuk breadcrumb
- [ ] Update import statements
- [ ] Test breadcrumb di semua page
- [ ] Tambahkan custom title mapping jika diperlukan
- [ ] Remove unused imports dari menu config
