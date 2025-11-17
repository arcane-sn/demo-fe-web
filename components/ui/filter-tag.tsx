import { KeenIcon } from "../keenicons";
import { Button } from "./button";

const FilterTag = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="self-stretch inline-flex justify-start items-center gap-2.5">
      <div className="px-2.5 py-2 bg-gray-50 rounded-md border border-gray-300 flex justify-start items-center gap-2.5">
        <div className="flex justify-start items-center gap-1">
          <span className="text-gray-500 text-b-12-12-400">{label}</span>
          <span className="text-dark text-b-12-12-400">{value}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-4 h-4 p-0 hover:bg-gray-200 rounded"
        >
          <KeenIcon icon="cross" className="w-3 h-3 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};
export default FilterTag;
