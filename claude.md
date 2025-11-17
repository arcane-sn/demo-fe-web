
rules:
- letakkan const di core/_consts.ts dan type interface di core/_models.ts
- hindari penggunaan inline style dan fixed size di height dan width
- gunakan icon lucid-react yang mendekati icon figma
- jika ketemu code svg, jadikan file image svg
- penulisan classname terutama color dan font-style harus merujuk pada reui.config.css dan tailwind config


# 🎨 UI Components Documentation

## 📋 Overview

This document serves as a comprehensive AI documentation tool for all UI components in the `components/ui` folder. It provides detailed information about each component's structure, props, variants, and usage patterns to help AI make informed decisions when working with the design system.

## 🏗️ Architecture Principles

### Design System Foundation
- **Built on Radix UI**: All components are built on top of Radix UI primitives for accessibility and functionality
- **Class Variance Authority (CVA)**: Uses `cva` for type-safe variant management
- **Tailwind CSS**: Styling with utility-first approach
- **TypeScript**: Full type safety with proper interfaces and variants
- **Data Attributes**: Uses `data-slot` attributes for component identification

### Component Structure Pattern
```typescript
// Standard component structure
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { /* variant options */ },
      size: { /* size options */ },
      // ... other variants
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

function Component({ className, variant, size, ...props }) {
  return (
    <Primitive
      data-slot="component-name"
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

---

## 🧩 Core Components

### 1. **Button** (`button.tsx`)
**Purpose**: Interactive button component with multiple variants and modes

#### **Variants**
- `primary`: Main action button (blue background)
- `secondary`: Secondary action (gray background)
- `destructive`: Dangerous actions (red background)
- `outline`: Outlined button
- `dashed`: Dashed border button
- `ghost`: Transparent background
- `mono`: Monochrome styling
- `foreground`: Uses foreground color
- `inverse`: Inverse color scheme

#### **Modes**
- `default`: Standard button behavior
- `icon`: Icon-only button
- `link`: Link-style button
- `input`: Input field trigger style

#### **Sizes**
- `sm`: Small (h-7, px-2.5, text-xs)
- `md`: Medium (h-8.5, px-3, text-[0.8125rem])
- `lg`: Large (h-10, px-4, text-sm)
- `icon`: Icon size (size-8.5)

#### **Additional Props**
- `shape`: `default` | `circle`
- `appearance`: `default` | `ghost`
- `autoHeight`: `true` | `false`
- `underlined`: `solid` | `dashed`
- `underline`: `solid` | `dashed`
- `asChild`: Render as child component
- `selected`: Selected state

#### **Usage Examples**
```tsx
// Primary button
<Button variant="primary" size="md">Save Changes</Button>

// Icon button
<Button variant="outline" mode="icon" size="sm">
  <Plus className="size-4" />
</Button>

// Link button
<Button variant="primary" mode="link" underline="solid">
  Learn More
</Button>

// With arrow
<Button variant="outline" data-arrow="true">
  Select Option
  <ButtonArrow />
</Button>
```

---

### 2. **Input** (`input.tsx`)
**Purpose**: Form input component with addon support

#### **Components**
- `Input`: Main input field
- `InputAddon`: Addon elements (prefix/suffix)
- `InputGroup`: Groups inputs with addons
- `InputWrapper`: Wrapper with integrated styling

#### **Sizes**
- `sm`: Small (h-7, px-2.5, text-xs)
- `md`: Medium (h-8.5, px-3, text-[0.8125rem])
- `lg`: Large (h-10, px-4, text-sm)

#### **Features**
- Focus ring with ring-ring/30
- Error states with destructive colors
- File input support
- Readonly state styling
- Disabled state handling

#### **Usage Examples**
```tsx
// Basic input
<Input placeholder="Enter your name" />

// Input with addon
<InputGroup>
  <InputAddon variant="md">
    <DollarSign className="size-4" />
  </InputAddon>
  <Input placeholder="0.00" />
</InputGroup>

// Input wrapper
<InputWrapper variant="md">
  <Search className="size-4" />
  <Input placeholder="Search..." />
</InputWrapper>
```

---

### 3. **Card** (`card.tsx`)
**Purpose**: Container component with header, content, and footer sections

#### **Variants**
- `default`: Standard card with border
- `accent`: Accent styling with muted background

#### **Components**
- `Card`: Root container
- `CardHeader`: Header section with border
- `CardContent`: Main content area
- `CardFooter`: Footer section with border
- `CardTable`: Table-specific styling
- `CardTitle`: Card title
- `CardDescription`: Card description
- `CardHeading`: Heading container
- `CardToolbar`: Toolbar section

#### **Context System**
Uses React Context to share variant information between components.

#### **Usage Examples**
```tsx
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Accent variant
<Card variant="accent">
  <CardContent>
    <p>Accent card content</p>
  </CardContent>
