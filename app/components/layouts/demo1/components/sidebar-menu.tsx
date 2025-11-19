"use client";

import { JSX, useCallback } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MENU_SIDEBAR } from "@/config/menu.config";
import { MenuConfig, MenuItem } from "@/config/types";
import { cn } from "@/lib/utils";
import {
  AccordionMenu,
  AccordionMenuClassNames,
  AccordionMenuGroup,
  AccordionMenuItem,
  AccordionMenuLabel,
  AccordionMenuSub,
  AccordionMenuSubContent,
  AccordionMenuSubTrigger,
} from "@/components/ui/accordion-menu";
import { Badge } from "@/components/ui/badge";
import { KeenIcon } from "@/components/keenicons";

export function SidebarMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Memoize matchPath to prevent unnecessary re-renders
  const matchPath = useCallback(
    (path: string): boolean => {
      // Build the full current URL with query parameters
      const currentUrl = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      // If the current URL has query parameters, only match paths that also have query parameters
      if (searchParams.toString()) {
        return path === currentUrl;
      }

      // If the current URL has no query parameters, match paths without query parameters
      const cleanPathname = pathname.split("?")[0];
      return (
        path === cleanPathname ||
        (path.length > 1 && cleanPathname.startsWith(path))
      );
    },
    [pathname, searchParams]
  );

  // Global classNames for consistent styling
  const classNames: AccordionMenuClassNames = {
    root: "lg:ps-1 space-y-3",
    group: "gap-px",
    label:
      "uppercase text-xs font-medium text-muted-foreground/70 pt-2.25 pb-px",
    separator: "",
    item: "h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium",
    sub: "",
    subTrigger:
      "h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium [&_[data-slot=accordion-menu-sub-indicator]]:hidden",
    subContent: "py-0",
    indicator: "",
  };

  const buildMenu = (items: MenuConfig): JSX.Element[] => {
    return items.map((item: MenuItem, index: number) => {
      if (item.heading) {
        return buildMenuHeading(item, index);
      } else if (item.disabled) {
        return buildMenuItemRootDisabled(item, index);
      } else {
        return buildMenuItemRoot(item, index);
      }
    });
  };

  const renderIcon = (icon: MenuItem["icon"]) => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return (
        <KeenIcon
          icon={icon}
          style="outline"

          className="text-lg pr-2 text-gray-600"
          data-slot="accordion-menu-icon"
        />
      );
    }
    const IconComponent = icon;
    return <IconComponent data-slot="accordion-menu-icon" className="w-5 h-5" />;
  };

  const buildMenuItemRoot = (item: MenuItem, index: number): JSX.Element => {
    if (item.children) {
      const menuValue = item.path || `root-${index}`;
      return (
        <AccordionMenuSub key={index} value={menuValue}>
          <AccordionMenuSubTrigger className="text-sm font-medium group ">
            {renderIcon(item.icon)}
            <span data-slot="accordion-menu-title" className="flex-1">{item.title}</span>
            <div className="ms-auto size-4 shrink-0 relative flex items-center justify-center">
              <KeenIcon
                icon="plus"
                style="outline"
                className="absolute size-4 text-muted-foreground transition-opacity duration-200 group-data-[state=open]:opacity-0 group-data-[state=open]:pointer-events-none"
                data-slot="accordion-menu-indicator-plus"
              />
              <KeenIcon
                icon="minus"
                style="outline"
                className="absolute size-4 text-muted-foreground transition-opacity duration-200 opacity-0 pointer-events-none group-data-[state=open]:opacity-100 group-data-[state=open]:pointer-events-auto"
                data-slot="accordion-menu-indicator-minus"
              />
            </div>
          </AccordionMenuSubTrigger>
          <AccordionMenuSubContent
            type="multiple"
            parentValue={menuValue}
            className="ml-4 border-l-1 border-gray-300"
          >
            <AccordionMenuGroup>
              {buildMenuItemChildren(item.children, 1)}
            </AccordionMenuGroup>
          </AccordionMenuSubContent>
        </AccordionMenuSub>
      );
    } else {
      return (
        <AccordionMenuItem
          key={index}
          value={item.path || ""}
          className="text-sm font-medium"
        >
          <Link
            href={item.path || "#"}
            className="flex items-center justify-between grow gap-2"
          >
            {renderIcon(item.icon)}
            <span data-slot="accordion-menu-title">{item.title}</span>
          </Link>
        </AccordionMenuItem>
      );
    }
  };

  const buildMenuItemRootDisabled = (
    item: MenuItem,
    index: number
  ): JSX.Element => {
    return (
      <AccordionMenuItem
        key={index}
        value={`disabled-${index}`}
        className="text-sm font-medium"
      >
        {renderIcon(item.icon)}
        <span data-slot="accordion-menu-title">{item.title}</span>
        {item.disabled && (
          <Badge variant="secondary" size="sm" className="ms-auto me-[-10px]">
            Soon
          </Badge>
        )}
      </AccordionMenuItem>
    );
  };

  const buildMenuItemChildren = (
    items: MenuConfig,
    level: number = 0
  ): JSX.Element[] => {
    return items.map((item: MenuItem, index: number) => {
      if (item.disabled) {
        return buildMenuItemChildDisabled(item, index, level);
      } else {
        return buildMenuItemChild(item, index, level);
      }
    });
  };

  const buildMenuItemChild = (
    item: MenuItem,
    index: number,
    level: number = 0
  ): JSX.Element => {
    if (item.children) {
      const childValue = item.path || `child-${level}-${index}`;
      return (
        <AccordionMenuSub
          key={index}
          value={childValue}
        >
          <AccordionMenuSubTrigger className="text-[13px] group">
            {item.collapse ? (
              <span className="text-muted-foreground">
                <span className="hidden [[data-state=open]>span>&]:inline">
                  {item.collapseTitle}
                </span>
                <span className="inline [[data-state=open]>span>&]:hidden">
                  {item.expandTitle}
                </span>
              </span>
            ) : (
              <span className="flex-1">{item.title}</span>
            )}
            <div className="ms-auto size-4 shrink-0 relative flex items-center justify-center">
              <KeenIcon
                icon="plus"
                style="outline"
                className="absolute size-4 text-muted-foreground transition-opacity duration-200 group-data-[state=open]:opacity-0 group-data-[state=open]:pointer-events-none"
                data-slot="accordion-menu-indicator-plus"
              />
              <KeenIcon
                icon="minus"
                style="outline"
                className="absolute size-4 text-muted-foreground transition-opacity duration-200 opacity-0 pointer-events-none group-data-[state=open]:opacity-100 group-data-[state=open]:pointer-events-auto"
                data-slot="accordion-menu-indicator-minus"
              />
            </div>
          </AccordionMenuSubTrigger>
          <AccordionMenuSubContent
            type="multiple"
            parentValue={childValue}
            className={cn(
              "ps-4",
              !item.collapse && "relative",
              !item.collapse && (level > 0 ? "" : "")
            )}
          >
            <AccordionMenuGroup>
              {buildMenuItemChildren(
                item.children,
                item.collapse ? level : level + 1
              )}
            </AccordionMenuGroup>
          </AccordionMenuSubContent>
        </AccordionMenuSub>
      );
    } else {
      return (
        <AccordionMenuItem
          key={index}
          value={item.path || ""}
          className="text-[13px]"
        >
          <Link href={item.path || "#"}>{item.title}</Link>
        </AccordionMenuItem>
      );
    }
  };

  const buildMenuItemChildDisabled = (
    item: MenuItem,
    index: number,
    level: number = 0
  ): JSX.Element => {
    return (
      <AccordionMenuItem
        key={index}
        value={`disabled-child-${level}-${index}`}
        className="text-[13px]"
      >
        <span data-slot="accordion-menu-title">{item.title}</span>
        {item.disabled && (
          <Badge variant="secondary" size="sm" className="ms-auto me-[-10px]">
            Soon
          </Badge>
        )}
      </AccordionMenuItem>
    );
  };

  const buildMenuHeading = (item: MenuItem, index: number): JSX.Element => {
    return <AccordionMenuLabel key={index}>{item.heading}</AccordionMenuLabel>;
  };

  // Build the full current URL with query parameters for selectedValue
  const currentUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  return (
    <div className="kt-scrollable-y-hover flex grow shrink-0 py-5 px-5 lg:max-h-[calc(100vh-5.5rem)]">
      <AccordionMenu
        selectedValue={currentUrl}
        matchPath={matchPath}
        type="multiple"
        classNames={classNames}
      >
        {buildMenu(MENU_SIDEBAR)}
      </AccordionMenu>
    </div>
  );
}
