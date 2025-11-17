'use client';

import React from 'react';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { EDIT_MERCHANT_MENU } from '../../core/config/edit-menu.config';

interface EditMenuProps {
  merchantId: string;
}

export function EditMenu({ merchantId }: EditMenuProps) {
  const menuItems = EDIT_MERCHANT_MENU.map(item => ({
    ...item,
    path: `/merchant/${merchantId}/edit/${item.path}`
  }));

  return <NavbarMenu items={menuItems} />;
}

