import { HTMLAttributes } from "react";
import { UseControllerProps, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type IProps<T> = {
  name: keyof T & string;
  label: string;
} & UseControllerProps &
  HTMLAttributes<HTMLInputElement>;

export const FilteredInput = <T extends Record<string, any>>({
  name,
  label,
  ...rest
}: IProps<T>) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='font-inter font-semibold text-sm text-[#1C1939]'>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              style={{
                boxShadow: "0px 1px 2px 0px #1018280D",
              }}
              className='h-[44px] px-[14px] rounded-[8px]'
              {...rest}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
