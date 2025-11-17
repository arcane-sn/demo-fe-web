import { Container } from '@/components/common/container';
import { MerchantReviewContent } from './components/merchant-review-content';
import { MerchantService } from '../core/services/merchant.service';
import { MerchantData } from '../types/merchant';

/**
 * Server Component Page
 * Fetches merchant review data on the server and passes it to client component
 */
export default async function MerchantReviewPage() {
  // Server-side data fetching
  let merchants: MerchantData[] = [];
  let error: string | null = null;
  
  try {
    merchants = await MerchantService.getMerchantsForReview();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch merchants';
    // Don't throw - let the client component handle the error state
  }
  
  return (
    <Container>
      <div className="py-6">
        <MerchantReviewContent 
          initialMerchants={merchants}
          initialError={error}
        />
      </div>
    </Container>
  );
}