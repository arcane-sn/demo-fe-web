interface OtpInputProps {
  otp: string[];
  activeOtpIndex: number;
  inputRefs: React.RefObject<HTMLInputElement[]>;
  handleOnChange: (value: string, index: number) => void;
  handleOnKeyDown: (e: React.KeyboardEvent, index: number) => void;
  setActiveOtpIndex: (index: number) => void;
}
const OtpInput = ({
  otp,
  activeOtpIndex,
  inputRefs,
  handleOnChange,
  handleOnKeyDown,
  setActiveOtpIndex,
}: OtpInputProps) => {
  return (
    <div className="flex justify-start items-start gap-3">
      {otp.map((value, index) => (
        <div
          key={index}
          className={`size-10 px-3 py-3 bg-white rounded-md outline-1 outline-offset-[-1px] flex justify-center items-center gap-2.5 ${
            activeOtpIndex === index
              ? "outline-blue-500/20 outline-4"
              : "outline-zinc-200"
          }`}
        >
          <input
            ref={(el) => {
              inputRefs.current[index] = el as HTMLInputElement;
            }}
            type="text"
            value={value}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            onFocus={() => setActiveOtpIndex(index)}
            className="w-full h-full text-center text-slate-600 text-base font-medium font-['Inter'] leading-none border-none outline-none bg-transparent"
            maxLength={1}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      ))}
    </div>
  );
};

export default OtpInput;
