import { redirect } from 'next/navigation';

export default async function ServicesPricingPage({ 
  params 
}: { 
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Redirect to default service type
  redirect(`/merchant/list/details/${id}/services-pricing/service-type`);
}
