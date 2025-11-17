import { MerchantData } from '../../types/merchant';
import { MerchantReviewData } from '../../review/core/types/merchant-review';
import { 
  mockMerchants, 
  getMerchantsByStatus, 
  getMerchantsForReview, 
  getMerchantsForList,
  getMerchantById,
  getMerchantsByLevel,
  getSubMerchants,
  getMerchantReviewsByTabForReview,
  MockDataService
} from '../data';
import { httpService } from '@/services';

// Check if we should use mock data
// Default to mock data in development unless explicitly set to use real API
const USE_MOCK_DATA = 
  process.env.NODE_ENV === 'development' && 
  process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

// Check if we're in server-side context
const IS_SERVER = typeof window === 'undefined';

export class MerchantService {
  static async getAllMerchants(): Promise<MerchantData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockMerchants;
  }

  static async getMerchantsByStatus(status: string): Promise<MerchantData[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMerchantsByStatus(status);
  }

  static async getMerchantsForReview(): Promise<MerchantData[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMerchantsForReview();
  }

  static async getMerchantsForList(): Promise<MerchantData[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMerchantsForList();
  }

  static async getMerchantById(id: string): Promise<MerchantData | null> {
    try {
      return await this.fetchMerchant(id);
    } catch (error) {
      return null;
    }
  }

  static async fetchMerchant(merchantId: string): Promise<MerchantData> {
    try {
      // Use mock data in development by default
      if (USE_MOCK_DATA) {
        const merchant = await MockDataService.getMerchantById(merchantId);
        if (!merchant) {
          throw new Error(`Merchant with ID ${merchantId} not found`);
        }
        return merchant;
      }

      // Use real API (only if NEXT_PUBLIC_USE_MOCK_DATA is explicitly set to 'false')
      // In server components, use native fetch instead of httpService
      if (IS_SERVER) {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const url = `${baseURL}/merchants/${merchantId}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for auth
          cache: 'no-store', // Ensure fresh data in server components
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch merchant: ${response.statusText}`);
        }

        const data = await response.json();
        // Handle ApiResponse format: { data: MerchantData, ... } or direct MerchantData
        return data.data || data;
      }

      // In client components, use httpService
      const response = await httpService.get<MerchantData>(`/merchants/${merchantId}`);
      return response.data;
    } catch (error) {
      // Fallback to mock data in development if API call fails
      if (process.env.NODE_ENV === 'development' && !USE_MOCK_DATA) {
        try {
          const merchant = await MockDataService.getMerchantById(merchantId);
          if (merchant) {
            return merchant;
          }
        } catch (mockError) {
          // Silent fail - will throw original error
        }
      }
      
      throw error;
    }
  }

  static async getMerchantsByLevel(level: number): Promise<MerchantData[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMerchantsByLevel(level);
  }

  static async getSubMerchants(parentId: string): Promise<MerchantData[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getSubMerchants(parentId);
  }

  static async getMerchantReviewsByTab(tabId: string): Promise<MerchantReviewData[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMerchantReviewsByTabForReview(tabId);
  }

  static async createMerchant(merchantData: Omit<MerchantData, 'id'>): Promise<MerchantData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate new ID
    const newId = (mockMerchants.length + 1).toString();
    
    const newMerchant: MerchantData = {
      ...merchantData,
      id: newId,
      registeredDate: {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0],
        timezone: 'GMT +7'
      },
      updatedDate: {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0],
        timezone: 'GMT +7'
      }
    } as MerchantData;

    // In real implementation, this would be an API call
    mockMerchants.push(newMerchant);
    
    return newMerchant;
  }

  static async updateMerchant(id: string, merchantData: Partial<MerchantData>): Promise<MerchantData> {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data in development
        const existingMerchant = await this.fetchMerchant(id);
        const updatedMerchant = { ...existingMerchant, ...merchantData };
        // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
        return updatedMerchant;
      }

      // Use real API in production
      if (IS_SERVER) {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const url = `${baseURL}/merchants/${id}`;
        
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
          body: JSON.stringify(merchantData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update merchant: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data || data;
      }

      // In client components, use httpService
      const response = await httpService.put<MerchantData>(
        `/merchants/${id}`,
        merchantData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMerchant(id: string): Promise<void> {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data in development
    await new Promise(resolve => setTimeout(resolve, 1000));
        return;
      }

      // Use real API in production
      if (IS_SERVER) {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const url = `${baseURL}/merchants/${id}`;
        
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete merchant: ${response.statusText}`);
        }
        return;
      }

      // In client components, use httpService
      await httpService.delete(`/merchants/${id}`);
    } catch (error) {
      throw error;
    }
  }

  static validateMerchantData(data: Partial<MerchantData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (data.companyName && data.companyName.trim().length < 2) {
      errors.push('Company name must be at least 2 characters');
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }

    if (data.phoneNumber && !/^(\+62|62|0)[0-9]{9,13}$/.test(data.phoneNumber)) {
      errors.push('Invalid phone number format');
    }

    if (data.website && !this.isValidWebsite(data.website)) {
      errors.push('Invalid website URL');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static isValidWebsite(website: string): boolean {
    try {
      const url = website.startsWith('http') ? website : `https://${website}`;
      new URL(url);
    return true;
    } catch {
      return false;
    }
  }

  static getMerchantStatus(merchant: MerchantData): {
    status: 'active' | 'inactive' | 'pending';
    label: string;
    color: string;
  } {
    if (merchant.productionStatus?.status === 'active') {
      return {
        status: 'active',
        label: 'Active',
        color: 'green'
      };
    }

    if (merchant.sandboxStatus?.status === 'active') {
      return {
        status: 'pending',
        label: 'Sandbox Only',
        color: 'yellow'
      };
    }

    return {
      status: 'inactive',
      label: 'Inactive',
      color: 'red'
    };
  }

  static async getMerchantMetrics(merchantId: string): Promise<{
    totalTransactionAmount: string;
    totalTransactionVolume: string;
    totalMDR: string;
  }> {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data in development
        return await MockDataService.getMetricsData();
      }

      // Use real API in production
      if (IS_SERVER) {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const url = `${baseURL}/merchants/${merchantId}/metrics`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch merchant metrics: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data || data;
      }

      // In client components, use httpService
      const response = await httpService.get<{
        totalTransactionAmount: string;
        totalTransactionVolume: string;
        totalMDR: string;
      }>(`/merchants/${merchantId}/metrics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMerchantActivity(merchantId: string): Promise<any> {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data in development
        return await MockDataService.getActivityData();
      }

      // Use real API in production
      if (IS_SERVER) {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const url = `${baseURL}/merchants/${merchantId}/activity`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch merchant activity: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data || data;
      }

      // In client components, use httpService
      const response = await httpService.get(`/merchants/${merchantId}/activity`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async approveMerchant(id: string): Promise<MerchantData> {
    const merchant = await this.fetchMerchant(id);
    if (!merchant) {
      throw new Error('Merchant not found');
    }

    return this.updateMerchant(id, { reviewStatus: 'approved' });
  }

  static async rejectMerchant(id: string, reason?: string): Promise<MerchantData> {
    const merchant = await this.fetchMerchant(id);
    if (!merchant) {
      throw new Error('Merchant not found');
    }

    return this.updateMerchant(id, { reviewStatus: 'rejected' });
  }

  static async bulkApproveMerchants(ids: string[]): Promise<MerchantData[]> {
    const results: MerchantData[] = [];
    for (const id of ids) {
      try {
        const updated = await this.approveMerchant(id);
        results.push(updated);
      } catch (error) {
        // Silent fail - continue with other merchants
      }
    }
    
    return results;
  }

  static async bulkRejectMerchants(ids: string[], reason?: string): Promise<MerchantData[]> {
    const results: MerchantData[] = [];
    for (const id of ids) {
      try {
        const updated = await this.rejectMerchant(id, reason);
        results.push(updated);
      } catch (error) {
        // Silent fail - continue with other merchants
      }
    }
    
    return results;
  }
}
