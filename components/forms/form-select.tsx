import { UseControllerProps, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormSchema } from "@/providers";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, isRequiredFn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

type IProps<T> = {
  name: keyof T;
  label?: string;
  containerClassName?: HtmlHTMLAttributes<HTMLDivElement>["className"];

  placeholder?: string;
  options: string[];
} & UseControllerProps;

export const FormSelect = <T extends Record<string, any>>({ label, name, placeholder = "Select", containerClassName, options }: IProps<T>) => {
  const form = useFormContext();

  const schema = useFormSchema() as z.ZodObject<any>;

  const isRequired = isRequiredFn(schema, name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          {label && (
            <FormLabel>
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className={cn(!options.find((option) => option === field.value) && "text-muted-foreground")}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem className="capitalize" key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
