export interface MerchantHierarchyNode {
  id: string;
  name: string;
  clientId: string;
  level: number;
  icon?: {
    type: 'circle' | 'square' | 'triangle';
    color: string;
    letter?: string;
  };
  children?: MerchantHierarchyNode[];
}

export interface MerchantLevelInfo {
  merchantLevel: string;
  parentMerchantId: string;
  parentMerchant: string;
  parentMerchantLevel: string;
}

export interface HierarchyData {
  merchantLevelInfo: MerchantLevelInfo;
  hierarchy: MerchantHierarchyNode[];
}
