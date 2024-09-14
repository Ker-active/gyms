import { UseControllerProps, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type IProps<T> = {
  name: keyof T;
  label?: string;
  placeholder?: string;
  options: string[];
} & UseControllerProps;

export const FormSelect = <T extends Record<string, any>>({ label, name, placeholder = "Select", options }: IProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
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
