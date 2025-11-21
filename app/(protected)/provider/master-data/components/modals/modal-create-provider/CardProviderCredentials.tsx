import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, AlertCircle } from "lucide-react";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";

interface CredentialField {
  id: string;
  field: string;
  value: string;
}

export interface CardProviderCredentialsHandle {
  validate: () => boolean;
}

const CardProviderCredentials = forwardRef<CardProviderCredentialsHandle>(
  (_props, ref) => {
    const [fields, setFields] = useState<CredentialField[]>([
      { id: "1", field: "", value: "" },
      { id: "2", field: "", value: "" },
    ]);

    const [errors, setErrors] = useState<
      Record<string, { field?: string; value?: string }>
    >({});

    const validate = useCallback(() => {
      const newErrors: Record<string, { field?: string; value?: string }> = {};
      fields.forEach((field) => {
        const fieldErrors: { field?: string; value?: string } = {};
        if (!field.field.trim()) {
          fieldErrors.field = "This field is required";
        }
        if (!field.value.trim()) {
          fieldErrors.value = "This field is required";
        }
        if (Object.keys(fieldErrors).length > 0) {
          newErrors[field.id] = fieldErrors;
        }
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [fields]);

    useImperativeHandle(
      ref,
      () => ({
        validate,
      }),
      [validate]
    );

    const addField = () => {
      const newId = String(fields.length + 1);
      setFields([...fields, { id: newId, field: "", value: "" }]);
    };

    const removeField = (id: string) => {
      setFields(fields.filter((field) => field.id !== id));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    };

    const updateField = (
      id: string,
      type: "field" | "value",
      newValue: string
    ) => {
      setFields((prev) =>
        prev.map((field) =>
          field.id === id ? { ...field, [type]: newValue } : field
        )
      );
      setErrors((prev) => {
        if (!prev[id]) return prev;
        const next = { ...prev };
        const fieldErrors = { ...next[id] };
        delete fieldErrors[type];
        if (Object.keys(fieldErrors).length === 0) {
          delete next[id];
        } else {
          next[id] = fieldErrors;
        }
        return next;
      });
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
          {fields.map((item, index) => {
            const fieldError = errors[item.id]?.field;
            const valueError = errors[item.id]?.value;
            const hasFieldError = !!fieldError;
            const hasValueError = !!valueError;

            return (
              <div key={item.id} className="flex flex-col gap-2">
                <Label>Data{String(index + 1).padStart(2, "0")}</Label>
                <div className="flex items-start gap-3">
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="relative">
                      <Input
                        type="text"
                        value={item.field}
                        onChange={(e) =>
                          updateField(item.id, "field", e.target.value)
                        }
                        placeholder={`Field${String(index + 1).padStart(2, "0")}`}
                        className={
                          hasFieldError
                            ? "pr-10 border-red-500 focus-visible:ring-red-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                            : ""
                        }
                      />
                      {hasFieldError && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {hasFieldError && (
                      <p className="text-xs text-red-500 mt-0.5">{fieldError}</p>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="relative">
                      <Input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                          updateField(item.id, "value", e.target.value)
                        }
                        placeholder={`Value${String(index + 1).padStart(2, "0")}`}
                        className={
                          hasValueError
                            ? "pr-10 border-red-500 focus-visible:ring-red-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                            : ""
                        }
                      />
                      {hasValueError && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {hasValueError && (
                      <p className="text-xs text-red-500 mt-0.5">{valueError}</p>
                    )}
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
            );
          })}
        </div>

        <div className="flex justify-end mt-5">
          <Button variant="primary-light" onClick={addField}>
            Add More Field
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

CardProviderCredentials.displayName = "CardProviderCredentials";

export default CardProviderCredentials;
