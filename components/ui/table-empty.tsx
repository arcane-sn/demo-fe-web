import Image from "next/image";
import { Card } from "./card";

interface TableEmptyProps {
  title: string;
  description: string;
}
const TableEmpty = ({ title, description }: TableEmptyProps) => {
  return (
    <Card className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/image/bg.svg"
          alt="Background"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex items-center justify-center flex-col gap-5 py-8">
        <Image
          src="/assets/image/puzzle.svg"
          alt="Empty State Illustration"
          width={150}
          height={150}
          className="z-20"
        />
        <div className="z-20">
          <div className="text-center justify-start text-slate-900 text-xl font-semibold font-['Inter'] leading-loose">
            {title}
          </div>
          <div className="mt-3 max-w-[532px] self-stretch text-center justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-snug">
            {description}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TableEmpty;
