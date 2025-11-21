import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

interface CredentialField {
  id: string;
  field: string;
  value: string;
}

const CardProviderCredentials = () => {
  const [fields, setFields] = useState<CredentialField[]>([
    { id: "1", field: "Client ID", value: "CL-12123012301294123" },
    { id: "2", field: "Secret Key", value: "kIA9d0-xyz7-opQm-IK9s-bnM2" },
    { id: "3", field: "MID / NMID", value: "NIMID-789456123" },
    { id: "4", field: "API Key", value: "abc123xyz456sample789key000" },
    { id: "5", field: "Username", value: "username01" },
    { id: "6", field: "Password", value: "passowrd01#" },
  ]);

  const addField = () => {
    const newId = String(fields.length + 1);
    setFields([...fields, { id: newId, field: "", value: "" }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, type: "field" | "value", newValue: string) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [type]: newValue } : field
      )
    );
  };

  return (
    <Card id="Provider Credentials-1" className="min-w-0 max-w-full">
      <CardHeader>
        <CardTitle>Provider Credential</CardTitle>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <p className="text-sm text-muted-foreground mb-5">
          Add the same fields and values as in the shared API provider
          credentials
        </p>

        <div className="flex flex-col gap-5">
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2">
              <Label>Data{String(index + 1).padStart(2, "0")}</Label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={item.field}
                    onChange={(e) => updateField(item.id, "field", e.target.value)}
                    placeholder={`Field${String(index + 1).padStart(2, "0")}`}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateField(item.id, "value", e.target.value)}
                    placeholder={`Value${String(index + 1).padStart(2, "0")}`}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeField(item.id)}
                  disabled={index === 0 || fields.length === 1}
                  className="p-2 h-auto shrink-0 self-end"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-5">
          <Button variant="primary-light" onClick={addField}>
            Add More Field
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProviderCredentials;
