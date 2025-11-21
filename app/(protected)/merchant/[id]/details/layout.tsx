import { StoreProvider } from './components/store-provider';
import { MerchantDetailsLayoutContent } from './components/layout-content';
import { MerchantService } from '../../core/services/merchant.service';

/**
 * Server Component Layout
 * Fetches merchant data on the server and passes it to Zustand store
 */

export default async function MerchantDetailsLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Server-side data fetching
  let merchant = null;
  let error: string | null = null;
  
  try {
    merchant = await MerchantService.fetchMerchant(id);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch merchant data';
    // Don't throw - let the client component handle the error state
  }
  
  return (
    <StoreProvider merchantId={id} initialMerchant={merchant}>
      <MerchantDetailsLayoutContent initialMerchant={merchant}>
        {children}
      </MerchantDetailsLayoutContent>
    </StoreProvider>
  );
}
