export interface ApiResponse<T = any> {
  data: T;
  responseCode: string;
  responseMessage: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  responseCode: string;
  responseMessage: string;
}

export interface ApiError {
  responseCode: string;
  responseMessage: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  [key: string]: any;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface FileUploadConfig {
  onProgress?: (progress: number) => void;
  signal?: AbortSignal;
}

export interface FileDownloadConfig {
  filename?: string;
  signal?: AbortSignal;
}

export class ServiceError extends Error {
  public status: number;
  public responseCode: string;
  public responseMessage: string;

  constructor(
    message: string,
    status: number,
    responseCode: string,
    responseMessage: string
  ) {
    super(message);
    this.name = "ServiceError";
    this.status = status;
    this.responseCode = responseCode;
    this.responseMessage = responseMessage;
  }
}

// Generic Entity Types (can be extended)
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
