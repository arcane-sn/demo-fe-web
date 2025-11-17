import { useBreadcrumb } from './use-breadcrumb';

export const usePageTitle = () => {
  const { getCurrentPageTitle } = useBreadcrumb();
  
  return {
    getCurrentPageTitle,
    getPageTitle: getCurrentPageTitle, // alias untuk compatibility
  };
};


export const useCurrentPage = () => {
  const { breadcrumbItems, getCurrentPageTitle } = useBreadcrumb();
  
  const currentPage = breadcrumbItems.find(item => item.isActive);
  
  return {
    currentPage,
    title: getCurrentPageTitle(),
    path: currentPage?.path || '',
    breadcrumb: breadcrumbItems,
  };
};
