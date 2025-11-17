import { InfoIcon } from "lucide-react";

const BalanceOverview: React.FC<{
  icon: React.ReactNode;
  value: string;
  title: string;
}> = ({ icon, value, title }) => {
  return (
    <div className="flex items-center justify-start gap-2 min-w-80">
      {icon}
      <div className="flex flex-col items-start justify-start">
        <div className="justify-start text-slate-900 text-2xl font-semibold font-['Inter'] leading-relaxed">
          {value}
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="justify-start text-slate-600 text-sm font-normal font-['Inter'] leading-none">
            {title}
          </div>
          <InfoIcon className="text-gray-500 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default BalanceOverview;
