/**
 * Centralized Schema Exports
 * Single source of truth for all merchant form validation schemas
 */

export { 
  getBusinessInfoSchema, 
  type BusinessInfoSchemaType 
} from './business-info-schema';

export { 
  getPicInfoSchema, 
  type PicInfoSchemaType 
} from './pic-info-schema';

export { 
  getDocumentsSchema, 
  type DocumentsSchemaType 
} from './documents-schema';

export { 
  getServicesSchema, 
  type ServicesSchemaType 
} from './services-schema';

export { 
  getHierarchySchema, 
  type HierarchySchemaType 
} from './hierarchy-schema';

export { 
  getOthersSchema, 
  type OthersSchemaType 
} from './others-schema';

/**
 * Shared schema parts for reuse
 */
export * from './base';

