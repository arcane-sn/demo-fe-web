"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeenIcon } from "@/components/keenicons";
import Link from "next/link";
import { QUICK_ACCESS_ITEMS } from "../core/constants";

export function QuickAccess() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Quick Access
            </CardTitle>
        </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_ACCESS_ITEMS.map((item) => (
            <Link key={item.id} href={item.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <KeenIcon
                        icon={item.icon}
                        style="outline"
                        className="text-2xl text-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