</Card>
```

---

### 4. **Dialog** (`dialog.tsx`)
**Purpose**: Modal dialog component for overlays and popups

#### **Components**
- `Dialog`: Root component
- `DialogTrigger`: Trigger element
- `DialogContent`: Main content container
- `DialogHeader`: Header section
- `DialogTitle`: Dialog title
- `DialogDescription`: Dialog description
- `DialogBody`: Main body content
- `DialogFooter`: Footer section
- `DialogClose`: Close button
- `DialogOverlay`: Background overlay
- `DialogPortal`: Portal container

#### **Variants**
- `default`: Centered modal
- `fullscreen`: Fullscreen modal

#### **Props**
- `close`: Show/hide close button (default: true)
- `overlay`: Show/hide overlay (default: true)

#### **Usage Examples**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text
      </DialogDescription>
    </DialogHeader>
    <DialogBody>
      <p>Dialog content</p>
    </DialogBody>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
### setiap ada slicing yg memberikan code html dan screenshoot, berikan classname di masing2 section (dialogbody, dialogfooter, dialogtitle, dll). jangan menambah div baru untuk menstyling masing2 section
---

### 5. **Select** (`select.tsx`)
**Purpose**: Dropdown selection component

#### **Components**
- `Select`: Root component
- `SelectTrigger`: Trigger button
- `SelectValue`: Display value
- `SelectContent`: Dropdown content
- `SelectItem`: Individual option
- `SelectGroup`: Group options
- `SelectLabel`: Group label
- `SelectSeparator`: Visual separator
- `SelectScrollUpButton`: Scroll up button
- `SelectScrollDownButton`: Scroll down button
- `SelectIndicator`: Custom indicator

#### **Context Features**
- `indicatorPosition`: `left` | `right`
- `indicatorVisibility`: Show/hide indicator
- `indicator`: Custom indicator component

#### **Sizes**
- `sm`: Small (h-7, px-2.5, text-xs)
- `md`: Medium (h-8.5, px-3, text-[0.8125rem])
- `lg`: Large (h-10, px-4, text-sm)

#### **Usage Examples**
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

---

### 6. **Badge** (`badge.tsx`)
**Purpose**: Status indicator and label component

#### **Variants**
- `primary`: Primary badge
- `secondary`: Secondary badge
- `success`: Success state (green)
- `warning`: Warning state (yellow)
- `info`: Info state (blue)
- `outline`: Outlined badge
- `destructive`: Error state (red)

#### **Appearances**
- `default`: Standard appearance
- `light`: Light background
- `outline`: Outlined style
- `ghost`: Transparent background

#### **Sizes**
- `lg`: Large
- `md`: Medium
- `sm`: Small
- `xs`: Extra small

#### **Shapes**
- `default`: Standard shape
- `circle`: Circular shape

#### **Components**
- `Badge`: Main badge component
- `BadgeDot`: Dot indicator
- `BadgeButton`: Interactive badge

#### **Usage Examples**
```tsx
// Status badge
<Badge variant="success" appearance="light" size="sm">
  <BadgeDot />
  Active
</Badge>

// Simple badge
<Badge variant="primary">New</Badge>

// Interactive badge
<BadgeButton variant="outline" onClick={handleClick}>
  Clickable Badge
</BadgeButton>
```

---

### 7. **Table** (`table.tsx`)
**Purpose**: Data table component with semantic structure

#### **Components**
- `Table`: Root table wrapper
- `TableHeader`: Header section
- `TableBody`: Body section
- `TableFooter`: Footer section
- `TableRow`: Table row
- `TableHead`: Header cell
- `TableCell`: Data cell
- `TableCaption`: Table caption

#### **Features**
- Responsive wrapper with overflow
- Hover effects on rows
- Selected state styling
- Proper semantic structure

#### **Usage Examples**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>
        <Badge variant="success">Active</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### 8. **Dropdown Menu** (`dropdown-menu.tsx`)
**Purpose**: Context menu and dropdown actions

#### **Components**
- `DropdownMenu`: Root component
- `DropdownMenuTrigger`: Trigger element
- `DropdownMenuContent`: Menu content
- `DropdownMenuItem`: Menu item
- `DropdownMenuCheckboxItem`: Checkbox item
- `DropdownMenuRadioItem`: Radio item
- `DropdownMenuLabel`: Section label
- `DropdownMenuSeparator`: Visual separator
- `DropdownMenuShortcut`: Keyboard shortcut
- `DropdownMenuGroup`: Item group
- `DropdownMenuSub`: Submenu
- `DropdownMenuSubTrigger`: Submenu trigger
- `DropdownMenuSubContent`: Submenu content

#### **Features**
- Keyboard navigation
- Checkbox and radio items
- Submenu support
- Shortcut display
- Destructive variant for dangerous actions

#### **Usage Examples**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <Edit className="size-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <Trash className="size-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### 9. **Checkbox** (`checkbox.tsx`)
**Purpose**: Checkbox input component

#### **Sizes**
- `sm`: Small (size-4.5)
- `md`: Medium (size-5)
- `lg`: Large (size-5.5)

#### **States**
- Unchecked: Empty checkbox
- Checked: Check mark
- Indeterminate: Minus sign

#### **Features**
- Focus ring
- Error states
- Disabled state
- Proper accessibility

#### **Usage Examples**
```tsx
// Basic checkbox
<Checkbox />

