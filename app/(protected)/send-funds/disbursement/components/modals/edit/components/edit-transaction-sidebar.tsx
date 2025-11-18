"use client";

interface SidebarItem {
  id: string;
  label: string;
  target: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'transfer-details',
    label: 'Transfer Details',
    target: 'transfer_details',
  },
  {
    id: 'beneficiary-bank-details',
    label: 'Beneficiary Bank Details',
    target: 'beneficiary_bank_details',
  },
  {
    id: 'other-details',
    label: 'Other Details',
    target: 'other_details',
  },
];

export function EditTransactionSidebar() {
  return (
    <div className="flex flex-col grow relative before:absolute before:start-[11px] before:top-0 before:bottom-0 before:border-s before:border-border text-sm">
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          data-scrollspy-anchor={item.target}
          className="cursor-pointer flex items-center rounded-lg ps-2.5 pe-2.5 py-1.5 border border-transparent text-accent-foreground hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary data-[active=true]:font-medium gap-1.5"
        >
          <span className="flex w-1.5 relative before:absolute start-px rtl:-start-[5px] before:top-0 before:size-1.5 before:rounded-full before:-translate-x-2/4 before:-translate-y-2/4 [[data-active=true]>&]:before:bg-primary"></span>
          {item.label}
        </div>
      ))}
    </div>
  );
}

