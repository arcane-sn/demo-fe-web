"use client";

import React, { useState, ReactNode } from "react";
import { InitialPagination } from "../core/const";
import { QueryRequestContextTypes, ParamsFilterDummy } from "../core/_model";
import { QueryRequestContext } from "../core/context";

interface QueryRequestProviderProps {
  children: ReactNode;
  initialParams?: ParamsFilterDummy;
}

export function QueryRequestProvider({
  children,
  initialParams = {},
}: QueryRequestProviderProps) {
  const [pagination, setPagination] = useState(InitialPagination);
  const [params, setParams] = useState<ParamsFilterDummy>(initialParams);
  const [url, setUrl] = useState("/api/products");

  const value: QueryRequestContextTypes = {
    pagination,
    setPagination,
    params,
    setParams,
    url,
    setUrl,
  };

  return (
    <QueryRequestContext.Provider value={value}>
      {children}
    </QueryRequestContext.Provider>
  );
}
