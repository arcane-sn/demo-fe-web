"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchDialog } from "@/partials/dialogs/search/search-dialog";
import { AppsDropdownMenu } from "@/partials/topbar/apps-dropdown-menu";
import { ChatSheet } from "@/partials/topbar/chat-sheet";
import { NotificationsSheet } from "@/partials/topbar/notifications-sheet";
import { UserDropdownMenu } from "@/partials/topbar/user-dropdown-menu";
import {
  Menu,
  SquareChevronRight,
} from "lucide-react";
import { KeenIcon } from "@/components/keenicons";
import { toAbsoluteUrl } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/common/container";
import { Breadcrumb } from "./breadcrumb";
import { MegaMenuMobile } from "./mega-menu-mobile";
import { SidebarMenu } from "./sidebar-menu";

export function Header() {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);
  const [isMegaMenuSheetOpen, setIsMegaMenuSheetOpen] = useState(false);

  const pathname = usePathname();
  const mobileMode = useIsMobile();

  const scrollPosition = useScrollPosition();
  const headerSticky: boolean = scrollPosition > 0;

  // Close sheet when route changes
  useEffect(() => {
    setIsSidebarSheetOpen(false);
    setIsMegaMenuSheetOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "header fixed top-0 z-10 start-0 flex items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)] p-5",
        headerSticky && "border-b border-border"
      )}
    >
      <Container className="flex justify-between items-stretch lg:gap-4">
        {/* HeaderLogo */}
        <div className="flex lg:hidden items-center gap-2.5">
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/image/g4.png"
              width={120}
              height={25}
              className="h-[25px] w-auto object-contain"
              alt="Logo"
              priority
              unoptimized
            />
          </Link>
          <div className="flex items-center">
            {mobileMode && (
              <Sheet
                open={isSidebarSheetOpen}
                onOpenChange={setIsSidebarSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="ghost" mode="icon">
                    <Menu className="text-muted-foreground/70" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="p-0 gap-0 w-[275px]"
                  side="left"
                  close={false}
                >
                  <SheetHeader className="p-0 space-y-0" />
                  <SheetBody className="p-0 overflow-y-auto">
                    <SidebarMenu />
                  </SheetBody>
                </SheetContent>
              </Sheet>
            )}
            {mobileMode && (
              <Sheet
                open={isMegaMenuSheetOpen}
                onOpenChange={setIsMegaMenuSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="ghost" mode="icon">
                    <SquareChevronRight className="text-muted-foreground/70" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="p-0 gap-0 w-[275px]"
                  side="left"
                  close={false}
                >
                  <SheetHeader className="p-0 space-y-0" />
                  <SheetBody className="p-0 overflow-y-auto">
                    <MegaMenuMobile />
                  </SheetBody>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

        <Breadcrumb />

        {/* HeaderTopbar */}
        <div className="flex items-center gap-5">
          {pathname.startsWith("/store-client") ? (
            <></>
          ) : (
            <>
              <SearchDialog
                trigger={
                  <Button variant="ghost" mode="icon" size="sm" className="text-muted-foreground hover:text-foreground">
                    <KeenIcon icon="magnifier" style="outline" className="text-lg" />
                  </Button>
                }
              />
              <NotificationsSheet
                trigger={
                  <Button variant="ghost" mode="icon" size="sm" className="text-muted-foreground hover:text-foreground relative">
                    <KeenIcon icon="notification" style="outline" className="text-lg" />
                  </Button>
                }
              />
              <ChatSheet
                trigger={
                  <Button variant="ghost" mode="icon" size="sm" className="text-muted-foreground hover:text-foreground">
                    <KeenIcon icon="messages" style="outline" className="text-lg" />
                  </Button>
                }
              />
              <AppsDropdownMenu
                trigger={
                  <Button variant="ghost" mode="icon" size="sm" className="text-muted-foreground hover:text-foreground">
                    <KeenIcon icon="element-11" style="outline" className="text-lg" />
                  </Button>
                }
              />
              <UserDropdownMenu
                trigger={
                  <img
                    className="size-9 rounded-full border-2 border-green-500 shrink-0 cursor-pointer ml-2"
                    src={toAbsoluteUrl("/media/avatars/300-2.png")}
                    alt="User Avatar"
                  />
                }
              />
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
