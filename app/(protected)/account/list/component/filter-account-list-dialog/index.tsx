"use client";

import React from "react";
import { Formik, Form } from "formik";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterAccountListDialogProps, initialValues } from "./core";
import {
  DateFilterSection,
  CheckboxGroup,
  FilterDialogHeader,
  FilterDialogFooter,
} from "./components";

const FilterAccountListDialog: React.FC<FilterAccountListDialogProps> = ({
  open,
  onOpenChange,
  onApplyFilter,
  onReset,
}) => {
  const handleSubmit = (values: any) => {
    onApplyFilter(values);
    onOpenChange(false);
  };

  const handleReset = (resetForm: () => void) => {
    resetForm();
    onReset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        close={false}
        className="w-[560px] p-0 bg-white shadow-[0px_10px_14px_rgba(15,42,81,0.03)] rounded-xl border-0"
      >
        <div className="flex flex-col">
          {/* Header */}
          <FilterDialogHeader onClose={() => onOpenChange(false)} />

          {/* Content */}
          <div className="flex flex-col gap-5 py-5">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, setFieldValue, resetForm }) => (
                <Form className="flex flex-col gap-5">
                  {/* Date Filter Section */}
                  <DateFilterSection
                    values={values}
                    setFieldValue={setFieldValue}
                  />

                  {/* Divider */}
                  <div className="h-px bg-[#F1F1F4]" />

                  {/* Access Level Section */}
                  <CheckboxGroup
                    fieldName="accessLevel"
                    title="Access Level"
                    options={values.accessLevel}
                    values={values}
                    setFieldValue={setFieldValue}
                  />

                  {/* Divider */}
                  <div className="h-px bg-[#F1F1F4]" />

                  {/* Role Section */}
                  <CheckboxGroup
                    fieldName="role"
                    title="Role"
                    options={values.role}
                    values={values}
                    setFieldValue={setFieldValue}
                  />

                  {/* Divider */}
                  <div className="h-px bg-[#F1F1F4]" />

                  {/* Account Status Section */}
                  <CheckboxGroup
                    fieldName="accountStatus"
                    title="Account Status"
                    options={values.accountStatus}
                    values={values}
                    setFieldValue={setFieldValue}
                  />

                  {/* Additional Status Section */}
                  <CheckboxGroup
                    fieldName="additionalStatus"
                    title="Additional Status"
                    options={values.additionalStatus}
                    values={values}
                    setFieldValue={setFieldValue}
                  />

                  {/* Divider */}
                  <div className="h-px border-t border-[#F1F1F4] mx-5" />

                  {/* Footer */}
                  <FilterDialogFooter
                    onReset={() => handleReset(resetForm)}
                    onCancel={() => onOpenChange(false)}
                    onSubmit={() => handleSubmit(values)}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterAccountListDialog;
