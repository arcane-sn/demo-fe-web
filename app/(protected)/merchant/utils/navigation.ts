'use client';

import { useRouter } from 'next/navigation';

export function useMerchantNavigation() {
  const router = useRouter();
  
  return {
    toDetails: (merchantId: string) => router.push(`/merchant/list/details/${merchantId}`),
    toEdit: (merchantId: string) => router.push(`/merchant/list/edit/${merchantId}`),
    toList: () => router.push('/merchant/list'),
    toCreate: () => router.push('/merchant/create'),
    toReview: () => router.push('/merchant/review'),
  };
}


let routerInstance: ReturnType<typeof useRouter> | null = null;

export function setRouterInstance(router: ReturnType<typeof useRouter>) {
  routerInstance = router;
}

export const navigateToMerchantDetails = (merchantId: string): void => {
  if (typeof window === 'undefined') {
    console.warn('navigateToMerchantDetails: Cannot navigate on server-side');
    return;
  }
  
  if (!routerInstance) {
    console.warn(
      'navigateToMerchantDetails: Router instance not set. ' +
      'Call setRouterInstance() first, or use useMerchantNavigation() hook instead.'
    );
    return;
  }
  
  routerInstance.push(`/merchant/list/details/${merchantId}`);
};

export const navigateToMerchantEdit = (merchantId: string): void => {
  if (typeof window === 'undefined') {
    console.warn('navigateToMerchantEdit: Cannot navigate on server-side');
    return;
  }
  
  if (!routerInstance) {
    console.warn(
      'navigateToMerchantEdit: Router instance not set. ' +
      'Call setRouterInstance() first, or use useMerchantNavigation() hook instead.'
    );
    return;
  }
  
  routerInstance.push(`/merchant/list/edit/${merchantId}`);
};

export const navigateToCreateMerchant = (): void => {
  if (typeof window === 'undefined') {
    console.warn('navigateToCreateMerchant: Cannot navigate on server-side');
    return;
  }
  
  if (!routerInstance) {
    console.warn(
      'navigateToCreateMerchant: Router instance not set. ' +
      'Call setRouterInstance() first, or use useMerchantNavigation() hook instead.'
    );
    return;
  }
  
  routerInstance.push('/merchant/create');
};

export const navigateToMerchantReview = (): void => {
  if (typeof window === 'undefined') {
    console.warn('navigateToMerchantReview: Cannot navigate on server-side');
    return;
  }
  
  if (!routerInstance) {
    console.warn(
      'navigateToMerchantReview: Router instance not set. ' +
      'Call setRouterInstance() first, or use useMerchantNavigation() hook instead.'
    );
    return;
  }
  
  routerInstance.push('/merchant/review');
};

export const navigateToMerchantList = (): void => {
  if (typeof window === 'undefined') {
    console.warn('navigateToMerchantList: Cannot navigate on server-side');
    return;
  }
  
  if (!routerInstance) {
    console.warn(
      'navigateToMerchantList: Router instance not set. ' +
      'Call setRouterInstance() first, or use useMerchantNavigation() hook instead.'
    );
    return;
  }
  
  routerInstance.push('/merchant/list');
};

export const navigateToMerchantCreate = navigateToCreateMerchant;
  