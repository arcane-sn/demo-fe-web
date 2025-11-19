"use client";

import { useMemo } from "react";
import { mockAccountInquiryData } from "../components/table/core/data/mock-data";

export function useAccountInquiryList() {
  const data = useMemo(() => mockAccountInquiryData, []);

  return {
    data,
    loading: false,
    error: null,
  };
}

