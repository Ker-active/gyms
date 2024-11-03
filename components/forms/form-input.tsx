"use client";

import { UseControllerProps, useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { ComponentProps, ComponentPropsWithRef, HtmlHTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type IProps<T> = {
  name: keyof T;
  label?: string;
  labelClassName?: string;
  formDescription?: string;
  containerClassName?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  isTextArea?: boolean;
} & UseControllerProps &
  ComponentPropsWithRef<typeof Input | typeof Textarea>;

export const FormInput = <T extends Record<string, any>>({ label, name, formDescription, labelClassName, isTextArea, containerClassName, ...rest }: IProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}

          <FormControl>{isTextArea ? <Textarea {...field} {...(rest as any)} /> : <Input {...field} {...(rest as any)} />}</FormControl>
          <FormMessage />
          {formDescription && <FormDescription className="text-[12px] text-[#B2B2B9]">{formDescription}</FormDescription>}
        </FormItem>
      )}
    />
  );
};
