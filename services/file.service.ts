import axios, { AxiosProgressEvent } from "axios";
import {
  FileUploadResponse,
  FileUploadConfig,
  FileDownloadConfig,
  ServiceError,
} from "./types";
import { httpService } from "./http.service";

class FileService {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL =
      baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  }

  private handleError(error: any): ServiceError {
    if (error.response) {
      const { status, data } = error.response;
      return new ServiceError(
        data?.responseMessage || "File operation failed",
        status,
        data?.responseCode || "UNKNOWN_ERROR",
        data?.responseMessage || "File operation failed"
      );
    } else if (error.request) {
      return new ServiceError(
        "Network error during file operation",
        0,
        "NETWORK_ERROR",
        "Network error during file operation"
      );
    } else {
      return new ServiceError(
        error.message || "File operation failed",
        500,
        "UNKNOWN_ERROR",
        error.message || "File operation failed"
      );
    }
  }

  // Upload single file
  async uploadFile(
    file: File,
    endpoint: string = "/files/upload",
    config?: FileUploadConfig
  ): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${this.baseURL}${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 seconds for file uploads
          signal: config?.signal,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (config?.onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              config.onProgress(progress);
            }
          },
        }
      );

      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Upload multiple files
  async uploadFiles(
    files: File[],
    endpoint: string = "/files/upload-multiple",
    config?: FileUploadConfig
  ): Promise<FileUploadResponse[]> {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const response = await axios.post(
        `${this.baseURL}${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // 60 seconds for multiple files
          signal: config?.signal,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (config?.onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              config.onProgress(progress);
            }
          },
        }
      );

      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Download file
  async downloadFile(
    fileId: string,
    endpoint: string = "/files/download",
    config?: FileDownloadConfig
  ): Promise<Blob> {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}/${fileId}`, {
        responseType: "blob",
        timeout: 30000,
        signal: config?.signal,
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Download file and trigger browser download
  async downloadFileToBrowser(
    fileId: string,
    filename?: string,
    endpoint: string = "/files/download",
    config?: FileDownloadConfig
  ): Promise<void> {
    try {
      const blob = await this.downloadFile(fileId, endpoint, config);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || `file-${fileId}`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get file info
  async getFileInfo(fileId: string): Promise<FileUploadResponse> {
    try {
      const response = await httpService.get<FileUploadResponse>(
        `/files/${fileId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete file
  async deleteFile(fileId: string): Promise<void> {
    try {
      await httpService.delete(`/files/${fileId}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get file URL (for direct access)
  getFileUrl(fileId: string, endpoint: string = "/files"): string {
    // HttpOnly cookies are automatically included in requests
    return `${this.baseURL}${endpoint}/${fileId}`;
  }

  // Validate file before upload
  validateFile(
    file: File,
    options?: {
      maxSize?: number; // in bytes
      allowedTypes?: string[];
      allowedExtensions?: string[];
    }
  ): { valid: boolean; error?: string } {
    const {
      maxSize = 10 * 1024 * 1024,
      allowedTypes = [],
      allowedExtensions = [],
    } = options || {};

    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds maximum allowed size of ${Math.round(maxSize / 1024 / 1024)}MB`,
      };
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`,
      };
    }

    // Check file extension
    if (allowedExtensions.length > 0) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!extension || !allowedExtensions.includes(extension)) {
        return {
          valid: false,
          error: `File extension .${extension} is not allowed`,
        };
      }
    }

    return { valid: true };
  }

  // Format file size for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Get file extension
  getFileExtension(filename: string): string {
    return filename.split(".").pop()?.toLowerCase() || "";
  }

  // Check if file is image
  isImageFile(file: File): boolean {
    return file.type.startsWith("image/");
  }

  // Check if file is document
  isDocumentFile(file: File): boolean {
    const documentTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "text/csv",
    ];
    return documentTypes.includes(file.type);
  }
}

// Create singleton instance
export const fileService = new FileService();

// Export class for custom instances
export { FileService };
