import { Controller, UseControllerProps, useFormContext } from "react-hook-form";
import { Select } from "../ui/react-select";
import { FormItem, FormLabel } from "../ui/form";

type Option = { label: string; value: string };

type IProps<T> = {
  name: keyof T;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  containerClassName?: string;
  handleOnChange?: (value: Option) => void;
  options: Option[];
} & UseControllerProps;

export const FormReactSelect = <T extends Record<string, any>>({ label, labelClassName, name, containerClassName, placeholder = "Select...", handleOnChange, options, ...rest }: IProps<T>) => {
  const form = useFormContext();

  return (
    <FormItem className={containerClassName}>
      {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
      <Controller
        control={form.control}
        name={name as any}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            onChange={(option: any) => {
              handleOnChange && handleOnChange(option);
              // field.onChange(option?.label);
            }}
            value={options.find((option) => option.value === field.value)}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                borderColor: "#ccc",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#999",
              }),
            }}
            {...rest}
          />
        )}
      />
      <p className="text-sm text-red-500">{form.formState.errors[name]?.message as string}</p>
    </FormItem>
  );
};
