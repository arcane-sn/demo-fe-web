'use client';

import { Fragment, ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';

export interface ToolbarHeadingProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
}

function Toolbar({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
      {children}
    </div>
  );
}

function ToolbarActions({ children }: { children?: ReactNode }) {
  return <div className="flex items-center gap-2.5">{children}</div>;
}

function ToolbarBreadcrumbs() {
  const { breadcrumbItems } = useBreadcrumb();

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <div className="flex [.header_&]:below-lg:hidden items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0">
      <div className="breadcrumb flex items-center gap-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <Fragment key={index}>
              <Link
                href={item.path}
                className={cn(
                  'flex items-center gap-1',
                  item.isActive
                    ? 'text-mono'
                    : 'text-muted-foreground hover:text-primary',
                )}
              >
                {item.title}
              </Link>
              {!isLast && (
                <ChevronRight className="size-3.5 muted-foreground" />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ToolbarHeading({ title = '', description }: ToolbarHeadingProps) {
  const { getCurrentPageTitle } = useBreadcrumb();

  return (
    <div className="flex flex-col justify-center gap-2">
      <h1 className="text-xl font-medium leading-none text-mono">
        {title || getCurrentPageTitle()}
      </h1>
      {description && (
        <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
          {description}
        </div>
      )}
    </div>
  );
}

export { Toolbar, ToolbarActions, ToolbarBreadcrumbs, ToolbarHeading };