// With label
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms</label>
</div>

// Indeterminate state
<Checkbox checked="indeterminate" />
```

---

### 10. **Empty State** (`empty-state.tsx`)
**Purpose**: Empty state component for when no data is available

#### **Props**
- `illustration`: Custom illustration component
- `icon`: Icon component
- `title`: Required title text
- `description`: Optional description
- `actionLabel`: Action button text
- `onAction`: Action button handler
- `actionVariant`: Button variant
- `size`: `sm` | `md` | `lg`

#### **Predefined States**
- `EmptyStates.NoData`: Generic no data
- `EmptyStates.NoMerchants`: No merchants
- `EmptyStates.NoUsers`: No users
- `EmptyStates.NoTransactions`: No transactions
- `EmptyStates.NoSearchResults`: No search results
- `EmptyStates.Error`: Error state

#### **Usage Examples**
```tsx
// Custom empty state
<EmptyState
  title="No Transactions Yet"
  description="Looks like you don't have any transactions."
  actionLabel="Create Transaction"
  onAction={handleCreate}
  illustration={<CustomIllustration />}
/>

// Predefined state
<EmptyStates.NoMerchants 
  actionLabel="Add Merchant"
  onAction={handleAddMerchant}
/>
```

---

### 11. **Statistics** (`statistics.tsx`)
**Purpose**: Statistics display component with multiple metrics

#### **Props**
- `items`: Array of `IStatisticsItem`
  - `number`: The statistic value
  - `label`: The statistic label

#### **Features**
- Responsive grid layout
- Separator lines between items
- Monospace font for numbers
- Centered alignment

#### **Usage Examples**
```tsx
<Statistics 
  items={[
    { number: "1,234", label: "Total Users" },
    { number: "567", label: "Active Users" },
    { number: "89%", label: "Success Rate" }
  ]} 
