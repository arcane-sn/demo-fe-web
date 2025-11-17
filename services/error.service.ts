import { ServiceError } from "./types";

export interface ErrorHandler {
  handle(error: ServiceError): void;
}

export interface ErrorNotification {
  title: string;
  message: string;
  type: "error" | "warning" | "info";
  duration?: number;
}

class ErrorService {
  private handlers: ErrorHandler[] = [];
  private notificationCallback?: (notification: ErrorNotification) => void;

  // Register error handler
  registerHandler(handler: ErrorHandler): void {
    this.handlers.push(handler);
  }

  // Unregister error handler
  unregisterHandler(handler: ErrorHandler): void {
    const index = this.handlers.indexOf(handler);
    if (index > -1) {
      this.handlers.splice(index, 1);
    }
  }

  // Set notification callback (for toast notifications, etc.)
  setNotificationCallback(
    callback: (notification: ErrorNotification) => void
  ): void {
    this.notificationCallback = callback;
  }

  // Handle error
  handleError(error: ServiceError): void {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Service Error:", {
        message: error.responseMessage,
        status: error.responseCode,
        code: error.responseCode,
        details: error.responseMessage,
        stack: error.stack,
      });
    }

    // Notify all registered handlers
    this.handlers.forEach((handler) => {
      try {
        handler.handle(error);
      } catch (handlerError) {
        console.error("Error handler failed:", handlerError);
      }
    });

    // Show notification if callback is set
    if (this.notificationCallback) {
      const notification = this.getErrorNotification(error);
      this.notificationCallback(notification);
    }
  }

  // Get user-friendly error message
  getErrorMessage(error: ServiceError): string {
    switch (error.status) {
      case 400:
        return error.message || "Invalid request. Please check your input.";
      case 401:
        return "You are not authorized to perform this action.";
      case 403:
        return "Access denied. You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "A conflict occurred. The resource may already exist.";
      case 422:
        return error.message || "Validation failed. Please check your input.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Internal server error. Please try again later.";
      case 502:
        return "Bad gateway. The server is temporarily unavailable.";
      case 503:
        return "Service unavailable. Please try again later.";
      case 504:
        return "Gateway timeout. The request took too long to process.";
      default:
        if (error.status === 0) {
          return "Network error. Please check your internet connection.";
        }
        return error.message || "An unexpected error occurred.";
    }
  }

  // Get error notification
  private getErrorNotification(error: ServiceError): ErrorNotification {
    const message = this.getErrorMessage(error);

    let type: "error" | "warning" | "info" = "error";
    if (error.status >= 400 && error.status < 500) {
      type = "warning";
    } else if (error.status >= 500) {
      type = "error";
    }

    return {
      title: this.getErrorTitle(error),
      message,
      type,
      duration: this.getErrorDuration(error),
    };
  }

  // Get error title
  private getErrorTitle(error: ServiceError): string {
    switch (error.status) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 409:
        return "Conflict";
      case 422:
        return "Validation Error";
      case 429:
        return "Too Many Requests";
      case 500:
        return "Server Error";
      case 502:
        return "Bad Gateway";
      case 503:
        return "Service Unavailable";
      case 504:
        return "Gateway Timeout";
      default:
        if (error.status === 0) {
          return "Network Error";
        }
        return "Error";
    }
  }

  // Get error notification duration
  private getErrorDuration(error: ServiceError): number {
    switch (error.status) {
      case 401:
      case 403:
        return 8000; // Longer duration for auth errors
      case 429:
        return 10000; // Longer duration for rate limit errors
      case 500:
      case 502:
      case 503:
      case 504:
        return 6000; // Longer duration for server errors
      default:
        return 5000; // Default duration
    }
  }

  // Check if error is retryable
  isRetryable(error: ServiceError): boolean {
    return (
      error.status === 0 || // Network error
      error.status === 408 || // Request timeout
      error.status === 429 || // Too many requests
      error.status >= 500 // Server errors
    );
  }

  // Get retry delay in milliseconds
  getRetryDelay(error: ServiceError, attempt: number): number {
    if (error.status === 429) {
      // Rate limiting - exponential backoff with jitter
      const baseDelay = 1000;
      const maxDelay = 30000;
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      return delay + Math.random() * 1000; // Add jitter
    }

    if (error.status >= 500) {
      // Server errors - exponential backoff
      const baseDelay = 1000;
      const maxDelay = 10000;
      return Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
    }

    // Network errors - linear backoff
    return 1000 * attempt;
  }

  // Create error from unknown error
  createError(error: unknown): ServiceError {
    if (error instanceof ServiceError) {
      return error;
    }

    if (error instanceof Error) {
      return new ServiceError(
        error.message,
        500,
        "UNKNOWN_ERROR",
        "UNKNOWN_ERROR"
      );
    }

    if (typeof error === "string") {
      return new ServiceError(error, 500, "UNKNOWN_ERROR", "UNKNOWN_ERROR");
    }

    return new ServiceError(
      "An unknown error occurred",
      500,
      "UNKNOWN_ERROR",
      "UNKNOWN_ERROR"
    );
  }

  // Wrap async function with error handling
  async withErrorHandling<T>(
    fn: () => Promise<T>,
    context?: string
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      const serviceError = this.createError(error);

      if (context) {
        serviceError.message = `${context}: ${serviceError.message}`;
      }

      this.handleError(serviceError);
      throw serviceError;
    }
  }

  // Retry function with exponential backoff
  async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    context?: string
  ): Promise<T> {
    let lastError: ServiceError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = this.createError(error);

        if (!this.isRetryable(lastError) || attempt === maxAttempts) {
          if (context) {
            lastError.message = `${context}: ${lastError.message}`;
          }
          this.handleError(lastError);
          throw lastError;
        }

        const delay = this.getRetryDelay(lastError, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }
}

// Create singleton instance
export const errorService = new ErrorService();

// Export class for custom instances
export { ErrorService };
