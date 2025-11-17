import { ReactNode, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import LogoFlyHorizontal from "@/app/components/svgs/LogoFlyHorizontal";

export function BrandedLayout({ children }: { children: ReactNode }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const images = [
    "/assets/image/LOGIN_1.jpg",
    "/assets/image/LOGIN_2.jpg",
    "/assets/image/LOGIN_3.jpg",
    "/assets/image/LOGIN_4.png",
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
    <>
      <div
        className="w-full h-[100vh] flex justify-center items-center"
        suppressHydrationWarning
      >
        <div
          className="w-full flex justify-center items-center p-8 lg:p-10  order-2 lg:order-1 gap-[190px]"
          suppressHydrationWarning
        >
          <Card className="w-full max-w-[400px] ">
            <CardContent className="p-6">{children}</CardContent>
          </Card>
          <div className="relative w-[730px] h-[90vh] my-auto border rounded-xl -mr-[15vw]">
            <div className="z-10 w-[730px] h-[90vh] rounded-xl left-0 top-0 absolute bg-gradient-to-b from-slate-900 via-slate-900/10 to-slate-900/0 to 85%" />
            <Image
              src={images[currentImageIndex]}
              alt="bg"
              fill
              className={`w-full h-full object-cover z-0 rounded-xl transition-opacity duration-500 ease-in-out ${
                isVisible ? "opacity-100" : "opacity-30"
              }`}
            />
            <div className="absolute z-20 w-full h-full flex flex-col items-start justify-start p-15">
              <LogoFlyHorizontal />
              <div className="mt-5 text-center justify-start text-zinc-200 text-2xl font-normal font-['Inter'] leading-normal">
                Pay As Your Way
              </div>
              <div className="mt-5 w-96 justify-start">
                <span className="text-slate-300 text-base font-normal font-['Inter'] leading-normal">
                  Seamlessly manage your merchant payments, track transactions,
                  and control your business cash flow.{" "}
                </span>
                <span className="text-stone-50 text-base font-semibold font-['Inter'] leading-normal">
                  All in one
                </span>
                <span className="text-slate-300 text-base font-normal font-['Inter'] leading-normal">
                  {" "}
                  secure dashboard.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
