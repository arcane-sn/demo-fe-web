import { ReactNode, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function BrandedLayout({ children }: { children: ReactNode }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const images = [
    "/assets/image/login-bg1.png",
    "/assets/image/login-bg2.png",
    "/assets/image/login-bg3.png",
    "/assets/image/login-bg4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // Change image and fade in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500); // Half second fade out, then change and fade in
    }, 30000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full min-h-screen flex ">
      {/* Left Container - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="w-full max-w-[400px]">
          <Card className="w-full">
            <CardContent className="p-6">{children}</CardContent>
          </Card>
        </div>
      </div>

      {/* Right Container - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-4 lg:p-6 xl:p-8 min-h-screen">
        <div className="relative w-full h-full max-h-[90vh] min-h-[600px] rounded-xl overflow-hidden border">
          <div className="z-10 w-full h-full absolute bg-gradient-to-b from-slate-900 via-slate-900/10 to-slate-900/0 to 85%" />
          <Image
            src={images[currentImageIndex]}
            alt="bg"
            fill
            className={`w-full h-full object-cover z-0 transition-opacity duration-500 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-30"
            }`}
          />
          <div className="absolute z-20 w-full h-full flex flex-col items-start justify-start p-8 xl:p-[60px]">
            <Image
              src="/assets/image/pdn.png"
              alt="Logo"
              width={200}
              height={152}
              className="object-contain max-w-[180px] xl:max-w-[200px]"
              priority
              unoptimized
            />
            <div className="mt-4 xl:mt-5 text-center justify-start text-zinc-200 text-xl xl:text-2xl font-normal font-['Inter'] leading-normal italic">
              Pay As Your Way
            </div>
            <div className="mt-4 xl:mt-5 w-full max-w-[384px] xl:w-96 justify-start">
              <span className="text-slate-300 text-sm xl:text-base font-normal font-['Inter'] leading-normal">
                Seamlessly manage your merchant payments, track transactions,
                and control your business cash flow.{" "}
              </span>
              <span className="text-stone-50 text-sm xl:text-base font-semibold font-['Inter'] leading-normal">
                All in one
              </span>
              <span className="text-slate-300 text-sm xl:text-base font-normal font-['Inter'] leading-normal">
                {" "}
                secure dashboard.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
