

export interface ErrorInfo {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export class ErrorService {
  static handleApiError(error: any): ErrorInfo {
    const timestamp = new Date();
    
    if (error.response) {
      // Server responded with error status
      return {
        code: `API_${error.response.status}`,
        message: error.response.data?.message || 'API request failed',
        details: error.response.data,
        timestamp
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error - please check your connection',
        details: error.request,
        timestamp
      };
    } else {
      // Something else happened
      return {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'An unknown error occurred',
        details: error,
        timestamp
      };
    }
  }

  static handleValidationError(errors: string[]): ErrorInfo {
    return {
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: errors,
      timestamp: new Date()
    };
  }

  /**
   * Handle network errors
   */
  static handleNetworkError(): ErrorInfo {
    return {
      code: 'NETWORK_ERROR',
      message: 'Network connection failed. Please check your internet connection.',
      timestamp: new Date()
    };
  }

  /**
   * Handle timeout errors
   */
  static handleTimeoutError(): ErrorInfo {
    return {
      code: 'TIMEOUT_ERROR',
      message: 'Request timeout. Please try again.',
      timestamp: new Date()
    };
  }

  /**
   * Handle permission errors
   */
  static handlePermissionError(): ErrorInfo {
    return {
      code: 'PERMISSION_ERROR',
      message: 'You do not have permission to perform this action.',
      timestamp: new Date()
    };
  }

  /**
   * Handle not found errors
   */
  static handleNotFoundError(resource: string): ErrorInfo {
    return {
      code: 'NOT_FOUND_ERROR',
      message: `${resource} not found.`,
      timestamp: new Date()
    };
  }

  static getUserFriendlyMessage(error: ErrorInfo): string {
    switch (error.code) {
      case 'API_404':
        return 'The requested resource was not found.';
      case 'API_403':
        return 'You do not have permission to access this resource.';
      case 'API_500':
        return 'Server error. Please try again later.';
      case 'NETWORK_ERROR':
        return 'Network connection failed. Please check your internet connection.';
      case 'VALIDATION_ERROR':
        return 'Please check your input and try again.';
      case 'TIMEOUT_ERROR':
        return 'Request timeout. Please try again.';
      case 'PERMISSION_ERROR':
        return 'You do not have permission to perform this action.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  /**
   * Log error for debugging
   */
  static logError(error: ErrorInfo, context?: string): void {
    console.error(`[${error.code}] ${error.message}`, {
      context,
      details: error.details,
      timestamp: error.timestamp
    });
  }

  /**
   * Check if error is retryable
   */
  static isRetryableError(error: ErrorInfo): boolean {
    const retryableCodes = [
      'NETWORK_ERROR',
      'TIMEOUT_ERROR',
      'API_500',
      'API_502',
      'API_503',
      'API_504'
    ];
    
    return retryableCodes.includes(error.code);
  }

  /**
   * Get retry delay in milliseconds
   */
  static getRetryDelay(attempt: number): number {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s
    return Math.min(1000 * Math.pow(2, attempt), 16000);
  }
}
