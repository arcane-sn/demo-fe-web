import { redirect } from 'next/navigation';

export default async function MerchantReviewServicesPricingPage({ 
  params 
}: { 
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Redirect to default service type
  redirect(`/merchant/review/${id}/services-pricing/service-type`);
}

