'use client';

import React from 'react';
import { ScrollspyMenu } from '@/app/components/partials/navbar/scrollspy-menu';
import { Scrollspy } from '@/components/ui/scrollspy';

interface ScrollSpyMenuItem {
  title: string;
  target: string;
}

interface EditScrollSpyMenuProps {
  items: ScrollSpyMenuItem[];
  offset?: number;
  smooth?: boolean;
  dataAttribute?: string;
}

export function EditScrollSpyMenu({ 
  items, 
  offset = 100, 
  smooth = true, 
  dataAttribute = "scrollspy" 
}: EditScrollSpyMenuProps) {
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
}

