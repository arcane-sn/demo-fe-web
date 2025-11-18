"use client";

import { Suspense } from "react";
import { DetailContent } from "./components/detail-content";

interface BatchDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BatchDetailPage({ params }: BatchDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <DetailContent params={params} />
    </Suspense>
  );
}
