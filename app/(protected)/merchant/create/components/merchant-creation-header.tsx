import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { Steps } from './steps';

interface MerchantCreationHeaderProps {
  currentStep: number;
  onBack: () => void;
}

export function MerchantCreationHeader({ 
  currentStep, 
  onBack 
}: MerchantCreationHeaderProps) {
  return (
    <div className=" bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 top-0 z-50">
      <Container>
        {/* Header Content */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 border"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Create New Merchant</h1>
              <p className="text-sm text-muted-foreground">
                Complete all required data and documents to create a new merchant
              </p>
            </div>
          </div>
        </div>

        {/* Steps Progress */}
        <Steps currentStep={currentStep} />
      </Container>
    </div>
  );
}
