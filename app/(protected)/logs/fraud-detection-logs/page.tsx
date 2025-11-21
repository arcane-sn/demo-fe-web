import { Container } from "@/components/common/container";
import { Fragment } from "react";

export default function FraudDetectionLogsPage() {
  return (
    <Fragment>
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              Fraud Detection Logs
            </h1>
            <p className="text-lg text-gray-600">Coming Soon</p>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

