"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronFirst } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/providers/settings-provider";
import { Button } from "@/components/ui/button";

export function SidebarHeader() {
  const { settings, storeOption } = useSettings();

  const handleToggleClick = () => {
    storeOption(
      "layouts.demo1.sidebarCollapse",
      !settings.layouts.demo1.sidebarCollapse
    );
  };

  return (
    <div className=" hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0">
      <Link href="/">
        <Image
          src="/assets/image/g4.png"
          width={120}
          height={22}
          className="w-20 pt-5"
          alt="Logo"
          priority
          unoptimized
        />
        <Image
          src="/assets/image/g4.png"
          width={120}
          height={22}
          className="small-logo h-[22px] max-w-none object-contain"
          alt="Logo"
          priority
          unoptimized
        />
      </Link>
      <Button
        onClick={handleToggleClick}
        size="sm"
        mode="icon"
        variant="outline"
        className={cn(
          "size-7 absolute start-full top-2/4 rtl:translate-x-2/4 -translate-x-2/4 -translate-y-2/4",
          settings.layouts.demo1.sidebarCollapse
            ? "ltr:rotate-180"
            : "rtl:rotate-180"
        )}
      >
        <ChevronFirst className="size-4!" />
      </Button>
    </div>
  );
}
