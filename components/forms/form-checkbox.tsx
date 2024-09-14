"use client";

import { UseControllerProps, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { ComponentProps, HtmlHTMLAttributes } from "react";

type IProps<T> = {
  name: keyof T;
  label?: string;
  containerClassName?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  checkBoxLabel: string;
  checkBoxProps?: ComponentProps<typeof Checkbox>;
} & UseControllerProps;

export const FormCheckBox = <T extends Record<string, any>>({ label, checkBoxLabel, name, containerClassName, checkBoxProps }: IProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          {label && <FormLabel className="text-sm leading-[22px] font-normal -tracking-[0.4px] text-[#999999]">{label}</FormLabel>}
          <div className="flex items-center space-x-2">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} {...checkBoxProps} />
            </FormControl>
            <FormLabel className="text-sm font-normal leading-none text-[#262626] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{checkBoxLabel}</FormLabel>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
