'use client';

import { Form } from '@/components/ui/form';
import { useOthersForm } from '../_hooks';
import { 
  BrandingSection,
  AdditionalNotesSection
} from './sections';
import { BrandPreviewModal } from './shared';
import { OTHERS_CONSTANTS } from '../_lib/constants';

export function OthersContent() {
  const {
    form,
    showPreview,
    setShowPreview,
    handleLogoUpload,
    onSubmit,
  } = useOthersForm();

  const handleLogoClear = () => {
    form.setValue('companyLogo', []);
    handleLogoUpload([]);
  };

  return (
    <>
      <style>
        {`
          .branding-bg {
            background-image: url('${OTHERS_CONSTANTS.BRANDING_BACKGROUND}');
          }
          .dark .branding-bg {
            background-image: url('${OTHERS_CONSTANTS.BRANDING_BACKGROUND_DARK}');
          }
        `}
      </style>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
          {/* Branding Section */}
          <BrandingSection
            form={form}
            onShowPreview={() => setShowPreview(true)}
            onLogoUpload={handleLogoUpload}
            onLogoClear={handleLogoClear}
          />

          {/* Additional Notes Section */}
          <AdditionalNotesSection form={form} />

          {/* Brand Preview Modal */}
          <BrandPreviewModal
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            brandColors={form.watch('brandColors')}
            companyLogo={form.watch('companyLogo') || []}
          />
        </form>
      </Form>
    </>
  );
}
