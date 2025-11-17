'use client';

import React from 'react';
import { ScrollspyMenu } from '@/app/components/partials/navbar/scrollspy-menu';
import { Scrollspy } from '@/components/ui/scrollspy';

export interface ScrollSpyItem {
  title: string;
  target: string;
}

export interface ScrollSpyMenuConfig {
  items: ScrollSpyItem[];
  offset?: number;
  smooth?: boolean;
  dataAttribute?: string;
}

/**
 * Factory function to create ScrollSpy menu components
 * Eliminates duplication across different sections
 */
export function createScrollSpyMenu(config: ScrollSpyMenuConfig) {
  const { items, offset = 100, smooth = true, dataAttribute = "scrollspy" } = config;

  return function ScrollSpyMenuComponent() {
    return (
      <Scrollspy
        targetRef={{ current: document }}
        offset={offset}
        smooth={smooth}
        dataAttribute={dataAttribute}
      >
        <ScrollspyMenu items={items} />
      </Scrollspy>
    );
  };
}

// Pre-configured ScrollSpy menus for each section
export const BUSINESS_INFO_SCROLLSPY_ITEMS: ScrollSpyItem[] = [
  { title: 'Business Profile', target: 'business-profile' },
  { title: 'Business Address', target: 'business-address' },
  { title: 'Business Characteristics', target: 'business-characteristics' },
  { title: 'Bank Information', target: 'bank-information' },
];

export const PIC_INFO_SCROLLSPY_ITEMS: ScrollSpyItem[] = [
  { title: 'PIC Owner', target: 'pic-owner' },
  { title: 'PIC Business', target: 'pic-business' },
  { title: 'PIC Finance', target: 'pic-finance' },
  { title: 'PIC Technical', target: 'pic-technical' },
];

export const SUPPORT_DOCS_SCROLLSPY_ITEMS: ScrollSpyItem[] = [
  { title: 'Business Documents', target: 'business-documents' },
  { title: 'Legal Documents', target: 'legal-documents' },
  { title: 'Financial Documents', target: 'financial-documents' },
  { title: 'Technical Documents', target: 'technical-documents' },
];

export const HIERARCHY_SCROLLSPY_ITEMS: ScrollSpyItem[] = [
  { title: 'Parent Merchant', target: 'parent-merchant' },
  { title: 'Sub Merchants', target: 'sub-merchants' },
  { title: 'Hierarchy Settings', target: 'hierarchy-settings' },
];

export const OTHERS_SCROLLSPY_ITEMS: ScrollSpyItem[] = [
  { title: 'Additional Settings', target: 'additional-settings' },
  { title: 'Custom Fields', target: 'custom-fields' },
  { title: 'Notifications', target: 'notifications' },
  { title: 'Advanced Options', target: 'advanced-options' },
];

export const CREDENTIALS_SCROLLSPY_ITEMS: ScrollSpyItem[] = [
  { title: 'Credentials', target: 'credentials' },
  { title: 'Callback URLs', target: 'callback-urls' },
  { title: 'IP Whitelist', target: 'ip-whitelist' },
];

export const PG_CONFIG_SCROLLSPY_ITEMS: ScrollSpyItem[] = [
  { title: 'E-Wallet', target: 'e-wallet' },
  { title: 'QR Code', target: 'qr-code' },
  { title: 'Virtual Account', target: 'virtual-account' },
  { title: 'Debit/Credit Card', target: 'debit-credit-card' },
  { title: 'Direct Debit', target: 'direct-debit' },
];

export const SERVICE_TYPE_SCROLLSPY_ITEMS: ScrollSpyItem[] = [
  { title: 'Supporting Documents', target: 'supporting-documents' },
];

// Pre-configured ScrollSpy menu components
export const BusinessInfoScrollSpyMenu = createScrollSpyMenu({
  items: BUSINESS_INFO_SCROLLSPY_ITEMS,
});

export const PicInfoScrollSpyMenu = createScrollSpyMenu({
  items: PIC_INFO_SCROLLSPY_ITEMS,
});

export const SupportDocsScrollSpyMenu = createScrollSpyMenu({
  items: SUPPORT_DOCS_SCROLLSPY_ITEMS,
});

export const HierarchyScrollSpyMenu = createScrollSpyMenu({
  items: HIERARCHY_SCROLLSPY_ITEMS,
});

export const OthersScrollSpyMenu = createScrollSpyMenu({
  items: OTHERS_SCROLLSPY_ITEMS,
});

export const CredentialsScrollSpyMenu = createScrollSpyMenu({
  items: CREDENTIALS_SCROLLSPY_ITEMS,
});

export const PGConfigScrollSpyMenu = createScrollSpyMenu({
  items: PG_CONFIG_SCROLLSPY_ITEMS,
});

export const ServiceTypeScrollSpyMenu = createScrollSpyMenu({
  items: SERVICE_TYPE_SCROLLSPY_ITEMS,
});

