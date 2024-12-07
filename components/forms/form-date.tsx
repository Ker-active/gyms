"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useFormContext, UseControllerProps } from "react-hook-form";
import { cn, isRequiredFn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormSchema } from "@/providers";
import { z } from "zod";

type DatePickerProps<T> = {
  name: keyof T;
  label?: string;
  containerClassName?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
} & UseControllerProps;

export const FormDate = <T extends Record<string, any>>({ containerClassName, label = "Pick a date", name }: DatePickerProps<T>) => {
  const { control } = useFormContext();

  const schema = useFormSchema() as z.ZodObject<any>;

  const isRequired = isRequiredFn(schema, name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          {label && (
            <FormLabel>
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <button
                  className={cn(
                    "flex h-[45px] items-center w-full rounded-[5px] border border-input bg-background px-5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  placeholder:font-extralight  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date ? date.toISOString() : undefined);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
