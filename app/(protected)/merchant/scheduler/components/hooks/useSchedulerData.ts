import { useState, useEffect } from "react";
import { MerchantData } from "../../types/merchant-data";
import { mockMerchantData } from "../../data/mock-merchant-data";

export function useSchedulerData() {
  const [allMerchants, setAllMerchants] = useState<MerchantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAllMerchants(mockMerchantData);
        setError(null);
      } catch (err) {
        setError('Failed to load merchant data');
        console.error('Error loading merchant data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    merchants: allMerchants,
    loading,
    error,
  };
}

