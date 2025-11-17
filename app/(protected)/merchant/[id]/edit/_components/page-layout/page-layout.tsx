'use client';

import React from 'react';
import { Container } from '@/components/common/container';

interface EditPageLayoutProps {
  children: React.ReactNode;
  scrollSpyMenu?: React.ReactNode;
  className?: string;
}

export function EditPageLayout({ 
  children, 
  scrollSpyMenu,
  className = "grid grid-cols-1 xl:grid-cols-5 gap-5 lg:gap-7.5"
}: EditPageLayoutProps) {
  return (
    <Container>
      <div className={className}>
        {/* ScrollSpy Menu Sidebar */}
        {scrollSpyMenu && (
          <div className="col-span-1">
            <div className="sticky top-30 max-w-48">
              {scrollSpyMenu}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className={scrollSpyMenu ? "col-span-4" : "col-span-full"}>
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </Container>
  );
}

