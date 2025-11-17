"use client";

interface SendFileSectionProps {
  email: string;
  onEmailChange: (email: string) => void;
}

export function SendFileSection({
  email,
  onEmailChange,
}: SendFileSectionProps) {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-start w-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-2 px-8 w-full">
        <h3 className="text-b-14-14-500 text-gray-900">Send File</h3>
        <p className="text-b-13-20-400 text-gray-500">
          Exported file will be sent via email
        </p>
      </div>

      {/* Email Input */}
      <div className="flex items-center gap-2.5 px-8 py-2.5 w-full">
        <div className="flex w-25 items-center gap-2.5">
          <label className="text-b-13-14-400 text-gray-800">Send File To</label>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-3.5 flex-1 bg-gray-50 rounded-md border border-gray-300">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="flex-1 bg-transparent border-0 outline-none text-b-13-14-400 text-gray-800 placeholder:text-gray-500"
            placeholder="Enter email address"
          />
        </div>
      </div>
    </div>
  );
}
