import { redirect } from 'next/navigation';

export default async function MerchantReviewDetailPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const search = await searchParams;
  const tab = search.tab;
  
  // Redirect to default tab (general-info) while preserving tab query parameter
  const redirectUrl = tab 
    ? `/merchant/review/${id}/general-info?tab=${tab}`
    : `/merchant/review/${id}/general-info`;
  
  redirect(redirectUrl);
}

