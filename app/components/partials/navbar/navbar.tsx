'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

function Navbar({ children, className }: NavbarProps) {
  return (
    <div
      className={cn(
        'flex items-center flex-wrap md:flex-nowrap lg:items-end justify-between border-b border-border gap-3 lg:gap-6 mb-5 lg:mb-10',
        className
      )}
    >
      {children}
    </div>
  );
}

interface NavbarActionsProps {
  children: ReactNode;
  className?: string;
}

function NavbarActions({ children, className }: NavbarActionsProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end grow lg:grow-0 lg:pb-4 gap-2.5 mb-1.5 lg:mb-0',
        className
      )}
    >
      {children}
    </div>
  );
}

export { Navbar, NavbarActions };
