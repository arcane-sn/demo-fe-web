import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  ApiResponse,
  PaginatedResponse,
  RequestConfig,
  QueryParams,
  ServiceError,
} from "./types";

class HttpService {
  private client: AxiosInstance;
  private baseURL: string;
  private tokenCache: string | null = null;

  constructor(baseURL?: string) {
    this.baseURL =
      baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Get token from HttpOnly cookie via API call
        await this.addAuthHeader(config);

        // Add timing data without overwriting existing data
        if (config.data && typeof config.data === "object") {
          config.data.startTime = Date.now();
        } else {
          config.data = { startTime: Date.now() };
        }

        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Log response time for debugging
        const duration = Date.now() - response.config.data?.startTime;
        console.log(`API Request to ${response.config.url} took ${duration}ms`);

        return response;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private async addAuthHeader(config: any): Promise<void> {
    // Use cached token if available
    if (this.tokenCache) {
      config.headers.Authorization = `Bearer ${this.tokenCache}`;
      return;
    }

    // If no cached token, get it from HttpOnly cookie via API
    const token = await this.getTokenFromCookie();
    if (token) {
      this.tokenCache = token;
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  private async getTokenFromCookie(): Promise<string | null> {
    try {
      // Call Next.js API to get token from HttpOnly cookie
      const response = await fetch("/api/auth/token", {
        method: "GET",
        credentials: "include", // Include HttpOnly cookies
      });

      if (response.ok) {
        const data = await response.json();
        return data.data?.token || null;
      }
    } catch (error) {
      console.warn("Failed to get token from cookie:", error);
    }
    return null;
  }

  // Method to set token (called from your auth system)
  setToken(token: string | null): void {
    this.tokenCache = token;
  }

  // Method to clear token (called on logout)
  clearToken(): void {
    this.tokenCache = null;
  }

  private handleError(error: any): ServiceError {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      return new ServiceError(
        data?.responseMessage || "An error occurred",
        status,
        data?.responseCode || "UNKNOWN_ERROR",
        data?.responseMessage || "An error occurred"
      );
    } else if (error.request) {
      // Request was made but no response received
      return new ServiceError(
        "Network error - please check your connection",
        0,
        "NETWORK_ERROR",
        "Network error - please check your connection"
      );
    } else {
      // Something else happened
      return new ServiceError(
        error.message || "An unexpected error occurred",
        500,
        "UNKNOWN_ERROR",
        error.message || "An unexpected error occurred"
      );
    }
  }

  private buildQueryString(params: QueryParams): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, String(item)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    return searchParams.toString();
  }

  // Generic HTTP methods
  async get<T = any>(
    endpoint: string,
    params?: QueryParams,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const queryString = params ? this.buildQueryString(params) : "";
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url, {
      headers: config?.headers,
      timeout: config?.timeout,
      signal: config?.signal,
    });

    return response.data;
  }

  async post<T = any, D = any>(
    endpoint: string,
    data?: D,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.post(
      endpoint,
      data,
      {
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }
    );

    return response.data;
  }

  async put<T = any, D = any>(
    endpoint: string,
    data?: D,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.put(
      endpoint,
      data,
      {
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }
    );

    return response.data;
  }

  async delete<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(
      endpoint,
      {
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }
    );

    return response.data;
  }

  // Paginated GET request
  async getPaginated<T = any>(
    endpoint: string,
    params?: QueryParams,
    config?: RequestConfig
  ): Promise<PaginatedResponse<T>> {
    const queryString = params ? this.buildQueryString(params) : "";
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const response: AxiosResponse<PaginatedResponse<T>> = await this.client.get(
      url,
      {
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }
    );

    return response.data;
  }

  // Generic CRUD operations for entities
  async findAll<T = any>(
    endpoint: string,
    params?: QueryParams,
    config?: RequestConfig
  ): Promise<ApiResponse<T[]>> {
    return this.get<T[]>(endpoint, params, config);
  }

  async findById<T = any>(
    endpoint: string,
    id: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.get<T>(`${endpoint}/${id}`, undefined, config);
  }

  async create<T = any, D = any>(
    endpoint: string,
    data: D,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.post<T, D>(endpoint, data, config);
  }

  async update<T = any, D = any>(
    endpoint: string,
    id: string,
    data: D,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.put<T, D>(`${endpoint}/${id}`, data, config);
  }

  async remove<T = any>(
    endpoint: string,
    id: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.delete<T>(`${endpoint}/${id}`, config);
  }

  // Health check
  async healthCheck(): Promise<
    ApiResponse<{ status: string; timestamp: string }>
  > {
    return this.get("/health");
  }

  // Get the underlying axios instance for advanced usage
  getClient(): AxiosInstance {
    return this.client;
  }

  // Update base URL
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
    this.client.defaults.baseURL = baseURL;
  }
}

// Create singleton instance
export const httpService = new HttpService();

// Export class for custom instances
export { HttpService };
