"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useFormSchema } from "@/providers";
import { z } from "zod";
import { isRequiredFn} from "@/lib";

const generalFields = [
  {
    name: "personalInformation.fullname",
    label: "Gym's Name",
    placeholder: "Enter gym name",
  },
  {
    name: "personalInformation.phoneNumber",
    label: "Phone number",
    placeholder: "Enter phone number",
    type: "number",
  },
  {
    name: "personalInformation.location",
    label: "Location",
    placeholder: "Enter location",
  },
] as const;

interface IProps {
  fields: { name: string; label: string; placeholder: string; type?: string }[];
}

export const PersonalInformation = ({ fields }: IProps) => {
  const formSchema = useFormContext();
  const newFields = [...generalFields, ...fields];
  const schema = useFormSchema() as z.ZodObject<any>;
  return (
    <article className="flex bg-white px-[20px] py-[15px] rounded-[8px] flex-col gap-4">
      <header>
        <h3 className="text-[#1C1939] font-medium font-inter">Personal Information</h3>
      </header>
      <hr />
      <div className="grid gap-x-4 gap-y-[18px] grid-cols-1 sm:grid-cols-2">
        {newFields.map((field) => {
          const isRequiredField = isRequiredFn(schema, field.name);
          return (
            <FormField
              key={field.name}
              control={formSchema.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    {field.label} {isRequiredField && <span className="text-red-500">*</span>}
                  </FormLabel>
                  <FormControl>
                    <Input className=" h-[50px]" {...field} {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </article>
  );
};
