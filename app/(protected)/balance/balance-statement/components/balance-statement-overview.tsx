const BalanceStatementOverview: React.FC<{
  value: string;
  title: string;
}> = ({ value, title }) => {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center justify-start text-slate-900 text-2xl font-semibold font-['Inter'] leading-relaxed">
          {value}
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="text-center m-auto justify-start text-slate-600 text-sm font-normal font-['Inter'] leading-none">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceStatementOverview;
