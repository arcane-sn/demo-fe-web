"use client";
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
  ToolbarTitle,
} from "@/components/common/toolbar";
import { KeenIcon } from "@/components/keenicons";
import { Button } from "@/components/ui/button";
import { Input, InputGroup } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { ModalFilterProvider } from "./modals";
import ModalExport from "@/app/(protected)/components/modal/export/modal-export";
import { useMasterDataStore } from "../hooks/useMasterDataStore";

const FilterMasterData = () => {
  const { isModal, setModal } = useMasterDataStore();

  return (
    <>
      <Toolbar>
        <ToolbarHeading>
          <ToolbarTitle>Provider List</ToolbarTitle>
        </ToolbarHeading>
        <ToolbarActions className="flex justify-start items-stretch gap-2.5">
          <InputGroup>
            <Select value={""} onValueChange={() => {}}>
              <SelectTrigger className="w-36 px-3 py-2.5 bg-gray-100 rounded-tl-md rounded-bl-md rounded-r-none border-r-0 border-gray-300 h-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transaction_id">Transaction ID</SelectItem>
                <SelectItem value="order_id">Order ID</SelectItem>
                <SelectItem value="external_id">External ID</SelectItem>
                <SelectItem value="merchant_name">Merchant Name</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search transaction ID"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              // onKeyPress={handleKeyPress}
              className="rounded-none w-64 px-3 py-2.5 bg-light  border-l border-gray-300 text-b-12-12-500 h-auto"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {}}
              className="  bg-gray-50 rounded-l-none rounded-tr-md rounded-br-md border border-gray-300 border-l-0 h-full"
            >
              <Search className=" text-gray-500" />
            </Button>
          </InputGroup>
          {/* Filter Button */}
          <Button
            variant="ghost"
            onClick={() => setModal("filter", true)}
            className="rounded-md border border-gray-300 h-auto"
          >
            <KeenIcon icon="filter" className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-600 text-b-12-12-500">Filter</span>
          </Button>

          {/* Export Button */}
          <Button
            variant="ghost"
            onClick={() => setModal("export", true)}
            className=" rounded-md border border-gray-300 h-auto"
          >
            <KeenIcon icon="exit-down" className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-600 text-b-12-12-500">Export</span>
          </Button>
        </ToolbarActions>
      </Toolbar>
      <Button
        variant="outline"
        size="sm"
        className="-mt-3 px-2.5 py-2 bg-neutral-50 border-zinc-200 h-auto text-b-11-12-400"
        onClick={() => {
          // Handle date filter click
          console.log("Date filter clicked");
        }}
      >
        <span className="text-gray-600 ">Registered Date</span>
        <span className="text-xs  text-gray-800 ">01/12/2025 - 31/12/2025</span>
        <X className="size-4 text-gray-900 ms-2" />
      </Button>

      {/* Filter Modal */}
      <ModalFilterProvider
        open={isModal.filter}
        onOpenChange={(value) => setModal("filter", value)}
      />
      <ModalExport
        open={isModal.export}
        onClose={() => setModal("export", false)}
      />
    </>
  );
};

export default FilterMasterData;
