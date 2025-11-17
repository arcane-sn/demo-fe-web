'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HierarchyNodeIcon } from './hierarchy-node-icon';
import type { HierarchyNodeProps } from '../../_lib/types';

export function HierarchyNode({ node, isLast = false, hasSiblings = false, parentPath = '' }: HierarchyNodeProps) {
  const [copied, setCopied] = useState<string>('');
  const currentPath = parentPath ? `${parentPath}.${node.id}` : node.id;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      {/* Node Content */}
      <div className="flex items-start gap-3 py-2">
        {/* Level Indicator Circle */}
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-medium">
          {node.level}
        </div>
        
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <HierarchyNodeIcon icon={node.icon} />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-900">
            {node.name}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">Client ID {node.clientId}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(node.clientId, `client-${node.id}`)}
              className="h-6 px-1 opacity-60 hover:opacity-100"
            >
              {copied === `client-${node.id}` ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && (
        <div className="ml-6 relative">
          {/* Vertical line from parent */}
          <div className="absolute left-0 top-0 w-px h-6 bg-gray-300"></div>
          
          {/* Children container */}
          <div className="space-y-0">
            {node.children!.map((child, index: number) => {
              const isLastChild = index === node.children!.length - 1;
              const hasSiblings = node.children!.length > 1;
              
              return (
                <div key={child.id} className="relative">
                  {/* Horizontal line to child */}
                  <div className="absolute left-0 top-3 w-6 h-px bg-gray-300"></div>
                  
                  {/* Vertical line continuation (if not last child) */}
                  {!isLastChild && (
                    <div className="absolute left-0 top-3 w-px h-full bg-gray-300"></div>
                  )}
                  
                  <div className="pl-6">
                    <HierarchyNode 
                      node={child} 
                      isLast={isLastChild}
                      hasSiblings={hasSiblings}
                      parentPath={currentPath}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