/>
```

---

### 12. **Data Grid** (`data-grid.tsx`)
**Purpose**: Advanced table component with TanStack Table integration

#### **Key Features**
- Server-side pagination
- Column sorting and filtering
- Row selection
- Custom cell rendering
- Loading states
- Empty states
- Export functionality

#### **Context System**
Provides `DataGridContext` with table instance and configuration.

#### **Props**
- `data`: Array of data
- `columns`: Column definitions
- `pagination`: Pagination configuration
- `sorting`: Sorting configuration
- `columnFilters`: Filter configuration
- `rowSelection`: Selection configuration
- `onRowClick`: Row click handler
- `onSelectionChange`: Selection change handler
- `loading`: Loading state
- `emptyStateConfig`: Empty state configuration

---

## 🎯 Specialized Components

### 13. **Avatar** (`avatar.tsx`)
**Purpose**: User avatar with status indicators

#### **Components**
- `Avatar`: Root container
- `AvatarImage`: Image element
- `AvatarFallback`: Fallback text/icon
- `AvatarIndicator`: Status indicator

#### **Status Variants**
- `online`: Green indicator
- `offline`: Gray indicator
- `busy`: Yellow indicator
- `away`: Blue indicator

### 14. **Tabs** (`tabs.tsx`)
**Purpose**: Tab navigation component

#### **Variants**
- `default`: Standard tabs with background
- `button`: Button-style tabs
- `line`: Line-style tabs

#### **Sizes**
- `xs`, `sm`, `md`, `lg`

#### **Shapes**
- `default`, `pill`

### 15. **Form** (`form.tsx`)
**Purpose**: Form components with validation

### 16. **Alert** (`alert.tsx`)
**Purpose**: Alert/notification component

### 17. **Progress** (`progress.tsx`)
**Purpose**: Progress bar component

### 18. **Skeleton** (`skeleton.tsx`)
**Purpose**: Loading skeleton component

### 19. **Tooltip** (`tooltip.tsx`)
**Purpose**: Tooltip component

### 20. **Popover** (`popover.tsx`)
**Purpose**: Popover component

---

## 🎨 Design Tokens

### Color System
- **Primary**: Blue theme colors
- **Secondary**: Gray theme colors
- **Success**: Green colors
- **Warning**: Yellow colors
- **Destructive**: Red colors
- **Muted**: Subtle gray colors

### Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 0.75rem (12px)
- **lg**: 1rem (16px)
- **xl**: 1.5rem (24px)

### Typography
- **Font Sizes**: text-xs, text-sm, text-base, text-lg, text-xl
- **Font Weights**: font-normal, font-medium, font-semibold, font-bold
- **Line Heights**: Leading-tight, leading-normal, leading-relaxed

### Shadows
- **xs**: shadow-xs shadow-black/5
- **sm**: shadow-sm
- **md**: shadow-md
- **lg**: shadow-lg

---

## 🔧 Usage Guidelines

### Component Selection
1. **Buttons**: Use for actions and navigation
2. **Inputs**: Use for form data entry
3. **Cards**: Use for content grouping
4. **Dialogs**: Use for modal interactions
5. **Tables**: Use for data display
6. **Badges**: Use for status indicators
7. **Empty States**: Use when no data is available

### Accessibility
- All components use Radix UI primitives for accessibility
- Proper ARIA attributes and keyboard navigation
- Focus management and screen reader support
- Color contrast compliance

### Responsive Design
- Mobile-first approach
- Responsive breakpoints: sm, md, lg, xl
- Flexible layouts with CSS Grid and Flexbox

### Performance
- Optimized with React.memo where appropriate
- Lazy loading for heavy components
- Efficient re-rendering with proper key usage

---

## 🚀 AI Decision Making Guide

### When to Use Each Component

#### **For Data Display**
- Use `Table` for simple data tables
- Use `DataGrid` for complex tables with features
- Use `Statistics` for metric displays
- Use `Card` for content grouping

#### **For User Input**
- Use `Input` for text input
- Use `Select` for dropdown selection
- Use `Checkbox` for boolean values
- Use `Button` for actions

#### **For Navigation**
- Use `Tabs` for section navigation
- Use `Button` with `mode="link"` for links
- Use `DropdownMenu` for context actions

#### **For Feedback**
- Use `Badge` for status indicators
- Use `EmptyState` for empty data
- Use `Dialog` for confirmations
- Use `Alert` for notifications

#### **For Layout**
- Use `Card` for content containers
- Use `Separator` for visual division
- Use `Avatar` for user representation

### Component Composition Patterns

#### **Form Layout**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Form Title</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <Input placeholder="Name" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
      <Button>Submit</Button>
    </div>
  </CardContent>
</Card>
```

#### **Data Table Layout**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Data Table</CardTitle>
    <CardToolbar>
      <Button variant="outline">Export</Button>
    </CardToolbar>
  </CardHeader>
  <CardTable>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Badge variant="success">Active</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardTable>
</Card>
```

#### **Empty State Layout**
```tsx
<Card>
  <CardContent>
    <EmptyState
      title="No Data Available"
      description="Start by adding some data"
      actionLabel="Add Data"
      onAction={handleAdd}
    />
  </CardContent>
</Card>
```

---

## 📝 Notes for AI

### Component Recognition
When analyzing HTML or screenshots, look for these patterns:

1. **Button Patterns**: Look for `data-slot="button"` and variant classes
2. **Card Patterns**: Look for `data-slot="card"` and related components
3. **Table Patterns**: Look for `data-slot="table"` and table structure
4. **Badge Patterns**: Look for `data-slot="badge"` and status colors
5. **Input Patterns**: Look for `data-slot="input"` and form elements

### Styling Patterns
- **Variant Classes**: Components use semantic variant names
- **Size Classes**: Consistent sizing scale across components
- **State Classes**: Hover, focus, and disabled states
- **Color Classes**: Semantic color naming (primary, success, destructive)

### Accessibility Patterns
- **ARIA Attributes**: Proper labeling and descriptions
- **Keyboard Navigation**: Tab order and keyboard shortcuts
- **Screen Reader Support**: Proper semantic structure
- **Focus Management**: Visible focus indicators

This documentation should serve as a comprehensive reference for AI to understand and work with the UI component system effectively.
