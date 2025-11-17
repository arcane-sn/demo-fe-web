import { toast } from 'sonner';

export interface ErrorContext {
  operation: string;
  entity?: string;
  id?: string;
  additionalInfo?: Record<string, any>;
}

export class FormErrorHandler {
  /**
   * Handle form submission errors with consistent messaging
   */
  static handleFormError(error: Error, context: ErrorContext) {
    const message = this.getErrorMessage(error, context);
    
    toast.error(message);
  }

  /**
   * Handle API errors with consistent messaging
   */
  static handleApiError(error: Error, context: ErrorContext) {
    const message = this.getErrorMessage(error, context);
    
    toast.error(message);
  }

  /**
   * Handle validation errors
   */
  static handleValidationError(errors: Record<string, string[]>) {
    const errorMessages = Object.values(errors).flat();
    const message = errorMessages.length > 0 ? errorMessages[0] : 'Validation failed';
    
    toast.error(message);
  }

  /**
   * Handle network errors
   */
  static handleNetworkError(error: Error, context: ErrorContext) {
    const message = 'Network error. Please check your connection and try again.';
    
    toast.error(message);
  }

  /**
   * Get user-friendly error message
   */
  private static getErrorMessage(error: Error, context: ErrorContext): string {
    const { operation, entity, id } = context;
    
    // Handle specific error types
    if (error.message.includes('Network Error') || error.message.includes('fetch')) {
      return 'Network error. Please check your connection and try again.';
    }
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      return 'You are not authorized to perform this action.';
    }
    
    if (error.message.includes('403') || error.message.includes('Forbidden')) {
      return 'You do not have permission to perform this action.';
    }
    
    if (error.message.includes('404') || error.message.includes('Not Found')) {
      return `${entity || 'Resource'} not found.`;
    }
    
    if (error.message.includes('409') || error.message.includes('Conflict')) {
      return 'This action conflicts with existing data.';
    }
    
    if (error.message.includes('422') || error.message.includes('Unprocessable Entity')) {
      return 'Invalid data provided. Please check your input.';
    }
    
    if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
      return 'Server error. Please try again later.';
    }
    
    // Default messages based on operation
    switch (operation) {
      case 'create':
        return `Failed to create ${entity || 'item'}. Please try again.`;
      case 'update':
        return `Failed to update ${entity || 'item'}. Please try again.`;
      case 'delete':
        return `Failed to delete ${entity || 'item'}. Please try again.`;
      case 'fetch':
        return `Failed to load ${entity || 'data'}. Please try again.`;
      case 'save':
        return `Failed to save ${entity || 'data'}. Please try again.`;
      default:
        return `Failed to ${operation} ${entity || 'item'}. Please try again.`;
    }
  }
}

export class ValidationErrorHandler {
  /**
   * Handle Zod validation errors
   */
  static handleZodError(error: any) {
    if (error.errors && Array.isArray(error.errors)) {
      const messages = error.errors.map((err: any) => {
        const field = err.path?.join('.') || 'field';
        return `${field}: ${err.message}`;
      });
      
      toast.error(messages[0] || 'Validation failed');
      console.error('Zod validation errors:', error.errors);
    } else {
      toast.error('Validation failed');
      console.error('Validation error:', error);
    }
  }

  /**
   * Handle React Hook Form errors
   */
  static handleFormErrors(errors: Record<string, any>) {
    const errorMessages = Object.entries(errors).map(([field, error]) => {
      return `${field}: ${error.message || 'Invalid value'}`;
    });
    
    if (errorMessages.length > 0) {
      toast.error(errorMessages[0]);
    }
  }
}

export class LoadingErrorHandler {
  /**
   * Handle loading state errors
   */
  static handleLoadingError(error: Error, context: ErrorContext) {
    const message = `Failed to load ${context.entity || 'data'}. Please refresh the page.`;
    
    toast.error(message);
  }
}

/**
 * Utility function to create error context
 */
export function createErrorContext(
  operation: string,
  entity?: string,
  id?: string,
  additionalInfo?: Record<string, any>
): ErrorContext {
  return {
    operation,
    entity,
    id,
    additionalInfo,
  };
}

/**
 * Utility function to handle async operations with error handling
 */
export async function handleAsyncOperation<T>(
  operation: () => Promise<T>,
  context: ErrorContext,
  onSuccess?: (result: T) => void,
  onError?: (error: Error) => void
): Promise<T | null> {
  try {
    const result = await operation();
    if (onSuccess) onSuccess(result);
    return result;
  } catch (error) {
    const errorInstance = error instanceof Error ? error : new Error(String(error));
    
    if (context.operation.includes('form') || context.operation.includes('submit')) {
      FormErrorHandler.handleFormError(errorInstance, context);
    } else if (context.operation.includes('fetch') || context.operation.includes('load')) {
      LoadingErrorHandler.handleLoadingError(errorInstance, context);
    } else {
      FormErrorHandler.handleApiError(errorInstance, context);
    }
    
    if (onError) onError(errorInstance);
    return null;
  }
}

