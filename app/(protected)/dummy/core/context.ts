import { createContext, useContext } from "react";
import type { QueryRequestContextTypes } from "./_model";
import { InitialQueryRequestContext } from "./const";

export const QueryRequestContext = createContext<QueryRequestContextTypes>(
  InitialQueryRequestContext
);

export const useQueryRequestProvider = () => useContext(QueryRequestContext);
