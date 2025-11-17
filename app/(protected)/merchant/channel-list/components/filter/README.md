# Payment Method Filter Modal

A React component that provides a filter modal for payment methods with expandable sections, matching the design from the provided image.

## Features

- ✅ Expandable/collapsible sections with chevron icons
- ✅ Custom checkbox styling matching the design
- ✅ Select All and Clear functionality
- ✅ Proper state management for nested options
- ✅ Responsive design
- ✅ TypeScript support

## Usage

```tsx
import { PaymentMethodFilterModal } from './modal';

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyFilters = (filters: PaymentMethodState) => {
    console.log('Applied filters:', filters);
    // Handle the applied filters
  };

  const handleResetFilters = () => {
    console.log('Filters reset');
    // Handle reset
  };

  return (
    <PaymentMethodFilterModal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      onApply={handleApplyFilters}
      onReset={handleResetFilters}
    />
  );
};
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Controls the modal visibility |
| `onOpenChange` | `(open: boolean) => void` | Callback when modal open state changes |
| `onApply` | `(values: PaymentMethodState) => void` | Callback when filters are applied |
| `onReset` | `() => void` | Callback when filters are reset |

## PaymentMethodState Interface

```tsx
interface PaymentMethodState {
  qrCode: {
    enabled: boolean;
    qris: boolean;
  };
  virtualAccount: {
    enabled: boolean;
    bcaVa: boolean;
    mandiriVa: boolean;
    bniVa: boolean;
  };
  eWallet: {
    enabled: boolean;
  };
  debitCreditCard: {
    enabled: boolean;
  };
}
```

## Design Features

The component matches the exact design from the provided image:

- **QR CODE**: Expandable section with QRIS sub-option
- **VIRTUAL ACCOUNT**: Expandable section with BCA VA, MANDIRI VA, BNI VA sub-options
- **E-WALLET**: Collapsible section (currently collapsed in design)
- **DEBIT/CREDIT CARD**: Collapsible section (currently collapsed in design)
- **Select All/Clear buttons**: Top-right positioned action buttons
- **Custom checkboxes**: Blue checked state with white checkmark, white unchecked state
- **Chevron icons**: Down arrow for expanded, up arrow for collapsed
- **Proper spacing and typography**: Matching the original design

## Demo

Use the `PaymentMethodFilterDemo` component to see the modal in action:

```tsx
import { PaymentMethodFilterDemo } from './modal';

// Use in your page/component
<PaymentMethodFilterDemo />
```
