import CopyButton from "../../components/CopyButton";

// Detail Row Component
const DetailRow: React.FC<{
  label: string;
  value: string;
  showCopy?: boolean;
  isWebsite?: boolean;
  isMultiline?: boolean;
}> = ({
  label,
  value,
  showCopy = false,
  isWebsite = false,
  isMultiline = false,
}) => (
  <>
    <div
      className={`self-stretch ${isMultiline ? "px-7" : "h-4 px-7"} inline-flex justify-start items-center gap-2.5`}
    >
      <div className="w-44 flex justify-start items-center gap-2.5">
        <div className="justify-start text-slate-500 text-sm ">{label}</div>
      </div>
      <div
        className={`flex justify-start items-center gap-1.5 ${isMultiline ? "flex-1" : ""}`}
      >
        {isWebsite ? (
          <div className="flex justify-start items-center gap-1.5">
            <div className="justify-start text-blue-500 text-sm font-normal font-['Inter'] underline ">
              {value}
            </div>
            <CopyButton text={value} label={label} />
          </div>
        ) : (
          <div
            className={`flex justify-start items-center gap-1.5 ${isMultiline ? "flex-1" : ""}`}
          >
            <div
              className={`justify-start text-slate-800 text-sm ${isMultiline ? "flex-1" : ""}`}
            >
              {value}
            </div>
            {showCopy && <CopyButton text={value} label={label} />}
          </div>
        )}
      </div>
    </div>
    <div className="self-stretch h-px bg-gray-100" />
  </>
);

export default DetailRow;
