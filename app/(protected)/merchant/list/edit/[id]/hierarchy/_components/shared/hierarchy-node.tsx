'use client';

import { useState } from 'react';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { InitialsAvatar } from '@/components/reusable/InitialsAvatar';
import type { HierarchyNodeProps } from '../../_lib/types';

export function HierarchyNode({ node, isLast = false, hasSiblings = false, parentPath = '', depth = 0 }: HierarchyNodeProps) {
  const [copied, setCopied] = useState<string>('');
  const currentPath = parentPath ? `${parentPath}.${node.id}` : node.id;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const hasChildren = node.children && node.children.length > 0;
  const indentLevel = depth * 48; // 48px per level
  const verticalLineLeft = indentLevel + 16; // Center of circle (w-8 = 32px / 2 = 16px)

  return (
    <div className="relative">
      {/* Node Content */}
      <div className="flex items-center gap-3 py-2.5" style={{ paddingLeft: `${indentLevel}px` }}>
        {/* Level Indicator Circle */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-500 text-lg font-semibold relative z-10">
          {node.level}
        </div>
        
        {/* Icon - Using InitialsAvatar */}
        <div className="flex-shrink-0">
          <InitialsAvatar name={node.name} size="md" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-900 leading-tight">
            {node.name}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-600 font-mono">Client ID {node.clientId}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(node.clientId, `client-${node.id}`)}
              className="h-5 px-1.5 opacity-60 hover:opacity-100"
            >
              {copied === `client-${node.id}` ? (
                <KeenIcon icon="check" style="outline" className="size-3.5 text-green-600" />
              ) : (
                <KeenIcon icon="copy" style="outline" className="size-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Vertical line going down from level circle - show if has children or has siblings below */}
      {(hasChildren || (hasSiblings && !isLast)) && (
        <div 
          className="absolute bg-gray-300"
          style={{
            left: `${verticalLineLeft}px`,
            top: '40px', // Start after node content
            width: '1px',
            bottom: hasChildren ? '0px' : 'auto',
            height: hasChildren ? 'auto' : '50px', // Fixed height if no children but has siblings
            zIndex: 0,
          }}
        />
      )}

      {/* Children */}
      {hasChildren && (
        <div className="relative">
          {node.children!.map((child, index) => {
              const isLastChild = index === node.children!.length - 1;
            const hasSiblingChildren = node.children!.length > 1;
            const childPath = `${currentPath}.${index}.${child.id}`;
              
              return (
              <div key={childPath} className="relative">
                    <HierarchyNode 
                      node={child} 
                      isLast={isLastChild}
                  hasSiblings={hasSiblingChildren}
                      parentPath={currentPath}
                  depth={depth + 1}
                    />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
