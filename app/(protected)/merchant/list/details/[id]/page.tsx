import { redirect } from 'next/navigation';

export default async function MerchantDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Redirect to default tab (general-info)
  redirect(`/merchant/list/details/${id}/general-info`);
}

