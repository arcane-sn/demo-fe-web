import type { MerchantData } from '../../../../../types/merchant';

export interface MerchantLevel {
  id: string;
  name: string;
  description: string;
  hasParent: boolean;
  canHaveChildren: boolean;
}

export interface ParentMerchant extends MerchantData {
  // Explicitly include required properties from MerchantData
  id: string;
  clientId: string;
  companyName: string;
  brandName: string;
  parentClientId?: string;
  type?: string;
  location?: string;
}

export interface HierarchyNodeIcon {
  type: 'circle' | 'square' | 'triangle';
  color: string;
  letter?: string;
}

export interface MerchantHierarchyNode {
  id: string;
  name: string;
  clientId: string;
  level: number;
  icon: HierarchyNodeIcon;
  children?: MerchantHierarchyNode[];
}

export interface HierarchyNodeProps {
  node: MerchantHierarchyNode;
  isLast?: boolean;
  hasSiblings?: boolean;
  parentPath?: string;
  depth?: number;
}

export interface HierarchyFormState {
  showAvailableParents: boolean;
  showAvailableSubMerchants: boolean;
  showHierarchyModal: boolean;
}

export interface HierarchyFormData {
  selectedLevel: string;
  selectedParent: string;
  hasParentMerchant: boolean;
  hasSubMerchants: boolean;
  selectedSubMerchants: string[];
}

export interface HierarchyFormHandlers {
  handleSelectParent: (parentId: string) => void;
  handleSelectSubMerchant: (subMerchantId: string) => void;
  handleRemoveSubMerchant: (subMerchantId: string) => void;
  setShowAvailableParents: (show: boolean) => void;
  setShowAvailableSubMerchants: (show: boolean) => void;
  setShowHierarchyModal: (show: boolean) => void;
}

export interface TableColumnConfig {
  accessorKey: string;
  header: string;
  cell: (props: any) => React.ReactElement;
}

export interface HierarchyConstants {
  merchantLevels: MerchantLevel[];
  mockHierarchyData: any;
}
