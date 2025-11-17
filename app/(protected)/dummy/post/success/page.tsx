import { Container } from "@/components/common/container";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const DummyPostSuccessPage = () => {
  return (
    <Fragment>
      <Container>
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Product Created Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Your new product has been added to the DummyJSON database.
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <Link href="/dummy">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dummy/post">Create Another</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Fragment>
  );
};

export default DummyPostSuccessPage;
