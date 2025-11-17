import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { UserData } from "../types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { any } from "zod";

const headerConfig = {
  title: "Account List",
  subtitle: "",
  showRecordCount: false,
};

const footerConfig = {
  showPagination: true,
  showRowCount: true,
  showSelectedCount: true,
};

const toolbarConfig = {
  showSearch: true,
  showFilters: true,
  showColumnVisibility: true,
  searchPlaceholder: "Search Account...",

  showSearchBar: true,
  searchQuery: "search hehe",
  searchField: "search field hehe",
  filters: ["geg", "huhu", "hehe"],
  activeFiltersCount: 2,
};

export { headerConfig, footerConfig, toolbarConfig };
