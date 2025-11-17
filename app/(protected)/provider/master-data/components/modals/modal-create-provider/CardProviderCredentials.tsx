import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import React from "react";

const CardProviderCredentials = () => {
  return (
    <Card className="mb-7" id="Provider Credentials-1">
      <CardHeader>
        <CardTitle className="text-b-16-16-600 text-gray-900">
          Provider Credential
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-xs mb-4">
          Add the same fields and values as in the shared API provider
          credentials
        </p>

        <div className="not-[]:flex flex-col justify-center items-start gap-2 mb-5">
          {/* Label */}
          <Label className="text-gray-800 text-b-13-14-400 mb-2">Data01</Label>

          {/* Input Fields Row */}
          <InputGroup className="gap-3">
            {/* Field Input */}
            <Input
              type="text"
              // placeholder={fieldPlaceholder}
              // value={fieldValue}
              // onChange={(e) => onFieldChange?.(e.target.value)}
              className="w-48 px-3 py-3 bg-neutral-50 border-zinc-200 text-slate-500 text-xs "
            />

            {/* Value Input */}
            <Input
              type="text"
              // placeholder={valuePlaceholder}
              // value={valueValue}
              // onChange={(e) => onValueChange?.(e.target.value)}
              className="flex-1 px-3 py-3 bg-neutral-50 border-zinc-200 text-slate-500 text-xs "
            />

            {/* Action Button */}
            <Button
              variant="outline"
              size="sm"
              // onClick={onButtonClick}
              // disabled={buttonDisabled}
              className="p-2 bg-white border-gray-100 h-auto"
            >
              <Trash2 />
            </Button>
          </InputGroup>
        </div>
        <Button variant="primary-light" className="float-right">
          Add More Field
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardProviderCredentials;
