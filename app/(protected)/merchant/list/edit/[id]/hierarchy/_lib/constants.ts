import type { MerchantLevel } from './types';

export const MERCHANT_LEVELS: MerchantLevel[] = [
  {
    id: 'level-0',
    name: 'Level 0 (Grand-Parent Merchant)',
    description: "Top-level merchant. Doesn't have a parent merchant above",
    hasParent: false,
    canHaveChildren: true
  },
  {
    id: 'level-1',
    name: 'Level 1 (Parent Merchant)',
    description: 'Has a parent (Level 0). Can have child merchants.',
    hasParent: true,
    canHaveChildren: true
  },
  {
    id: 'level-2',
    name: 'Level 2 (Child Merchant)',
    description: 'Has a parent (Level 1). Can have child merchants',
    hasParent: true,
    canHaveChildren: true
  },
  {
    id: 'level-3',
    name: 'Level 3 (Grand-Child Merchant)',
    description: 'Has a parent (Level 2). Cannot have child merchants below.',
    hasParent: true,
    canHaveChildren: false
  }
];

export const MOCK_HIERARCHY_DATA: any = {
  merchantLevelInfo: {
    merchantLevel: "Level 1 (Parent Merchant)",
    parentMerchantId: "UPP12380484",
    parentMerchant: "PT KITA BERJAYA SINERGI",
    parentMerchantLevel: "Level 0 (Grand-Parent Merchant)"
  },
  hierarchy: [
    {
      id: "1",
      name: "PT ABADI JAYA TEKNOLOGI",
      clientId: "UP12920398747",
      level: 1,
      icon: {
        type: "circle",
        color: "blue"
      },
      children: [
        {
          id: "1.1",
          name: "PT JAYA JAYA JAYA",
          clientId: "UP12920398747",
          level: 2,
          icon: {
            type: "circle",
            color: "orange"
          },
          children: [
            {
              id: "1.1.1",
              name: "Smart Market",
              clientId: "UP12920398747",
              level: 3,
              icon: {
                type: "square",
                color: "red",
                letter: "S"
              }
            },
            {
              id: "1.1.2",
              name: "Nova Market",
              clientId: "UP12920398747",
              level: 3,
              icon: {
                type: "triangle",
                color: "purple"
              }
            },
            {
              id: "1.1.3",
              name: "Bright Solutions",
              clientId: "UP12920398747",
              level: 3,
              icon: {
                type: "square",
                color: "green",
                letter: "X"
              }
            },
            {
              id: "1.1.4",
              name: "DigiMart",
              clientId: "UP12920398747",
              level: 3,
              icon: {
                type: "circle",
                color: "blue",
                letter: "D"
              }
            },
            {
              id: "1.1.5",
              name: "MetroMart",
              clientId: "UP12920398747",
              level: 3,
              icon: {
                type: "circle",
                color: "green",
                letter: "M"
              }
            }
          ]
        },
        {
          id: "1.2",
          name: "ABADI JAYA TGR",
          clientId: "UP12920398747",
          level: 2,
          icon: {
            type: "circle",
            color: "orange"
          },
          children: [
            {
              id: "1.2.1",
              name: "PAYHUB",
              clientId: "UP12920398747",
              level: 3,
              icon: {
                type: "circle",
                color: "blue",
                letter: "P"
              }
            }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "PT MAJU TAK GENTAR",
      clientId: "UP12920398747",
      level: 1,
      icon: {
        type: "circle",
        color: "red"
      },
      children: [
        {
          id: "2.1",
          name: "JUMBUT JOGJA",
          clientId: "UP12920398747",
          level: 2,
          icon: {
            type: "circle",
            color: "red"
          }
        },
        {
          id: "2.2",
          name: "JUMBUT JAKARTA",
          clientId: "UP12920398747",
          level: 2,
          icon: {
            type: "circle",
            color: "red"
          },
          children: [
            {
              id: "2.2.1",
              name: "JUMBUT JAKARTA SELATAN",
              clientId: "UP12920398747",
              level: 3,
              icon: {
                type: "circle",
                color: "red"
              }
            }
          ]
        }
      ]
    }
  ]
};

export const DEFAULT_FORM_VALUES = {
  selectedLevel: 'level-1',
  selectedParent: '',
  hasParentMerchant: false,
  hasSubMerchants: false,
  selectedSubMerchants: []
};

export const ICON_COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500",
  orange: "bg-orange-500", 
  red: "bg-red-500",
  purple: "bg-purple-500",
  green: "bg-green-500"
};
