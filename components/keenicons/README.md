# KeenIcon Configuration Guide

## Overview
KeenIcon adalah komponen icon font yang mendukung styling melalui className.

## Konfigurasi yang Tersedia

### 1. Mengubah Warna Icon ✅
Warna icon bisa diubah menggunakan Tailwind CSS classes melalui prop `className`:

```tsx
// Warna abu-abu
<KeenIcon icon="trash" className="w-4 h-4 text-gray-600" />

// Warna merah
<KeenIcon icon="trash" className="w-4 h-4 text-red-500" />

// Warna biru
<KeenIcon icon="filter" className="w-4 h-4 text-blue-600" />

// Warna slate
<KeenIcon icon="message-programming" className="w-4 h-4 text-slate-700" />
```

### 2. Menambahkan Border/Outline ✅
Karena KeenIcon menggunakan font icon, border bisa ditambahkan dengan beberapa cara:

#### Cara 1: Menggunakan Wrapper Div (Recommended)
```tsx
<div className="flex items-center justify-center w-5 h-5 border border-gray-500 rounded bg-gray-100">
  <KeenIcon icon="message-programming" className="w-4 h-4 text-slate-700" />
</div>
```

#### Cara 2: Menggunakan Style "outline"
KeenIcon memiliki style `outline` yang memberikan efek outline:
```tsx
<KeenIcon icon="trash" style="outline" className="w-4 h-4 text-gray-600" />
```

#### Cara 3: Menambahkan Border Class Langsung (Limited)
```tsx
<KeenIcon 
  icon="trash" 
  className="w-4 h-4 text-gray-600 border border-gray-500 rounded p-1" 
/>
```

### 3. Style yang Tersedia
- `filled` (default)
- `solid`
- `outline`
- `duotone`

### 4. Contoh Lengkap dengan Border dan Warna
```tsx
// Icon dengan border dan background
<div className="flex items-center justify-center w-6 h-6 border border-gray-300 rounded-md bg-gray-50">
  <KeenIcon 
    icon="message-programming" 
    style="solid"
    className="w-4 h-4 text-slate-700" 
  />
</div>

// Icon dengan border tipis
<div className="flex items-center justify-center w-5 h-5 border border-gray-500 rounded">
  <KeenIcon 
    icon="switch" 
    style="solid"
    className="w-3.5 h-3.5 text-slate-600" 
  />
</div>
```

## Tips
- Gunakan wrapper div untuk border yang lebih konsisten
- Style `outline` memberikan efek outline tanpa perlu border manual
- Warna bisa dikombinasikan dengan hover states: `hover:text-gray-800`
- Size icon bisa dikontrol dengan `w-*` dan `h-*` classes

